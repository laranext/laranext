<?php

namespace Laranext\Actions;

use Illuminate\Http\Request;

abstract class Actions
{
    /**
     * Perform Action.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function performAction(Request $request)
    {
        return $this->getAction($request)->handle($request->items, $request->fields);
    }

    /**
     * Get Specific Action.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function getAction(Request $request)
    {
        return $this->availableActions()->first(function ($action) use ($request) {
            return $action->uriKey() == $request->action;
        }) ?: abort(404);
    }

    /**
     * Get the possible actions for the request.
     *
     * @return \Illuminate\Support\Collection
     */
    protected function availableActions()
    {
        return collect($this->actions());
    }
}
