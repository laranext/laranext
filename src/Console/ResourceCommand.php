<?php

namespace Laranext\Console;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Artisan;

class ResourceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:resource
                            {name : Resource Name in Capital}
                            {package : Package base path and name}
                            {--model=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext resource';

    /**
     * The routes that need to be append.
     *
     * @var array
     */
    protected $routes = [
        'routes/api.php' => "Route::resource('{uri}', {controller}Controller::class);" . PHP_EOL,
    ];

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->call('laranext:controller', [
            'name' => $this->argument('name'),
            'package' => $this->argument('package'),
            '--model' => $this->option('model') ?? $this->argument('name'),
        ]);

        $this->call('laranext:filter', [
            'name' => $this->argument('name'),
            'package' => $this->argument('package'),
        ]);

        $this->call('laranext:request', [
            'name' => $this->argument('name'),
            'package' => $this->argument('package'),
        ]);

        $this->call('laranext:model', [
            'name' => $this->option('model') ?? $this->argument('name'),
            'package' => $this->argument('package'),
        ]);

        $this->call('laranext:migration', [
            'name' => Str::snake($this->plural()),
            'package' => $this->argument('package'),
        ]);

        $this->exportRoutes();

        $this->info('Resource scaffolding generated successfully.');
    }

    /**
     * Append web and api routes.
     *
     * @return void
     */
    protected function exportRoutes()
    {
        $route = "Route::resource('{uri}', {controller}Controller::class);" . PHP_EOL;
        $route = str_replace('{uri}', $this->kebabPlural(), $route);
        $route = str_replace('{controller}', $this->plural(), $route);

        file_put_contents(
            $this->packagePath('routes/api.php'),
            $route,
            FILE_APPEND
        );
    }
}
