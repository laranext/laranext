<?php

namespace Laranext\Requests\Concerns;

trait Validation
{
    /**
     * Get the update validation rules that apply to the request.
     *
     * @return array
     */
    public function updateRules()
    {
        return [];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [];
    }

    /**
     * Get custom attributes.
     *
     * @return array
     */
    public function customAttributes()
    {
        return [];
    }

    /**
     * Validate Fields.
     *
     * @return void
     */
    public function validate()
    {
        $this->attributes = $this->request->validate(
            $this->isPostRequest
                ? $this->rules()
                : array_merge($this->rules(), $this->updateRules())
            , $this->messages()
        );
    }
}
