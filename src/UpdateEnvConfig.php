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
        foreach ($this->configs as $config => $value) {
            $path = base_path('.env');

            file_put_contents(
                $path,
                preg_replace(
                    '/^' . $config . '=.*/m',
                    $config . '=' . $this->prepareValue($this->request->$value),
                    file_get_contents($path)
                )
            );
        }
    }

    /**
     * Handle Env Config.
     *
     * @return void
     */
    public function prepareValue($value)
    {
        if (Str::contains($value, ' ')) {
            return "'${value}'";
        }

        return $value;
    }
}
