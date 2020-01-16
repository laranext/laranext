<?php

namespace Laranext;

use Illuminate\Support\Str;
use Illuminate\Http\Request;

class UpdateEnvConfig
{
    /**
     * @var \Illuminate\Http\Request
     */
    protected $request;

    /**
     * @var array
     */
    protected $configs;

    /**
     * Create a new instance.
     *
     * @param Request $request
     * @param \Illuminate\Database\Eloquent\Model $model
     */
    public function __construct(Request $request, array $configs)
    {
        $this->configs = $configs;
        $this->request = $request;

        $this->handle();
    }

    /**
     * Handle Env Config.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->configs as $key => $value) {
            $search = $this->getValue($key, option($value));
            $replace = $this->getValue($key, $this->request->{$value});

            $this->updateEnv($search, $replace);
        }
    }

    /**
     * Handle Env Config.
     *
     * @return void
     */
    public function updateEnv($search, $replace)
    {
        $path = base_path('.env');

        file_put_contents(
            $path,
            str_replace($search, $replace, file_get_contents($path))
        );
    }

    /**
     * Handle Env Config.
     *
     * @return void
     */
    public function getValue($key, $value)
    {
        if (Str::contains($value, ' ')) {
            return $key . "='" . $value . "'";
        }

        return $key . '=' . $value;
    }
}
