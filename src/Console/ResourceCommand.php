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
                            {--model=}
                            {--dev}';

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
        'routes/web.php' => "Route::resource('{uri}', {controller}Controller::class)->except(['store', 'update', 'destroy']);" . PHP_EOL,
        'routes/api.php' => "Route::resource('{uri}', {controller}Controller::class);" . PHP_EOL,
    ];

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->call('laranext:views', [
            'name' => $this->argument('name'),
            'package' => $this->argument('package'),
            '--dev' => $this->option('dev'),
        ]);

        $this->call('laranext:migration', [
            'name' => $this->option('model') ?? $this->argument('name'),
            'package' => $this->argument('package'),
            '--dev' => $this->option('dev'),
        ]);

        $this->call('laranext:model', [
            'name' => $this->option('model') ?? $this->argument('name'),
            'package' => $this->argument('package'),
            '--dev' => $this->option('dev'),
        ]);

        $this->call('laranext:fields', [
            'name' => $this->argument('name'),
            'package' => $this->argument('package'),
            '--dev' => $this->option('dev'),
        ]);

        $this->call('laranext:request', [
            'name' => $this->argument('name'),
            'package' => $this->argument('package'),
            '--dev' => $this->option('dev'),
        ]);

        $this->call('laranext:actions', [
            'name' => $this->argument('name'),
            'package' => $this->argument('package'),
            '--dev' => $this->option('dev'),
        ]);

        $this->call('laranext:filters', [
            'name' => $this->argument('name'),
            'package' => $this->argument('package'),
            '--dev' => $this->option('dev'),
        ]);

        $this->call('laranext:resourcecollection', [
            'name' => $this->argument('name'),
            'package' => $this->argument('package'),
            '--dev' => $this->option('dev'),
        ]);

        $this->call('laranext:controller', [
            'name' => $this->argument('name'),
            'package' => $this->argument('package'),
            '--model' => $this->option('model') ?? $this->argument('name'),
            '--dev' => $this->option('dev'),
        ]);

        $this->call('laranext:controller', [
            'name' => $this->argument('name'),
            'package' => $this->argument('package'),
            '--model' => $this->option('model') ?? $this->argument('name'),
            '--dev' => $this->option('dev'),
            '--api' => true,
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
        foreach ($this->routes as $file => $route) {
            $route = str_replace('{uri}', $this->kebabPlural(), $route);
            $route = str_replace('{controller}', $this->plural(), $route);

            file_put_contents(
                $this->packagePath($file),
                $route,
                FILE_APPEND
            );
        }
    }
}
