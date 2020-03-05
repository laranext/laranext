<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,300,400,600,700,800,900&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ mix('css/style.css', 'vendor/laranext') }}" rel="stylesheet">

    @stack('styles')
</head>

<body class="font-sans bg-gray-200 text-gray-900 antialiased">
    @hasSection('sidebar')
        <div id="app" class="sidebar">
    @else
        <div id="app">
    @endif

        @yield('sidebar')

        @include('layouts.header')

        <main class="main pt-16">
            @yield('topbar-wrap')

            @hasSection('main')
                @yield('main')
            @else
                <div class="px-12 py-8">
                    @yield('content')
                </div>
            @endif
        </main>

        <vue-progress-bar></vue-progress-bar>

        <flash-message></flash-message>

        <v-modal></v-modal>
    </div>


    @php
        $permissions = Cache::rememberForever('user:' . auth()->id() . ':app-permissions', function () {
            $role = optional(auth()->user()->roles)->first();

            if (!$role) {
                return [];
            }

            return $role->permissions->pluck('name');
        });
    @endphp

    <!-- Scripts -->
    <script>
        (function() {
            let sidebar = document.querySelector('.sidebar-menu')

            if (sidebar)
                sidebar.style.maxHeight = (document.documentElement.clientHeight - 48) + 'px'
        })()

        window.App = {
            key: @json(Laranext::key()),
            adminPrefix: @json(config('laranext.admin_prefix')),
            permissions: @json($permissions),
            isSuperAdmin: @json(auth()->id() == 1),
            language: @json(config('app.locale')),
            messages: @json(__('messages'))
        }
    </script>

    <script src="{{ mix('js/app.js', 'vendor/laranext') }}"></script>

    @stack('scripts')
</body>
</html>
