<?php

namespace Laranext\Fields;

class Div extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'v-div';

    /**
     * Set Sub Fields.
     *
     * @param  array  $fields
     * @return $this
     */
    public function sub($fields)
    {
        $this->meta['sub'] = $fields;

        return $this;
    }

    /**
     * Set Classes.
     *
     * @param  string  $classes
     * @return $this
     */
    public function class($class)
    {
        $this->meta['class'] = $class;

        return $this;
    }
}
