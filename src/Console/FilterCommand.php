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
                            {--namespace=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package filter';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->alreadyExists($this->filePath())) {
            $this->error('Filter already exists!');

            return false;
        }

        $this->makeDir('src/Filters');

        (new Filesystem)->copy(
            __DIR__.'/stubs/filter.stub',
            $this->filePath()
        );

        // replacements...
        $this->replace('{{ name }}', $this->argument('name'), $this->filePath());
        $this->replace('{{ namespace }}', $this->namespace(), $this->filePath());

        $this->info('Filter generated successfully.');
    }

    /**
     * Get the file destination path.
     *
     * @return string
     */
    protected function filePath()
    {
        return $this->packagePath('src\Filters\\' . $this->argument('name') . 'Filters.php');
    }
}
