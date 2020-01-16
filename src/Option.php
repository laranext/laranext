<?php

namespace Laranext;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['key', 'value'];

    /**
     * Options cache prefix.
     */
    protected $prefix = 'option.';

    /**
     * Set Options in Database.
     */
    public function set($key, $value = null)
    {
        if (is_array($key)) {
            foreach ($key as $name => $value) {
                $this->persist($name, $value);
            }
        }
        else {
            $this->persist($key, $value);
        }
    }

    /**
     * Persist option in database.
     */
    protected function persist($key, $value)
    {
        $this->updateOrCreate(
            [
                'key' => $key,
            ],
            [
                'value' => $value,
            ]
        );

        Cache::forget($this->prefix . $key);
    }

    /**
     * Get Options from Database.
     */
    public function get($key, $default = null)
    {
        $value = Cache::rememberForever($this->prefix . $key, function () use ($key) {
            return optional(DB::table('options')->whereKey($key)->first())->value;
        });

        if ($value) {
            return $value;
        }

        return $default;
    }
}
