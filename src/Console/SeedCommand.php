<?php

namespace Laranext\Console;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Artisan;

class SeedCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laranext:seed
                            {package? : Package name}
                            {--dummy : We will load DummySeeder}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Laranext database seed for packages';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $providers = array_merge(config('laranext.prefix_providers'), config('laranext.providers'));
        $package = $this->argument('package');
        $dummy = $this->option('dummy');

        if ($package) {
            $provider = $providers[$package];
            $namespace = Str::of($provider['provider'] ?? $provider)->beforeLast('\\');
            $type = $dummy ? 'DummySeeder' : 'DatabaseSeeder';
            $seeder = $namespace . '\\Seeders\\' . $type;

            if (class_exists($seeder)) {
                (new $seeder)->run();
                $this->info($seeder . ' - Seeding!');
            }

            return;
        }

        foreach ($providers as $key => $provider) {
            $namespace = Str::of($provider['provider'] ?? $provider)->beforeLast('\\');
            $type = $dummy ? 'DummySeeder' : 'DatabaseSeeder';
            $seeder = $namespace . '\\Seeders\\' . $type;

            if (class_exists($seeder)) {
                (new $seeder)->run();
                $this->info($seeder . ' - Seeding!');
            }
        }

        Artisan::call('cache:clear');
    }
}
