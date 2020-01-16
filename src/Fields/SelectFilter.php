<?php

namespace Laranext\Fields;

class SelectFilter extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'select-filter-field';

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

        $this->meta = ['type' => 'object'];
    }

    /**
     * Set Field Value.
     *
     * @param  bool  $value
     * @return $this
     */
    public function value($value, $default = null)
    {
        $this->value = $value ?? ['id' => null, 'name' => null];

        return $this;
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
     * Set Field Quick Add.
     *
     * @param  string  $uri
     * @return $this
     */
    public function quickAdd($data)
    {
        $this->meta = ['quickAdd' => $data];

        return $this;
    }
}
