<?php

namespace Laranext\Filters;

use Illuminate\Http\Request;

class Filters
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * The Eloquent builder.
     *
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $builder;

    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = ['search', 'orderBy'];

    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filtersArray = [];

    /**
     * Create a new Filters instance.
     *
     * @param Request $request
     */
    public function __construct(Request $request = null)
    {
        $this->request = $request;
    }

    /**
     * Apply the filters.
     *
     * @param  \Illuminate\Database\Eloquent\Builder $builder
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply($builder)
    {
        $this->builder = $builder;

        foreach ($this->filters() as $filter) {
            $this->filters[] = $filter->attribute;
            $this->filtersArray[$filter->attribute] = $filter;
        }

        foreach ($this->getFilters() as $filter => $value) {
            if (method_exists($this, $filter)) {
                $this->$filter($value);
            }
            else {
                ($this->filtersArray[$filter])->apply($builder, $value);
            }
        }

        return $this->builder;
    }

    /**
     * Fetch all relevant filters from the request.
     *
     * @return array
     */
    public function getFilters()
    {
        return array_filter($this->request->only($this->filters));
    }

    /**
     * Filter the query by a given search column.
     *
     * @param  string $search
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function search($search)
    {
        $column = is_numeric($search) ? $this->request->searchNumericColumn : $this->request->searchColumn;

        return $this->builder->where($column, 'LIKE', $search . '%');
    }

    /**
     * Filter the query by a given column.
     *
     * @param  string $column
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function orderBy($column)
    {
        return $this->builder->orderBy($column, $this->request->orderByDirection);
    }
}
