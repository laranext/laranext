<?php

namespace Laranext;

trait Optionable
{
    /**
     * Get options.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOptions($query)
    {
        return $query->get(['id as value', 'name as label']);
    }
}
