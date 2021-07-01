<?php

namespace Laranext\Console;

use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Process\Process;

class PackageCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:package {package} {--namespace=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if ( is_dir($this->packagePath()) ) {
            $this->error('Package already exists!');

            return false;
        }

        (new Filesystem)->copyDirectory(
            __DIR__.'/package-stubs',
            $this->packagePath()
        );

        $this->updateFiles();

        // Register the package...
        if ($this->confirm('Would you like to update your composer package?', true)) {
            $this->addPackageRepositoryToRootComposer();
            $this->addPackageToRootComposer();

            $this->composerUpdate();
        }

        $this->info('Laranext package generated successfully.');
    }

    /**
     * Update Stubs.
     *
     * @return void
     */
    protected function updateFiles()
    {
        // composer.json replacements...
        $this->replace('{{ name }}', $this->argument('package'), $this->packagePath('composer.json'));
        $this->replace('{{ namespace }}', $this->namespace(), $this->packagePath('composer.json'));

        // vite.config.js replacements...
        $this->replace('{{ name }}', $this->argument('package'), $this->packagePath('vite.config.js'));

        // views/app.blade.php replacements...
        $this->replace('{{ namespace }}', $this->namespace(), $this->packagePath('resources/views/app.blade.php'));
        $this->replace('{{ name }}', $this->argument('package'), $this->packagePath('resources/views/app.blade.php'));
        $this->replace('{{ nameCapital }}', ucfirst($this->argument('package')), $this->packagePath('resources/views/app.blade.php'));

        // FiltersController.php replacements...
        $this->replace('{{ namespace }}', $this->namespace(), $this->packagePath('src/Http/Controllers/Api/FiltersController.php'));

        // AppConfig.php replacements...
        $this->replace('{{ namespace }}', $this->namespace(), $this->packagePath('src/Support/AppConfig.php'));

        // rename service provider and replacements...
        $this->replace('{{ name }}', $this->argument('package'), $this->packagePath('src/ServiceProvider.stub'));
        $this->replace('{{ namespace }}', $this->namespace(), $this->packagePath('src/ServiceProvider.stub'));
        (new Filesystem)->move(
            $this->packagePath('src/ServiceProvider.stub'),
            $this->packagePath( 'src/' . $this->packageClass() . 'ServiceProvider.php' )
        );
    }

    /**
     * Add a path repository for the package to the application's composer.json file.
     *
     * @return void
     */
    protected function addPackageRepositoryToRootComposer()
    {
        $url = './packages/' . $this->argument('package');
        $composer = json_decode(file_get_contents(base_path('composer.json')), true);
        $composer['repositories'] ?? $composer['repositories'] = [];

        if (! collect($composer['repositories'])->firstWhere('url', $url)) {
            $composer['repositories'][] = [
                'type' => 'path',
                'url' => $url,
            ];

            file_put_contents(
                base_path('composer.json'),
                json_encode($composer, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
            );
        }
    }

    /**
     * Add a package entry for the package to the application's composer.json file.
     *
     * @return void
     */
    protected function addPackageToRootComposer()
    {
        $composer = json_decode(file_get_contents(base_path('composer.json')), true);

        $composer['require']['laranext/'.$this->argument('package')] = '*';

        file_put_contents(
            base_path('composer.json'),
            json_encode($composer, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );
    }

    /**
     * Update the project's composer dependencies.
     *
     * @return void
     */
    protected function composerUpdate()
    {
        $this->executeCommand(['composer', 'update']);
    }

    /**
     * Run the given command as a process.
     *
     * @param  string  $command
     * @param  string  $path
     * @return void
     */
    protected function executeCommand($command)
    {
        $process = (new Process($command))->setTimeout(null);

        // $process->setTty(Process::isTtySupported());

        $process->run(function ($type, $buffer) {
            echo $buffer;
        });
    }
}
