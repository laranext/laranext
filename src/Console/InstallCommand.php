<?php

namespace Laranext\Console;

use Illuminate\Console\Command;
use Illuminate\Console\DetectsApplicationNamespace;

class InstallCommand extends Command
{
    use DetectsApplicationNamespace;

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
    protected $description = 'Install all of the Laranext resources';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing Laranext Assets / Resources...');

        $this->callSilent('laranext:publish', [
            '--force' => true,
        ]);

        $this->info('Laranext scaffolding installed successfully.');
    }
}
