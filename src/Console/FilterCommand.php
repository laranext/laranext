<?php

namespace Laranext\Console;

use Illuminate\Filesystem\Filesystem;

class FilterCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:filter
                            {name : Filter name}
                            {package : Package name}
                            {--attribute=}
                            {--checkbox}
                            {--radio}
                            {--date}
                            {--dev}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package filter';

    /**
     * The base path.
     *
     * @var string
     */
    protected $basePath = 'src/Filters/';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->alreadyExists($this->getPath('php'))) {
            $this->error('Filter already exists!');

            return false;
        }

        $this->makeDir($this->basePath);

        (new Filesystem)->copy(
            __DIR__.'/stubs/filter.stub',
            $this->getPath()
        );

        $this->replace('{{ namespace }}', $this->namespace(), $this->getPath());
        $this->replace('{{ class }}', $this->argument('name'), $this->getPath());
        $this->replace('{{ type }}', $this->getComponentName(), $this->getPath());
        $this->replace('{{ attribute }}', $this->option('attribute'), $this->getPath());
        $this->replace('{{ default }}', $this->getDefaultValue(), $this->getPath());

        $this->renameStub($this->getPath());

        $this->info('Filter generated successfully.');
    }

    /**
     * Get the default value for filter type.
     *
     * @return string
     */
    protected function getComponentName()
    {
        if ($this->option('checkbox')) {
            return 'checkbox';
        }
        elseif ($this->option('radio')) {
            return 'radio';
        }
        elseif ($this->option('date')) {
            return 'date';
        }
        else {
            return 'select';
        }
    }

    /**
     * Get the default value for filter type.
     *
     * @return string
     */
    protected function getDefaultValue()
    {
        if ($this->option('checkbox') || $this->option('radio')) {
            return '[]';
        }

        return "''";
    }

    /**
     * Get the destination class path.
     *
     * @return string
     */
    protected function getPath($ext = 'stub')
    {
        return $this->packagePath($this->basePath) . $this->argument('name') . '.' . $ext;
    }
}
