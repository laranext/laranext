<?php

namespace Laranext\Console;

use Illuminate\Console\Command;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install the laranext config.';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing Laranext Config...');

        $this->callSilent('vendor:publish', [
            '--tag' => 'laranext-config',
        ]);

        $this->info('Laranext scaffolding installed successfully.');
    }
}
