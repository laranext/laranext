<?php

namespace Laranext\Tests;

use Laranext\LaranextCoreServiceProvider;
use Mockery;
use Orchestra\Testbench\TestCase;

abstract class OrchestraTestCase extends TestCase
{
    public function tearDown(): void
    {
        Mockery::close();
    }

    protected function getPackageProviders($app)
    {
        return [LaranextCoreServiceProvider::class];
    }
}
