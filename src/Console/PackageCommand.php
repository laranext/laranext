<?php

namespace Laranext\Console;

use Illuminate\Support\Str;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Process\Process;

class PackageCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:package {package} {--namespace=} {--singular} {--dev}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package';

    /**
     * The files that need to be exported.
     *
     * @var array
     */
    protected $files = [
        'routes/api.php',
        'routes/web.php',
        'src/ServiceProvider.stub',
        'src/Http/Controllers/Api/ActionsController.php',
        'src/Http/Controllers/Api/FiltersController.php',
        'composer.json'
    ];

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

        $this->renameStubs();

        $this->updateFiles();

        // Register the package...
        if ($this->confirm('Would you like to update your Composer packages?', true)) {
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
        foreach ($this->files as $file) {
            $this->replace('{{ class }}', $this->packageClass(), $this->packagePath($file));
            $this->replace('{{ namespace|lowercase }}', $this->namespaceLowercase(), $this->packagePath($file));
            $this->replace('{{ namespace }}', $this->option('namespace') ?? 'Laranext', $this->packagePath($file));
            $this->replace('{{ name }}', $this->argument('package'), $this->packagePath($file));
            $this->replace('{{ plural }}', $this->option('singular') ? $this->argument('package') : Str::plural($this->argument('package')), $this->packagePath($file));

            if ($file == 'src/ServiceProvider.stub') {
                (new Filesystem)->move(
                    $this->packagePath($file),
                    $this->packagePath( 'src/' . $this->packageClass() . 'ServiceProvider.php' )
                );
            }
        }
    }

    /**
     * Get the array of stubs that need PHP file extensions.
     *
     * @return array
     */
    protected function stubsToRename()
    {
        return [
            $this->packagePath('routes/web.stub'),
            $this->packagePath('routes/api.stub'),
            $this->packagePath('src/Http/Controllers/Api/ActionsController.stub'),
            $this->packagePath('src/Http/Controllers/Api/FiltersController.stub'),
        ];
    }

    /**
     * Add a path repository for the package to the application's composer.json file.
     *
     * @return void
     */
    protected function addPackageRepositoryToRootComposer()
    {
        $composer = json_decode(file_get_contents(base_path('composer.json')), true);

        $composer['repositories'][] = [
            'type' => 'path',
            'url' => ($this->option('dev') ? '../packages/'.$this->namespaceLowercase().'/' : './packages/') . $this->argument('package'),
        ];

        file_put_contents(
            base_path('composer.json'),
            json_encode($composer, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );
    }

    /**
     * Add a package entry for the package to the application's composer.json file.
     *
     * @return void
     */
    protected function addPackageToRootComposer()
    {
        $composer = json_decode(file_get_contents(base_path('composer.json')), true);

        $composer['require'][$this->namespaceLowercase().'/'.$this->argument('package')] = '*';

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
        $this->executeCommand('composer update', getcwd());
    }

    /**
     * Update the project's composer dependencies.
     *
     * @return void
     */
    protected function namespaceLowercase()
    {
        return strtolower($this->option('namespace') ?? 'Laranext');
    }

    /**
     * Run the given command as a process.
     *
     * @param  string  $command
     * @param  string  $path
     * @return void
     */
    protected function executeCommand($command, $path)
    {
        $process = (new Process($command, $path))->setTimeout(null);

        if ('\\' !== DIRECTORY_SEPARATOR && file_exists('/dev/tty') && is_readable('/dev/tty')) {
            $process->setTty(true);
        }

        $process->run(function ($type, $line) {
            $this->output->write($line);
        });
    }
}
