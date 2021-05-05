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
        return '0.3.0';
    }

    /**
     * Indicates if the application is running in the console.
     */
    protected static $isRunningInConsole;

    /**
     * Current Prefix.
     */
    public static $prefix = '';

    /**
     * Current Package Key.
     */
    public static $key = '';

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
     * Register all laranext service providers.
     *
     * @return void
     */
    public static function registerAllProviders()
    {
        static::$isRunningInConsole = true;

        app()->register(LaranextServiceProvider::class);

        foreach (array_merge(config('laranext.prefix_providers'), config('laranext.providers')) as $key => $provider) {
            is_string($provider)
                ? app()->register($provider)
                : app()->register($provider['provider']);
        }
    }

    /**
     * Determine if the application is running in the console.
     *
     * @return bool
     */
    public static function runningInConsole($force = null)
    {
        if (static::$isRunningInConsole === null) {
            static::$isRunningInConsole = $force ?? (\PHP_SAPI === 'cli' || \PHP_SAPI === 'phpdbg');
        }

        return static::$isRunningInConsole;
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
