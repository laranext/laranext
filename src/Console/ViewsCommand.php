<?php

namespace Laranext\Console;

use Illuminate\Filesystem\Filesystem;

class ViewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:views
                            {name : Resource name}
                            {package : Package name}
                            {--dev}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new laranext package resource views';

    /**
     * The base path.
     *
     * @var string
     */
    protected $basePath = 'resources/views/';

    /**
     * The views that need to be exported.
     *
     * @var array
     */
    protected $views = [
        'index' => '/stubs/views/index.stub',
        'form' => '/stubs/views/form.stub',
        'detail' => '/stubs/views/detail.stub',
    ];

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->makeDir($this->basePath . $this->kebabPlural());

        $this->exportViews();

        $this->info('Resource views generated successfully.');
    }

    /**
     * Export the resource views.
     *
     * @return void
     */
    protected function exportViews()
    {
        foreach ($this->views as $key => $value) {
            if (file_exists($view = $this->getPath($key, 'blade.php'))) {
                $this->error($key . ' already exists!');
            }
            else {
                copy(
                    __DIR__.$value,
                    $view
                );

                $this->replace('{{ heading }}', $this->plural(), $view);
                $this->replace('{{ title }}', $this->argument('name'), $view);
                $this->replace('{{ model }}', $this->camel(), $view);
                $this->replace('{{ uri }}', $this->kebabPlural(), $view);
            }
        }
    }

    /**
     * Get the destination class path.
     *
     * @return string
     */
    protected function getPath($file, $ext = 'stub')
    {
        return $this->packagePath($this->basePath . $this->kebabPlural()) . '/' . $file . '.' . $ext;
    }
}
