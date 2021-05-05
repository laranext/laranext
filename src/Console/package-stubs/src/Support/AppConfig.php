<?php

namespace {{ namespace }}\Support;

use JsonSerializable;
use Laranext\Laranext;

class AppConfig implements JsonSerializable
{
    protected $config = [];

    /**
     * Create a new instance.
     */
    public function __construct()
    {
        $this->handle();
    }

    /**
     * Prepare configs.
     *
     * @return void
     */
    protected function handle()
    {
        $this->config = [
            'csrf_token' => csrf_token(),
            'prefix' => Laranext::prefix(),
            'user' => auth()->user(),
            'options' => ['email_config' => option('email_config')],
            'options' => ['email_config' => true],
            // 'permissions' => auth()->user()->allPermissions(),
            'permissions' => [],
            // 'messages' => array_merge(trans('messages'), (array) trans(Laranext::key().'::messages')),
            'messages' => trans('messages'),
            'meta' => [
                // 'is_super_admin' => auth()->user()->isSuperAdmin(),
                'is_super_admin' => true,
                'locale' => env('APP_LOCALE'),
                'app_updates' => option('app_updates'),
                'purchase_code' => env('PURCHASE_CODE'),
            ],
        ];
    }

    /**
     * Prepare the field for JSON serialization.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return $this->config;
    }
}
