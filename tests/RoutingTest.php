<?php

namespace Laranext\Tests;

class RoutingTest extends OrchestraTestCase
{
    public function test_the_login_view_is_returned()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        // $response->assertSeeText('hello world');
    }
}
