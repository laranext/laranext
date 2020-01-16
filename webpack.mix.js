const mix = require('laravel-mix')

require('laravel-mix-tailwind')
require('laravel-mix-purgecss')

mix.js('resources/js/app.js', 'public')
    .postCss('resources/css/root.css', 'public')
    .sass('resources/sass/style.sass', 'public')
    .tailwind('tailwind.config.js')
    .setPublicPath('public')
    .disableNotifications()
    .purgeCss({
        folders: [
            'resources/views',
            'resources/js/themes/default',
            'resources/js/extends',
            // {{ packages }}
        ]
    })
    .webpackConfig({
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'resources/js/core'),
                'Theme': path.resolve(__dirname, 'resources/js/themes/default'),
                'Extend': path.resolve(__dirname, 'resources/js/extends')
            }
        },
        output: {
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
