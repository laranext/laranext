<?php

namespace Laranext\Fields;

class Checkbox extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'checkbox-field';

    /**
     * Create a new field.
     *
     * @param  string  $name
     * @param  string|callable|null  $attribute
     * @return void
     */
    public function __construct($name = null, $attribute = null)
    {
        parent::__construct($name, $attribute);

        $this->meta = ['type' => 'array'];
    }

    /**
     * Set the field is vertical.
     *
     * @return $this
     */
    public function vertical()
    {
        return $this->withMeta(['vertical' => true]);
    }

    /**
     * Set the checkbox classes.
     *
     * @return $this
     */
    public function classes($classes)
    {
        return $this->withMeta(['classes' => $classes]);
    }
}
