<?php

namespace Laranext\Requests\Concerns;

trait Helpers
{
    /**
     * Get Id's from array.
     *
     * @return array
     */
    public function getIds($array)
    {
        foreach ($array as $value) {
            $ids[] = $value['id'];
        }

        return $ids;
    }

    /**
     * Prepare model attributes.
     *
     * @return void
     */
    public function prepareModel($attributes = [], $isModel = null)
    {
        $model = $isModel ?? $this->model;

        foreach ($attributes as $attribute) {
            $model->{str_replace('.', '_', $attribute)} = $this->request->input($attribute);
        }
    }
}
