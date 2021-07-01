<?php

namespace Laranext;

use Exception;
use Illuminate\Support\Str;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Facades\Http;

class Vite
{
    protected $isDevelopmentServerRunning;

    /**
     * Get the path to a versioned Vite file.
     *
     * @param  string  $manifestDirectory
     * @param  string  $port
     * @return \Illuminate\Support\HtmlString|string
     *
     * @throws \Exception
     */
    public function __invoke($manifestDirectory, $port)
    {
        if ($this->isDevelopmentServerRunning($port)) {
            return new HtmlString(
                sprintf(
                    '<script type="module" src="%s"></script>',
                    '//localhost:' . $port . '/@vite/client'
                ) .
                sprintf(
                    '<script type="module" src="%s"></script>',
                    '//localhost:' . $port . '/js/main.js'
                )
            );
        }

        static $manifests = [];

        $manifestPath = public_path($manifestDirectory.'/manifest.json');

        if (! isset($manifests[$manifestPath])) {
            if (! is_file($manifestPath)) {
                throw new Exception('The Vite manifest does not exist.');
            }

            $manifests[$manifestPath] = json_decode(file_get_contents($manifestPath), true);
        }

        $manifest = $manifests[$manifestPath];

        return new HtmlString(
            $this->getScripts(array_values($manifest)[0], $manifestDirectory) .
            $this->getVendors($manifest, $manifestDirectory) .
            $this->getStyles(array_values($manifest)[0], $manifestDirectory)
        );
    }

    protected function getScripts($manifest, $manifestDirectory)
    {
        return sprintf(
            '<script type="module" crossorigin src="%s"></script>',
            '/' . $manifestDirectory . '/' . $manifest['file']
        );
    }

    protected function getStyles($manifest, $manifestDirectory)
    {
        if (! isset($manifest['css'])) {
            return;
        }

        $styles = '';

        foreach ($manifest['css'] as $css) {
            $styles .= sprintf(
                '<link rel="stylesheet" type="text/css" href="%s">',
                '/' . $manifestDirectory . '/' . $css
            );
        }

        return $styles;
    }

    protected function getVendors($manifest, $manifestDirectory)
    {
        $manifestItems = array_values($manifest)[0];

        if (! isset($manifestItems['imports'])) {
            return;
        }

        $imports = '';

        foreach ($manifestItems['imports'] as $import) {
            $imports .= sprintf(
                '<link rel="modulepreload" href="%s">',
                '/' . $manifestDirectory . '/' . $manifest[$import]['file']
            );
        }

        return $imports;
    }

    /**
     * Checks if the development server is running.
     */
    public function isDevelopmentServerRunning($port): bool
    {
        try {
            if ($this->isDevelopmentServerRunning) {
                return $this->isDevelopmentServerRunning;
            }

            return $this->isDevelopmentServerRunning = Http::withOptions([
                'connect_timeout' => .1,
            ])->get( '//localhost:' . $port . '/@vite/client' )->successful();
        } catch (\Throwable $th) {
        }

        return false;
    }
}
