<?php

namespace Laranext\Console;

use Laranext\Laranext;
use Illuminate\Console\Command;

class VersionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:version';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Display laranext version';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->info(
            'Laranext ' . Laranext::version()
        );
    }
}
