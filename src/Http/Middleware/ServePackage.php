<?php

namespace Laranext\Http\Middleware;

use Laranext\Laranext;

class ServePackage
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     */
    public function handle($request, $next)
    {
        if ($provider = $this->isLaranextRequest($request)) {
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
    protected function isLaranextRequest($request)
    {
        if (in_array($request->segment(1), config('laranext.excluded_routes'))) {
            return false;
        }

        $hasPrefix = $request->segment(1) == config('laranext.prefix');
        $key = $hasPrefix ? $request->segment(2) : $request->segment(1);
        $providers = $hasPrefix
            ? config('laranext.prefix_providers')
            : config('laranext.providers');

        if (array_key_exists($key, $providers)) {
            Laranext::key($key);
            Laranext::prefix($hasPrefix ? config('laranext.prefix') . '/' . $key : $key);

            return $providers[$key];
        } elseif (array_key_exists('', $providers)) {
            Laranext::prefix($hasPrefix ? config('laranext.prefix') : '');

            return $providers[''];
        }
    }
}
