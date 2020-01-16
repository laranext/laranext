<?php

namespace Laranext\Requests;

use JsonSerializable;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

abstract class FormRequest implements JsonSerializable
{
    use Concerns\Validation,
        Concerns\Helpers;

    /**
     * @var \Illuminate\Http\Request
     */
    protected $request;

    /**
     * Handle Post Request Method.
     *
     * @var boolean
     */
    protected $isPostRequest = false;

    /**
     * Base Model.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * Validated Attributes.
     *
     * @var array
     */
    protected $attributes = [];

    /**
     * Create a new instance.
     *
     * @param Request $request
     * @param \Illuminate\Database\Eloquent\Model $model
     */
    public function __construct(Request $request, $model = null)
    {
        $this->model = $model;
        $this->request = $request;
        $this->isPostRequest = $request->isMethod('post');

        $this->validate();

        $this->prepareAttributes();

        $this->process();

        $this->transaction();
    }

    /**
     * Request Process.
     *
     * @return void
     */
    public function process()
    {
        //
    }

    /**
     * Prepare Attributes
     *
     * @return void
     */
    public function prepareAttributes()
    {
        $data = [];

        foreach ($this->attributes as $key => $value) {
            $newKey = isset($this->customAttributes()[$key]) ? $this->customAttributes()[$key] : $key;
            $data[$newKey] = $value;
        }

        $this->attributes = $data;
    }

    /**
     * Database Transaction.
     *
     * @return void
     */
    public function transaction()
    {
        DB::transaction(function () {
            $this->model->forceFill($this->attributes);

            $this->model->save();
        });
    }

    /**
     * Get the success response.
     *
     * @return array
     */
    public function response()
    {
        $name = Str::before(class_basename(get_class($this)), 'Request');

        return [
            'message' => $this->isPostRequest
                            ? $name . ' Created Successfully!'
                            : $name . ' Updated Successfully!',
        ];
    }

    /**
     * Prepare the field for JSON serialization.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return $this->response();
    }
}
