<?php

namespace Laranext\Http\Middleware;

use Laranext\Laranext;

class ServePackage
{
    /**
     * The request instance.
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

        if ($provider = $this->isLaranextRequest()) {
            app()->register($provider);
        }

        return $next($request);
    }

    /**
     * Determine if the given request is intended for Laranext.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function isLaranextRequest()
    {
        if ($this->request->segment(1) == 'laranext-api' || $this->request->segment(1) == config('laranext.admin_prefix')) {
            Laranext::prefix(config('laranext.admin_prefix'));

            return $this->getProvider($this->request->segment(2), config('laranext.providers'));
        }

        $provider = $this->getProvider($this->request->segment(1), config('laranext.providers'));
        $siteProvider = $this->getProvider($this->request->segment(1), config('laranext.site_providers'));

        if ($siteProvider) {
            return $siteProvider;
        }

        return config('laranext.admin_prefix') ? false : $provider;
    }

    /**
     * Get laranext provider based on current key.
     *
     * @param  string  $key
     * @param  array  $array
     * @return string
     */
    protected function getProvider($key, $array)
    {
        if (array_key_exists($key, $array)) {
            Laranext::key($key);

            if (is_string($array[$key])) {
                return $array[$key];
            }

            Laranext::views($array[$key]['views']);

            return $array[$key]['provider'];
        }
        elseif (array_key_exists('', $array)) {
            if (is_string($array[''])) {
                return $array[''];
            }

            Laranext::views($array['']['views']);

            return $array['']['provider'];
        }
    }
}
