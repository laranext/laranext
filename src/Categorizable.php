<?php

namespace Laranext;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Builder;

trait Categorizable
{
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            $model->parent_id = static::getId(static::$parent);
            $model->slug = Str::slug($model->name);
        });

        static::addGlobalScope('parent', function (Builder $builder) {
            $builder->whereParentId(
                static::getId(static::$parent)
            );
        });
    }

    /**
     * Get the parent category id.
     *
     * @return int
     */
    public static function parentId()
    {
        return static::getId(static::$parent);
    }

    /**
     * Get the category id with key.
     *
     * @param  string $key
     * @return int
     */
    public static function getId($key)
    {
        return Cache::rememberForever('category:' . Str::slug($key), function () use ($key) {
            return optional(DB::table('categories')->whereKey($key)->first())->id;
        });
    }

    /**
     * Get options.
     *
     * @param  Builder       $query
     * @return Builder
     */
    public function scopeOptions($query)
    {
        return $query->get(['id as value', 'name as label']);
    }

    /**
     * Scope a query to only include specified parent categories.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeParent($query, $parent)
    {
        return $query->whereParentId(
            $this->getId($parent)
        );
    }
}
