<?php

namespace Laranext\Concerns;

trait Theme
{
    /**
     * Current Theme Layout.
     */
    public static $theme;

    /**
     * Current Theme Name.
     */
    public static $themeName = 'default';

    /**
     * Current Site Theme Layout.
     */
    public static $siteTheme;

    /**
     * Current Site Theme Name.
     */
    public static $siteThemeName = 'default';

    /**
     * Current Header Name.
     *
     * @var string
     */
    public static $header = 'layouts.header';

    /**
     * Current Sidebar Name.
     *
     * @var string
     */
    public static $sidebar = 'layouts.sidebar';

    /**
     * Register custom header.
     *
     * @return string
     */
    public static function header($name = null)
    {
        if ($name) {
            static::$header = 'layouts.header_' . $name;
        }

        return static::$header;
    }

    /**
     * Register custom sidebar.
     *
     * @return string
     */
    public static function sidebar($name = null)
    {
        if ($name) {
            static::$sidebar = 'layouts.sidebar_' . $name;
        }

        return static::$sidebar;
    }

    /**
     * Set current theme name on runtime.
     *
     * @return string
     */
    public static function themeName()
    {
        return static::$themeName;
    }

    /**
     * Set current site theme name on runtime.
     *
     * @return string
     */
    public static function siteThemeName()
    {
        return static::$siteThemeName;
    }

    /**
     * Set and get current theme on runtime.
     *
     * @return string
     */
    public static function theme($theme = null)
    {
        if ($theme) {
            static::$theme = base_path("packages/{$theme}/resources/views");
            static::$themeName = $theme;
        }
        elseif (!static::$theme) {
            static::$theme = base_path('laranext/resources/views');
        }

        return static::$theme;
    }

    /**
     * Set and get current site theme on runtime.
     *
     * @return string
     */
    public static function siteTheme($theme = null)
    {
        if ($theme) {
            static::$siteTheme = base_path("packages/{$theme}/resources/views");
            static::$siteThemeName = $theme;
        }
        elseif (!static::$theme) {
            static::$siteTheme = base_path('packages/site-theme/resources/views');
        }

        return static::$siteTheme;
    }
}
