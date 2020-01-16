<?php

namespace Laranext\Fields;

use Closure;
use JsonSerializable;
use Illuminate\Support\Str;

abstract class Field implements JsonSerializable
{
    /**
     * The element's component.
     *
     * @var string
     */
    public $component;

    /**
     * The element's component.
     *
     * @var string
     */
    public $field = 'inline-field';

    /**
     * The displayable name of the field.
     *
     * @var string
     */
    public $name;

    /**
     * The attribute / column name of the field.
     *
     * @var string
     */
    public $attribute;

    /**
     * The field's resolved value.
     *
     * @var mixed
     */
    public $value;

    /**
     * The field is readonly.
     *
     * @var Boolean
     */
    public $readonly;

    /**
     * The field info.
     *
     * @var String
     */
    public $info;

    /**
     * The field add link.
     *
     * @var array
     */
    public $add = [];

    /**
     * The field options.
     *
     * @var mixed
     */
    public $options;

    /**
     * The field required.
     *
     * @var boolean
     */
    public $required;

    /**
     * Indicates if the field should be sortable.
     *
     * @var bool
     */
    public $sortable = false;

    /**
     * The text alignment for the field's text in tables.
     *
     * @var string
     */
    public $align = 'left';

    /**
     * The meta data for the element.
     *
     * @var array
     */
    public $meta = [];

    /**
     * Create a new field.
     *
     * @param  string  $name
     * @param  string|callable|null  $attribute
     * @return void
     */
    public function __construct($name = null, $attribute = null)
    {
        $this->name = $name;

        $this->attribute = $attribute ?? str_replace(' ', '_', Str::lower($name));
    }

    /**
     * Set the component name for the field.
     *
     * @return string
     */
    public function component($component)
    {
        $this->component = $component;

        return $this;
    }

    /**
     * Set Field Value.
     *
     * @param  bool  $value
     * @return $this
     */
    public function value($value, $default = null)
    {
        if (is_array($value)) {
            $this->value = empty($value) ? $default : $value;
        }
        else {
            $this->value = $value ?? $default;
        }

        return $this;
    }

    /**
     * Set the field is readonly.
     *
     * @return $this
     */
    public function readonly($readonly = true)
    {
        $this->readonly = $readonly;

        return $this;
    }

    /**
     * Set the field info.
     *
     * @return $this
     */
    public function info($info)
    {
        $this->info = $info;

        return $this;
    }

    /**
     * Set the field add link.
     *
     * @return $this
     */
    public function add($name, $uri)
    {
        $this->add['name'] = $name;
        $this->add['uri'] = $uri;

        return $this;
    }

    /**
     * Set the field is options.
     *
     * @return $this
     */
    public function options($options = [])
    {
        $this->options = $options;

        return $this;
    }

    /**
     * Set the field is required.
     *
     * @return $this
     */
    public function required()
    {
        $this->required = true;

        return $this;
    }

    /**
     * Set the field type.
     *
     * @return $this
     */
    public function grid()
    {
        $this->field = 'grid-field';

        return $this;
    }

    /**
     * Specify that this field should be sortable.
     *
     * @param  bool  $value
     * @return $this
     */
    public function sortable($value = true)
    {
        $this->sortable = $value;

        return $this;
    }

    /**
     * Set the text alignment of the field.
     *
     * @param  string  $alignment
     * @return $this
     */
    public function align($alignment)
    {
        $this->align = $alignment;

        return $this;
    }

    /**
     * Get additional meta information to merge with the element payload.
     *
     * @return array
     */
    public function meta()
    {
        return $this->meta;
    }

    /**
     * Set additional meta information for the element.
     *
     * @param  array  $meta
     * @return $this
     */
    public function withMeta(array $meta)
    {
        $this->meta = array_merge($this->meta, $meta);

        return $this;
    }

    /**
     * Create a new element.
     *
     * @return static
     */
    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }

    /**
     * Prepare the field for JSON serialization.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return array_merge([
            'component' => $this->component,
            'field' => $this->field,
            'name' => $this->name,
            'attribute' => $this->attribute,
            'required' => $this->required,
            'value' => $this->value,
            'readonly' => $this->readonly,
            'info' => $this->info,
            'add' => $this->add,
            'options' => $this->options,
            'sortable' => $this->sortable,
            'align' => $this->align,
        ], $this->meta());
    }
}
