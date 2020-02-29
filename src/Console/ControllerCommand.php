<?php

namespace Laranext\Console;

use Illuminate\Support\Str;
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
                            {--model=}
                            {--A|api}
                            {--dev}';

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
        if ($this->alreadyExists($this->filePath('php'))) {
            $this->error('Controller already exists!');

            return false;
        }

        $this->makeDir('src/Http/Controllers/Api');

        (new Filesystem)->copy(
            $this->option('api') ? __DIR__.'/stubs/controller.api.stub' : __DIR__.'/stubs/controller.stub',
            $this->filePath()
        );

        $this->controller();

        $this->renameStub($this->filePath());

        $this->info('Controller generated successfully.');
    }

    /**
     * Generate Controller.
     *
     * @return void
     */
    protected function controller()
    {
        $this->replace('{{ name }}', $this->argument('name'), $this->filePath());
        $this->replace('{{ namespace }}', $this->namespace(), $this->filePath());
        $this->replace('{{ plural }}', $this->plural(), $this->filePath());
        $this->replace('{{ package }}', $this->argument('package'), $this->filePath());
        $this->replace('{{ kebabPlural }}', $this->kebabPlural(), $this->filePath());
        $this->replace('{{ modelClass }}', $this->getModel(), $this->filePath());
        $this->replace('{{ modelVariable }}', strtolower($this->getModel()), $this->filePath());
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
    protected function filePath($ext = 'stub')
    {
        if ($this->option('api')) {
            return $this->packagePath('src\Http\Controllers\Api\\' . $this->plural() . 'Controller.' . $ext);
        }

        return $this->packagePath('src/Http/Controllers/' . $this->plural() . 'Controller.' . $ext);
    }
}
