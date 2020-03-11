<?php

namespace Laranext\Fields;

class Label extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'label-field';

    /**
     * Set Field Labels.
     *
     * @param  array  $labels
     * @return $this
     */
    public function labels($labels)
    {
        $this->withMeta(compact('labels'));

        return $this;
    }
}
