<?php

namespace Laranext\Fields;

class Image extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'image-field';

    /**
     * Set Field URI.
     *
     * @param  string  $uri
     * @return $this
     */
    public function uri($uri)
    {
        $this->meta = ['uri' => $uri];

        return $this;
    }
}
