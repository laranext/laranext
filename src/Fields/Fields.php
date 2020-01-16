<?php

namespace Laranext\Fields;

use JsonSerializable;
use Laranext\Metable;

abstract class Fields implements JsonSerializable
{
    use Metable;

    /**
     * Model.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * Filters for fields from index.
     *
     * @var bool
     */
    protected $filters;

    /**
     * Filtered Fields.
     *
     * @var array
     */
    protected $fields = [];

    /**
     * Create a new fields.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     * @return void
     */
    public function __construct($model = null, $filters = false)
    {
        $this->model = $model;
        $this->filters = $filters;
    }

    /**
     * Filter index fields.
     *
     * @return array
     */
    protected function filter()
    {
        if (empty($this->filters)) {
            return $this->indexFields();
        }

        $type = array_key_first($this->filters);

        $this->$type(array_pop($this->filters));

        return $this->fields;
    }

    /**
     * Get a subset of the items from the given array.
     *
     * @return array
     */
    protected function only($filters)
    {
        foreach ($this->indexFields() as $field) {
            $exists = in_array($field->attribute, $filters);

            if ($exists) {
                $this->fields[] = $field;
            }
        }
    }

    /**
     * Get all of the given array except for a specified array of keys.
     *
     * @return array
     */
    protected function except($filters)
    {
        foreach ($this->indexFields() as $field) {
            $exists = in_array($field->attribute, $filters);

            if (!$exists) {
                $this->fields[] = $field;
            }
        }
    }

    /**
     * Prepare the field for JSON serialization.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        if ($this->filters !== false) {
            return $this->filter();
        }

        return array_merge([
            'fields' => $this->fields()
        ], $this->meta());
    }
}
