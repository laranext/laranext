<?php

namespace Laranext;

use Illuminate\Support\Str;

class Laranext
{
    /**
     * Get the current Laranext version.
     *
     * @return string
     */
    public static function version()
    {
        return '0.0.5';
    }

    /**
     * Current Theme Layout.
     *
     * @var string
     */
    public static $theme = '';

    /**
     * Current Views Load Path.
     *
     * @var string
     */
    public static $view = '';

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
}
