<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Admin Theme
    |--------------------------------------------------------------------------
    |
    */

    'theme' => 'default',

    'theme_provider' => Laranext\ThemeServiceProvider::class,

    /*
    |--------------------------------------------------------------------------
    | Front Site Theme
    |--------------------------------------------------------------------------
    |
    */

    'site_theme' => 'name',

    'site_theme_provider' => Laranext\DummyThemeServiceProvider::class,

    /*
    |--------------------------------------------------------------------------
    | Admin Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded on the
    | request to your application. Feel free to add your own services to
    | this array to grant expanded functionality to your applications.
    |
    */

    'admin_prefix' => '',

    'providers' => [],

    /*
    |--------------------------------------------------------------------------
    | Front Site Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded on the
    | request to your application. Feel free to add your own services to
    | this array to grant expanded functionality to your applications.
    |
    */

    'site_providers' => [],

];
