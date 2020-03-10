<?php

namespace Laranext\Fields;

class Text extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'text-field';

    /**
     * Set Field Type.
     *
     * @param  string  $type
     * @return $this
     */
    public function type($type)
    {
        $this->withMeta(compact('type'));

        return $this;
    }
}
