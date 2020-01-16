<?php

namespace Laranext;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use Categorizable;

    /**
     * The Category Parent.
     *
     * @var string
     */
    protected static $parent;
}
