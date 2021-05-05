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
                            {package : Package name}';

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
        $this->makeDir('database/migrations');

        $this->call('make:migration', [
            'name' => 'create_' . Str::snake($this->argument('name')) . '_table',
            '--create' => Str::snake($this->argument('name')),
            '--path' => $this->packagePath(),
        ]);

        $this->info('Migration generated successfully.');
    }

    /**
     * Get the path to the package.
     *
     * @return string
     */
    protected function packagePath($path = null)
    {
        return 'packages/' . $this->argument('package') . '/database/migrations/';
    }
}
