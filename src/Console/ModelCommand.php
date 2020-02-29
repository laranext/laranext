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
                            {--dev}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package model';

    /**
     * The base path.
     *
     * @var string
     */
    protected $basePath = 'src/';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->alreadyExists($this->getPath('php'))) {
            $this->error('Model already exists!');

            return false;
        }

        (new Filesystem)->copy(
            __DIR__.'/stubs/model.stub',
            $this->getPath()
        );

        $this->replace('{{ namespace }}', $this->namespace(), $this->getPath());
        $this->replace('{{ name }}', $this->argument('name'), $this->getPath());
        $this->replace('{{ kebab }}', $this->kebab(), $this->getPath());

        $this->renameStub($this->getPath());

        $this->info('Model generated successfully.');
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
