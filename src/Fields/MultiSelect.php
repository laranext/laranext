<?php

namespace Laranext\Fields;

class MultiSelect extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'multi-select-field';

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
     * Set Field Live URI.
     *
     * @param  string  $uri
     * @return $this
     */
    public function uri($uri)
    {
        $this->meta = array_merge($this->meta, compact('uri'));

        return $this;
    }

    /**
     * Set Field for accept new value if not exists.
     *
     * @return $this
     */
    public function acceptNewValue()
    {
        $this->meta = array_merge($this->meta, ['accept-new-value' => true]);

        return $this;
    }
}
