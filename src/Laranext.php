<?php

namespace Laranext;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Artisan;

class Laranext
{
    use Concerns\Theme;

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
     * Current Views Load Path.
     */
    public static $views = '';

    /**
     * Current Package Prefix.
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
     * Set and get current key on runtime.
     *
     * @return string
     */
    public static function dummySeeder()
    {
        foreach (array_merge(config('laranext.site_providers'), config('laranext.providers')) as $key => $provider) {
            $namespace = Str::of($provider['provider'] ?? $provider)->beforeLast('\\');
            $seeder = $namespace . '\\Seeds\Dummy\DummySeeder';

            if (class_exists($seeder)) {
                (new $seeder)->run();
            }

            Artisan::call('cache:clear');
        }
    }

    /**
     * Set and get current key on runtime.
     *
     * @return string
     */
    public static function requireSeeder()
    {
        foreach (array_merge(config('laranext.site_providers'), config('laranext.providers')) as $key => $provider) {
            $namespace = Str::of($provider['provider'] ?? $provider)->beforeLast('\\');
            $seeder = $namespace . '\\Seeds\Required\RequireSeeder';

            if (class_exists($seeder)) {
                (new $seeder)->run();
            }

            Artisan::call('cache:clear');
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
     * Set and get current views on runtime.
     *
     * @return string
     */
    public static function views($views = null)
    {
        if ($views) {
            static::$views = base_path('packages/' . $views . '/resources/views');
        }

        return [
            __DIR__.'/../resources/views/',
            static::theme()
        ];
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
