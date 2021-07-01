<?php

namespace Laranext;

use Illuminate\Support\Str;

class NestedCategory
{
    /**
     * The collection.
     *
     * @var \Illuminate\Support\Collection
     */
    public $collection;

    /**
     * The parents.
     *
     * @var array
     */
    public $parents = [];

    /**
     * The childs.
     *
     * @var array
     */
    public $childs = [];

    /**
     * Create a new instance.
     *
     * @param  array  $data
     * @return void
     */
    public function __construct($data = [])
    {
        $this->collection = collect($data);

        $this->prepareParents();
        $this->prepareChilds();
    }

    /**
     * Prepare parent categories.
     *
     * @return void
     */
    protected function prepareParents()
    {
        $this->parents = $this->collection->map(function ($item, $key) {
            return $this->getAttributes($key);
        })
        ->values()
        ->all();
    }

    /**
     * Prepair child categories.
     *
     * @return void
     */
    protected function prepareChilds()
    {
        $this->childs = $this->collection->values()->flatMap(function ($items, $key) {
            return array_map(function($value) use ($key) {
                return $this->getAttributes($value, $key + 1);
            }, $items);
        })->all();
    }

    /**
     * Get attributes.
     *
     * @param  string|array  $item
     * @param  int|null  $parent
     * @return array
     */
    protected function getAttributes($item, $parent = null)
    {
        $name = is_array($item) ? $item['name'] : $item;

        return array_merge([
            'parent_id' => $parent,
            'name' => $name,
            'key' => $name,
            'slug' => Str::slug($name),
            'is_default' => false,
            'color' => null,
            'icon' => null,
            'order' => 0,
            'is_default' => false,
            'meta' => null,
        ], is_array($item) ? $item : []);
    }

    /**
     * Get categories data.
     *
     * @return array
     */
    public function get()
    {
        return array_merge($this->parents, $this->childs);
    }

    /**
     * Create a new element.
     *
     * @param  array  $data
     * @return static
     */
    public static function make($data)
    {
        return new static($data);
    }
}
