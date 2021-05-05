<?php

namespace Laranext;

use JsonSerializable;

class Field implements JsonSerializable
{
    /**
     * The fields.
     *
     * @var array
     */
    public $fields = [];

    /**
     * Create a new field.
     *
     * @param  string  $name
     * @param  string  $value
     * @param  array  $options
     * @return $this
     */
    public function field($name, $value = null, $options = [])
    {
        $this->fields[] = compact('name', 'value', 'options');

        return $this;
    }

    /**
     * Create a new element.
     *
     * @return static
     */
    public static function make()
    {
        return new static;
    }

    /**
     * Prepare the field for JSON serialization.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return $this->fields;
    }
}
