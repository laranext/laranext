<?php

namespace Laranext\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Option extends Model
{
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
        } else {
            $this->persist($key, $value);
        }
    }

    /**
     * Persist option in database.
     */
    protected function persist($key, $value)
    {
        $this->updateOrCreate(
            ['key' => $key],
            ['value' => is_array($value) ? serialize($value) : $value]
        );

        Cache::forget($this->prefix . $key);
    }

    /**
     * Get Options from Database.
     */
    public function get($key, $default = null)
    {
        $value = Cache::rememberForever($this->prefix . $key, function () use ($key) {
            $option = optional(DB::table('options')->whereKey($key)->first());

            if ((@unserialize($option->value) !== false)) {
                return unserialize($option->value);
            }

            return $option->value;
        });

        if ($value || is_array($value)) {
            return $value;
        }

        return $default;
    }

    /**
     * Set Theme Settings in Database.
     */
    public function setThemeSetting($settings)
    {
        $this->persist(
            'theme_settings',
            array_merge(
                $this->get('theme_settings'),
                $settings
            )
        );
    }

    /**
     * Get Theme Settings from Database.
     */
    public function getThemeSetting($key, $default = null)
    {
        return $this->get('theme_settings')[$key] ?? $default;
    }
}
