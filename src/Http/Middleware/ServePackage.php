<?php

namespace Laranext\Http\Middleware;

use Laranext\Laranext;

class ServePackage
{
    /**
     * The incoming request.
     *
     * @var \Illuminate\Http\Request
     */
    protected $request;

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     */
    public function handle($request, $next)
    {
        $this->request = $request;

        if ($provider = $this->isApiRequest()) {
            app()->register($provider);

            return $next($request);
        }

        if ($provider = $this->isBackendRequest()) {
            app()->register(config('laranext.theme_provider'));

            app()->register($provider);
        }
        else {
            $this->registerSiteProvider();
        }

        return $next($request);
    }

    /**
     * Determine if the given request is intended for API.
     *
     * @return bool
     */
    protected function isApiRequest()
    {
        if ($this->request->segment(1) == 'laranext-api') {
            return $this->getProvider($this->request->segment(2), config('laranext.providers'));
        }

        return false;
    }

    /**
     * Determine if the given request is intended for Back-End.
     *
     * @return bool
     */
    protected function isBackendRequest()
    {
        return $this->getProvider($this->key(), config('laranext.providers'));
    }

    /**
     * Determine if the given request is intended for Back-End.
     *
     * @return string
     */
    protected function key()
    {
        return config('laranext.admin_prefix')
                    ? $this->withPrefix()
                    : $this->withoutPrefix();
    }

    /**
     * Determine if the given request is with prefix
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function withPrefix()
    {
        if ($this->request->segment(1) == 'laranext-api') {
            return $this->request->segment(3);
        }

        return $this->request->segment(2);
    }

    /**
     * Determine if the given request is without prefix
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function withoutPrefix()
    {
        if ($this->request->segment(1) == 'laranext-api') {
            return $this->request->segment(2);
        }

        return $this->request->segment(1);
    }

    /**
     * Get provider from an array.
     *
     * @param  string  $key
     * @param  array  $array
     * @return string|null
     */
    protected function getProvider($key, $array)
    {
        if (array_key_exists($key, $array)) {
            return $array[$key];
        }

        return null;
    }

    /**
     * Register Front Site Provider as per request.
     *
     * @param  string  $key
     * @param  array  $array
     * @return string|null
     */
    protected function registerSiteProvider()
    {
        $provider = null;

        if ($this->request->segment(1)) {
            $provider = $this->getProvider($this->request->segment(1), config('laranext.site_providers'));
        }
        else {
            $provider = $this->getProvider('', config('laranext.site_providers'));
        }

        if ($provider) {
            if (is_string($provider)) {
                app()->register($provider);
                app()->register(config('laranext.site_theme_provider'));

                return;
            }

            app()->register($provider['provider']);
            app()->register($provider['theme_provider']);
        }
        else {
            app()->register(config('laranext.site_theme_provider'));
        }
    }
}
