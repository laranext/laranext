<?php

namespace Laranext;

use JsonSerializable;

class IndexCollection implements JsonSerializable
{
    use Metable;

    /**
     * The resource instance.
     *
     * @var mixed
     */
    public $fields;

    /**
     * The resource instance.
     *
     * @var mixed
     */
    public $resource;

    /**
     * The items.
     *
     * @var \Illuminate\Support\Collection
     */
    public $items = [];

    /**
     * Create a new collection.
     *
     * @param \Illuminate\Database\Eloquent\Model $resource
     * @return void
     */
    public function __construct($resource, $fields)
    {
        $this->resource = $resource;
        $this->fields = $fields;

        $this->handle();
    }

    /**
     * Prepare index collection.
     *
     * @return void
     */
    public function handle()
    {
        $this->items = $this->resource->map(function ($item) {
            return [
                'id' => $item->id,
                'fields' => new $this->fields($item, request()->only(['only', 'except']))
            ];
        });
    }

    /**
     * Prepare the field for JSON serialization.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return array_merge([
            'meta' => [
                'prev' => $this->resource->previousPageUrl(),
                'next' => $this->resource->nextPageUrl(),
            ],
            'data' => $this->items,
        ], $this->meta());
    }
}
