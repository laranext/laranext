<?php

namespace Laranext\Console;

use Illuminate\Filesystem\Filesystem;

class ModelCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:model
                            {name : Model name}
                            {package : Package name}
                            {--namespace=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package model';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->alreadyExists($this->filePath())) {
            $this->error('Model already exists!');

            return false;
        }

        $this->makeDir('src/Models');

        (new Filesystem)->copy(
            __DIR__.'/stubs/model.stub',
            $this->filePath()
        );

        // replacements...
        $this->replace('{{ name }}', $this->argument('name'), $this->filePath());
        $this->replace('{{ namespace }}', $this->namespace(), $this->filePath());

        $this->info('Model generated successfully.');
    }

    /**
     * Get the file destination path.
     *
     * @return string
     */
    protected function filePath()
    {
        return $this->packagePath('src\Models\\' . $this->argument('name') . '.php');
    }
}
