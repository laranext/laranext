<?php

namespace Laranext;

use Illuminate\Support\Str;

class Laranext
{
    /**
     * Get the current Laranext version.
     */
    public static function version()
    {
        return '0.1.0';
    }

    /**
     * Indicates if the application is running in the console.
     */
    protected static $isRunningInConsole;

    /**
     * Current Theme Layout.
     */
    public static $theme = '';

    /**
     * Current Views Load Path.
     */
    public static $view = '';

    /**
     * Current Package Prefix.
     */
    public static $prefix = '';

    /**
     * Current Package Key.
     */
    public static $key = '';

    /**
     * All of the registered Laranext tool CSS.
     *
     * @var array
     */
    public static $header = 'theme::layouts.header';

    /**
     * All of the registered Laranext tool CSS.
     *
     * @var array
     */
    public static $sidebar = 'theme::layouts.sidebar';

    /**
     * Humanize the given value into a proper name.
     *
     * @param  string  $value
     * @return string
     */
    public static function humanize($value)
    {
        if (is_object($value)) {
            return static::humanize(class_basename(get_class($value)));
        }

        return Str::title(Str::snake($value, ' '));
    }

    /**
     * Determine if the application is running in the console.
     *
     * @return bool
     */
    public static function registerAllProviders()
    {
        static::$isRunningInConsole = true;

        app()->register(LaranextServiceProvider::class);

        foreach (array_merge(config('laranext.site_providers'), config('laranext.providers')) as $key => $provider) {
            if (is_string($provider)) {
                app()->register($provider);
            }
            else {
                app()->register($provider['provider']);
            }
        }
    }

    /**
     * Determine if the application is running in the console.
     *
     * @return bool
     */
    public static function runningInConsole($force = null)
    {
        if ( static::$isRunningInConsole === null) {
            static::$isRunningInConsole = $force ?? (\PHP_SAPI === 'cli' || \PHP_SAPI === 'phpdbg');
        }

        return static::$isRunningInConsole;
    }

    /**
     * Get the JSON variables that should be provided to the global Laranext JavaScript object.
     *
     * @return array
     */
    public static function header($path = null)
    {
        if ($path) {
            static::$header = $path . '::layouts.header';
        }

        return static::$header;
    }

    /**
     * Get the JSON variables that should be provided to the global Laranext JavaScript object.
     *
     * @return array
     */
    public static function sidebar($path = null)
    {
        if ($path) {
            static::$sidebar = $path . '::layouts.sidebar';
        }

        return static::$sidebar;
    }

    /**
     * Set and get current theme on runtime.
     *
     * @return string
     */
    public static function theme($theme = null)
    {
        return base_path('vendor/laranext/laranext/resources/views/');

        if ($theme) {
            static::$theme = $theme;
        }

        return static::$theme;
    }

    /**
     * Set and get current views on runtime.
     *
     * @return string
     */
    public static function view($view = null)
    {
        if ($view) {
            static::$view = $view;
        }

        return static::$view;
    }

    /**
     * Set and get current prefix on runtime.
     *
     * @return string
     */
    public static function prefix($prefix = null)
    {
        if ($prefix) {
            static::$prefix = $prefix;
        }

        return static::$prefix;
    }

    /**
     * Set and get current key on runtime.
     *
     * @return string
     */
    public static function key($key = null)
    {
        return $key ? static::$key = $key : static::$key;
    }
}
