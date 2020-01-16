<?php

namespace Laranext\Fields;

class Radio extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'radio-field';

    /**
     * Set the field is vertical.
     *
     * @return $this
     */
    public function vertical()
    {
        return $this->withMeta(['vertical' => true]);
    }
}
