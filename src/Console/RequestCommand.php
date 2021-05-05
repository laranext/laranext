<?php

namespace Laranext\Console;

use Illuminate\Filesystem\Filesystem;

class RequestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:request
                            {name : Request name}
                            {package : Package name}
                            {--namespace=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package request';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->alreadyExists($this->filePath())) {
            $this->error('Request already exists!');

            return false;
        }

        $this->makeDir('src/Requests');

        (new Filesystem)->copy(
            __DIR__.'/stubs/request.stub',
            $this->filePath()
        );

        // replacements...
        $this->replace('{{ name }}', $this->argument('name'), $this->filePath());
        $this->replace('{{ namespace }}', $this->namespace(), $this->filePath());

        $this->info('Request generated successfully.');
    }

    /**
     * Get the file destination path.
     *
     * @return string
     */
    protected function filePath()
    {
        return $this->packagePath('src\Requests\\' . $this->argument('name') . 'Request.php');
    }
}
