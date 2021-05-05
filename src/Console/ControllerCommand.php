<?php

namespace Laranext\Console;

use Illuminate\Filesystem\Filesystem;

class ControllerCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:controller
                            {name : Controller name}
                            {package : Package name}
                            {--namespace=}
                            {--model=}
                            {--I|invokable}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package controller';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->alreadyExists($this->filePath())) {
            $this->error('Controller already exists!');

            return false;
        }

        $this->makeDir('src/Http/Controllers/Api');

        (new Filesystem)->copy(
            $this->option('invokable') ? __DIR__.'/stubs/controller.invokable.stub' : __DIR__.'/stubs/controller.stub',
            $this->filePath()
        );

        // controller replacements...
        $this->replace('{{ name }}', $this->argument('name'), $this->filePath());
        $this->replace('{{ lowercaseName }}', strtolower($this->argument('name')), $this->filePath());
        $this->replace('{{ namespace }}', $this->namespace(), $this->filePath());
        $this->replace('{{ plural }}', $this->plural(), $this->filePath());
        // $this->replace('{{ package }}', $this->argument('package'), $this->filePath());
        // $this->replace('{{ kebabPlural }}', $this->kebabPlural(), $this->filePath());
        $this->replace('{{ modelClass }}', $this->getModel(), $this->filePath());
        $this->replace('{{ modelVariable }}', strtolower($this->getModel()), $this->filePath());

        $this->info('Controller generated successfully.');
    }

    /**
     * Get Model Name.
     *
     * @return void
     */
    protected function getModel()
    {
        return $this->option('model') ?? $this->argument('name');
    }

    /**
     * Get the file destination path.
     *
     * @return string
     */
    protected function filePath($ext = 'php')
    {
        if ($this->option('invokable')) {
            return $this->packagePath('src\Http\Controllers\Api\\' . $this->argument('name') . '.' . $ext);
        }

        return $this->packagePath('src\Http\Controllers\Api\\' . $this->plural() . 'Controller.' . $ext);
    }
}
