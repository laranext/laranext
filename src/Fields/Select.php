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
}
