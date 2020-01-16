<?php

namespace Laranext;

use Illuminate\Support\ServiceProvider;
use Laranext\Http\Middleware\ServePackage;
use Illuminate\Contracts\Http\Kernel as HttpKernel;

class LaranextCoreServiceProvider extends ServiceProvider
{
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

        if ($this->app->runningInConsole()) {
            $this->app->register(LaranextServiceProvider::class);

            $this->app->register(config('laranext.theme_provider'));
            $this->app->register(config('laranext.site_theme_provider'));

            foreach (array_merge(config('laranext.site_providers'), config('laranext.providers')) as $key => $provider) {
                if (is_string($provider)) {
                    $this->app->register($provider);
                }
                else {
                    $this->app->register($provider['provider']);
                }
            }
        }

        $this->app->make(HttpKernel::class)
                    ->pushMiddleware(ServePackage::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
