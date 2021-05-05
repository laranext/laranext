<?php

namespace Laranext;

use Illuminate\Support\ServiceProvider;
use Laranext\Http\Middleware\ServePackage;
use Illuminate\Contracts\Http\Kernel as HttpKernel;

class LaranextCoreServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot()
    {
        if (! $this->app->configurationIsCached()) {
            $this->mergeConfigFrom(__DIR__.'/../config/laranext.php', 'laranext');
        }

        if (Laranext::runningInConsole()) {
            Laranext::registerAllProviders();
        }

        $this->app->make(HttpKernel::class)
                    ->pushMiddleware(ServePackage::class);
    }
}
