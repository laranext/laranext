<?php

namespace Laranext\Tests;

use Laranext\Laranext;

class VersionTest extends OrchestraTestCase
{
    public function test_it_can_get_semantic_version_as_string()
    {
        $this->assertMatchesRegularExpression('/^[0-9]+.[0-9]+.[0-9]+$/', Laranext::version());
    }
}
