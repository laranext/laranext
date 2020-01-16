<?php

namespace Laranext\Filters;

use JsonSerializable;
use Laranext\Laranext;
use Illuminate\Http\Request;

abstract class Filter implements JsonSerializable
{
    /**
     * The displayable name of the filter.
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
     * The filter's component.
     *
     * @var string
     */
    public $component = 'select-filter';

    /**
     * The attribute / column name of the field.
     *
     * @var string
     */
    public $horizontal = false;

    /**
     * The meta data for the element.
     *
     * @var array
     */
    public $meta = [];

    /**
     * Apply the filter to the given query.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    abstract public function apply($query, $value);

    /**
     * Get the filter's available options.
     *
     * @return array
     */
    abstract public function options();

    /**
     * Get the component name for the filter.
     *
     * @return string
     */
    public function component()
    {
        return $this->component;
    }

    /**
     * Get the displayable name of the filter.
     *
     * @return string
     */
    public function name()
    {
        return $this->name ?: Laranext::humanize($this);
    }

    /**
     * Get the key for the filter.
     *
     * @return string
     */
    public function key()
    {
        return get_class($this);
    }

    /**
     * Set the default options for the filter.
     *
     * @return array|mixed
     */
    public function default()
    {
        return '';
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
     * Prepare the filter for JSON serialization.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return array_merge([
            'name' => $this->name(),
            'attribute' => $this->attribute,
            'component' => $this->component(),
            'horizontal' => $this->horizontal,
            'options' => collect($this->options())->map(function ($value, $key) {
                return is_array($value) ? ($value + ['value' => $key]) : ['name' => $key, 'value' => $value];
            })->values()->all(),
            'value' => $this->default() ?? '',
        ], $this->meta());
    }
}
