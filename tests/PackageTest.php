<?php

namespace Laranext\Tests;

class PackageTest extends OrchestraTestCase
{
    public function test_it_can_load_package_from_base_route()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
