<?php

namespace Laranext\Fields;

class Select extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'select-field';

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

    /**
     * Live search options.
     *
     * @param  string  $uri
     * @return $this
     */
    public function searchable($uri, $column = 'name')
    {
        $this->component = 'select-searchable-field';

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
        $this->component = 'select-searchable-field';

        $this->withMeta([
            'filterable' => true
        ]);

        return $this;
    }
}
