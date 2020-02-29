<?php

namespace Laranext\Console;

use Illuminate\Filesystem\Filesystem;

class ActionsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:actions
                            {name : Action name}
                            {package : Package name}
                            {--dev}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package actions';

    /**
     * The base path.
     *
     * @var string
     */
    protected $basePath = 'src/Actions/';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->alreadyExists($this->getPath('php'))) {
            $this->error('Action already exists!');

            return false;
        }

        $this->makeDir($this->basePath);

        (new Filesystem)->copy(
            __DIR__.'/stubs/actions.stub',
            $this->getPath()
        );

        $this->replace('{{ namespace }}', $this->namespace(), $this->getPath());
        $this->replace('{{ class }}', $this->argument('name'), $this->getPath());

        $this->renameStub($this->getPath());

        $this->info('Actions generated successfully.');
    }

    /**
     * Get the destination class path.
     *
     * @return string
     */
    protected function getPath($ext = 'stub')
    {
        return $this->packagePath($this->basePath) . $this->argument('name') . 'Actions.' . $ext;
    }
}
