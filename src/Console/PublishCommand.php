<?php

namespace Laranext\Console;

use Illuminate\Console\Command;

class PublishCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:publish
                            {--config : Publish config only}
                            {--views : Publish views only}
                            {--custom : Publish customization files only}
                            {--force : Overwrite any existing files}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish all of the Laranext resources';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->option('config')) {
            $this->call('vendor:publish', [
                '--tag' => 'laranext-config',
                '--force' => $this->option('force'),
            ]);

            return;
        }

        if ($this->option('views')) {
            $this->call('vendor:publish', [
                '--tag' => 'laranext-views',
                '--force' => $this->option('force'),
            ]);

            return;
        }

        if ($this->option('custom')) {
            $this->call('vendor:publish', [
                '--tag' => 'laranext-custom',
                '--force' => $this->option('force'),
            ]);

            return;
        }

        $this->call('vendor:publish', [
            '--tag' => 'laranext-config',
            '--force' => $this->option('force'),
        ]);

        $this->call('vendor:publish', [
            '--tag' => 'laranext-assets',
            '--force' => true,
        ]);

        $this->call('vendor:publish', [
            '--tag' => 'laranext-views',
            '--force' => $this->option('force'),
        ]);

        $this->call('vendor:publish', [
            '--tag' => 'laranext-auth-views',
            '--force' => $this->option('force'),
        ]);

        $this->call('vendor:publish', [
            '--tag' => 'laranext-lang',
            '--force' => $this->option('force'),
        ]);

        $this->call('vendor:publish', [
            '--tag' => 'laranext-seeds',
            '--force' => $this->option('force'),
        ]);

        $this->call('vendor:publish', [
            '--tag' => 'laranext-migrations',
            '--force' => $this->option('force'),
        ]);

        $this->call('vendor:publish', [
            '--tag' => 'laranext-custom',
            '--force' => $this->option('force'),
        ]);

        $this->call('view:clear');
    }
}
