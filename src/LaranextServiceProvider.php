<?php

namespace Laranext;

use Illuminate\Support\ServiceProvider;

class LaranextServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->commands([
            Console\InstallCommand::class,
            Console\ControllerCommand::class,
            Console\FilterCommand::class,
            Console\MigrationCommand::class,
            Console\ModelCommand::class,
            Console\PackageCommand::class,
            Console\RequestCommand::class,
            Console\ResourceCommand::class,
            Console\SeedCommand::class,
        ]);
    }

    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerMigrations();

        $this->publishes([
            __DIR__.'/../config/laranext.php' => config_path('laranext.php'),
        ], 'laranext-config');
    }

    /**
     * Register the package migrations.
     *
     * @return void
     */
    protected function registerMigrations()
    {
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
    }
}
