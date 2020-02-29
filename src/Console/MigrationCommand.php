<?php

namespace Laranext\Console;

use Illuminate\Support\Str;

class MigrationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:migration
                            {name : Migration name}
                            {package : Package name}
                            {--dev}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package migration';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->makeDir('');

        $this->call('make:migration', [
            'name' => 'create_' . Str::snake($this->plural()).'_table',
            '--create' => Str::snake($this->plural()),
            '--path' => $this->packagePath(),
        ]);

        $this->info('Migration generated successfully.');
    }

    /**
     * Build the directory if not exists.
     *
     * @param  string  $path
     * @return string
     */
    protected function makeDir($path)
    {
        if (! is_dir($directory = base_path($this->packagePath()))) {
            mkdir($directory, 0755, true);
        }
    }

    /**
     * Get the path to the package.
     *
     * @return string
     */
    protected function packagePath($path = null)
    {
        if ($this->option('dev')) {
            return '../laranext/' . $this->argument('package') . '/database/migrations/';
        }

        return 'packages/' . $this->argument('package') . '/database/migrations/';
    }
}
