<?php

namespace Laranext\Console;

use Illuminate\Filesystem\Filesystem;

class FieldsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:fields
                            {name : Field name}
                            {package : Package name}
                            {--dev}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package fields';

    /**
     * The base path.
     *
     * @var string
     */
    protected $basePath = 'src/Fields/';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->alreadyExists($this->getPath('php'))) {
            $this->error('Field already exists!');

            return false;
        }

        $this->makeDir($this->basePath);

        (new Filesystem)->copy(
            __DIR__.'/stubs/fields.stub',
            $this->getPath()
        );

        $this->replace('{{ namespace }}', $this->namespace(), $this->getPath());
        $this->replace('{{ class }}', $this->argument('name'), $this->getPath());
        $this->replace('{{ modelVariable }}', strtolower($this->argument('name')), $this->getPath());

        $this->renameStub($this->getPath());

        $this->info('Fields generated successfully.');
    }

    /**
     * Get the destination class path.
     *
     * @return string
     */
    protected function getPath($ext = 'stub')
    {
        return $this->packagePath($this->basePath) . $this->argument('name') . 'Fields.' . $ext;
    }
}
