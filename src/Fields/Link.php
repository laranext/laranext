<?php

namespace Laranext\Fields;

class Link extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'link-field';

    /**
     * Set Field Url.
     *
     * @param  string  $url
     * @return $this
     */
    public function url($url)
    {
        $this->meta = ['url' => $url];

        return $this;
    }
}
