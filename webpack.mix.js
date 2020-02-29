const mix = require('laravel-mix')

require('laravel-mix-tailwind')
require('laravel-mix-purgecss')

mix.js('resources/js/app.js', 'js')
    .sass('resources/sass/style.sass', 'css')
    .tailwind('tailwind.config.js')
    .setPublicPath('public')
    .disableNotifications()
    .purgeCss({
        content: [
            'resources/**/*.html',
            'resources/**/*.js',
            'resources/**/*.php',
            'resources/**/*.vue',
        ]
    })
    .webpackConfig({
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'resources/js'),
                'Store': path.resolve(__dirname, 'resources/js/stores'),
                'Use': path.resolve(__dirname, 'resources/js/uses'),
                'Util': path.resolve(__dirname, 'resources/js/util'),
                'Theme': path.resolve(__dirname, 'resources/js/themes/default'),
                'Extend': path.resolve(__dirname, 'resources/js/extends')
            }
        },
        output: {
            chunkFilename: 'js/[name].[chunkhash].js',
            publicPath: '/vendor/laranext/'
        }
    })
    .override(config => {
        config.module.rules.find(rule =>
            rule.test.test('.svg')
        ).exclude = /\.svg$/

        config.module.rules.push({
            test: /\.svg$/,
            use: [{ loader: 'html-loader' }]
        })
    })

if (mix.inProduction()) {
    mix.version()
}
