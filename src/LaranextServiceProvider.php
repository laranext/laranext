<?php

namespace Laranext;

use Illuminate\Support\ServiceProvider;

class LaranextServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPublishing();
    }

    /**
     * Register the package's publishable resources.
     *
     * @return void
     */
    protected function registerPublishing()
    {
        $this->publishes([
            __DIR__.'/../config/laranext.php' => config_path('laranext.php'),
        ], 'laranext-config');

        $this->publishes([
            __DIR__.'/../public' => public_path('vendor/laranext'),
        ], 'laranext-assets');

        $this->publishes([
            __DIR__.'/../database/seeds' => base_path('database/seeds'),
        ], 'laranext-seeds');

        $this->publishes([
            __DIR__.'/../database/migrations' => base_path('database/migrations'),
        ], 'laranext-migrations');

        $this->publishes([
            __DIR__.'/../resources/views/layouts' => resource_path('views/layouts'),
        ], 'laranext-views');

        $this->publishes([
            __DIR__.'/../resources/views/auth' => resource_path('views/auth'),
        ], 'laranext-auth-views');

        $this->publishes([
            __DIR__.'/../resources/lang' => resource_path('lang'),
        ], 'laranext-lang');

        $this->publishes([
            __DIR__.'/../.babelrc' => base_path('laranext/.babelrc'),
            __DIR__.'/../.gitignore' => base_path('laranext/.gitignore'),
            __DIR__.'/../tailwind.config.js' => base_path('laranext/tailwind.config.js'),
            __DIR__.'/../package.json' => base_path('laranext/package.json'),
            __DIR__.'/../webpack.mix.stub.js' => base_path('laranext/webpack.mix.js'),
            __DIR__.'/../resources/sass' => base_path('laranext/resources/sass'),
            __DIR__.'/../resources/js' => base_path('laranext/resources/js'),
        ], 'laranext-custom');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->commands([
            Console\AuthCommand::class,
            Console\InstallCommand::class,
            Console\PublishCommand::class,
            Console\VersionCommand::class,

            Console\ActionCommand::class,
            Console\ActionsCommand::class,
            Console\ControllerCommand::class,
            Console\FieldsCommand::class,
            Console\FilterCommand::class,
            Console\FiltersCommand::class,
            Console\MigrationCommand::class,
            Console\ModelCommand::class,
            Console\PackageCommand::class,
            Console\RequestCommand::class,
            Console\ResourceCollectionCommand::class,
            Console\ResourceCommand::class,
            Console\ViewsCommand::class,
        ]);
    }
}
