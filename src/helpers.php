<?php

if (!function_exists('path')) {
    /**
     * Get the route path
     *
     * @return String
     */
    function path($key, $id = null)
    {
        $url = '/admin/' . app('config')->get('laranext.routes')[$key];

        if ($id)
            return str_replace('{id}', $id, $url);

        return $url;
    }
}

if (!function_exists('isActive')) {
    /**
     * Active Current Page Menu Item.
     *
     * @return String
     */
    function isActive($name, $segment)
    {
        return request()->segment($segment) == $name ? 'active' : '';
    }
}

if (! function_exists('option')) {
    /**
     * Get / set the specified option value.
     *
     * If an array is passed as the key, we will assume you want to set an array of values.
     *
     * @param  array|string|null  $key
     * @param  mixed  $default
     * @return mixed|\Laranext\Option
     */
    function option($key = null, $default = null)
    {
        $option = app('\Laranext\Option');

        if (is_array($key)) {
            $option->set($key);
        }
        elseif (! is_null($key)) {
            return $option->get($key, $default);
        }

        return $option;
    }
}
