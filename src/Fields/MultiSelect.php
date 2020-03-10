<?php

namespace Laranext\Fields;

class MultiSelect extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'select-multi-field';

    /**
     * Live search options.
     *
     * @param  string  $uri
     * @return $this
     */
    public function searchable($uri, $column = 'name')
    {
        $this->withMeta([
            'uri' => $uri . '?column=' . $column
        ]);

        return $this;
    }

    /**
     * Select Filterable.
     *
     * @return $this
     */
    public function filterable()
    {
        $this->withMeta([
            'filterable' => true
        ]);

        return $this;
    }

    /**
     * Set Field for accept new value if not exists.
     *
     * @return $this
     */
    public function acceptNewValue()
    {
        $this->withMeta([
            'acceptNewValue' => true
        ]);

        return $this;
    }

    /**
     * Set Field Value.
     *
     * @param  bool  $value
     * @return $this
     */
    public function value($value, $default = [])
    {
        if (is_array($value)) {
            $this->value = empty($value) ? $default : $value;
        }
        else {
            $this->value = $default;
        }

        return $this;
    }
}
