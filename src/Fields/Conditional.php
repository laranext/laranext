<?php

namespace Laranext\Fields;

class Conditional extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'conditional-field';

    /**
     * The fields's condition.
     *
     * @var Array
     */
    public $condition = [];

    /**
     * The fields's.
     *
     * @var Array
     */
    public $fields = [];

    /**
     * Set the field condition.
     *
     * @return $this
     */
    public function condition($field, $value)
    {
        $this->condition['field'] = $field;
        $this->condition['value'] = $value;

        return $this;
    }

    /**
     * Set the fields.
     *
     * @return $this
     */
    public function fields($fields)
    {
        $this->fields = $fields;

        return $this;
    }

    /**
     * Prepare the field for JSON serialization.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'component' => $this->component,
            'condition' => $this->condition,
            'fields' => $this->fields,
        ];
    }
}
