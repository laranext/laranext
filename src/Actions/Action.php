<?php

namespace Laranext\Actions;

use JsonSerializable;
use Laranext\Laranext;
use Illuminate\Support\Str;

abstract class Action implements JsonSerializable
{
    /**
     * The displayable name of the action.
     *
     * @var string
     */
    public $name;

    /**
     * The displayable message of the action.
     *
     * @var string
     */
    public $message = 'Are you sure you want to perform this action?';

    /**
     * The displayable button of the action.
     *
     * @var string
     */
    public $button = 'Run Action';

    /**
     * The displayable danger of the action.
     *
     * @var string
     */
    public $danger = false;

    /**
     * The meta data for the element.
     *
     * @var array
     */
    public $meta = [];

    /**
     * Get the displayable name of the action.
     *
     * @return string
     */
    public function name()
    {
        return $this->name ?: Laranext::humanize($this);
    }

    /**
     * Get the displayable button of the action.
     *
     * @return string
     */
    public function button()
    {
        return $this->button;
    }

    /**
     * Get the URI key for the action.
     *
     * @return string
     */
    public function uriKey()
    {
        return Str::slug($this->name());
    }

    /**
     * Return a message response from the action.
     *
     * @param  string  $message
     * @return array
     */
    public static function message($message)
    {
        return ['message' => $message];
    }

    /**
     * Return a dangerous message response from the action.
     *
     * @param  string  $message
     * @return array
     */
    public static function danger($message)
    {
        return ['danger' => $message];
    }

    /**
     * Get additional meta information to merge with the element payload.
     *
     * @return array
     */
    public function meta()
    {
        return $this->meta;
    }

    /**
     * Set additional meta information for the element.
     *
     * @param  array  $meta
     * @return $this
     */
    public function withMeta(array $meta)
    {
        $this->meta = array_merge($this->meta, $meta);

        return $this;
    }

    /**
     * Get the fields available on the action.
     *
     * @return array
     */
    public function fields()
    {
        return [];
    }

    /**
     * Prepare the filter for JSON serialization.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return array_merge([
            'name' => $this->name(),
            'key' => $this->uriKey(),
            'message' => $this->message,
            'button' => $this->button(),
            'danger' => $this->danger,
            'fields' => $this->fields(),
        ], $this->meta());
    }
}
