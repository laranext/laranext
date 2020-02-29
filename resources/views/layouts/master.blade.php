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

    @yield('styles')
</head>

<body>
    <div id="app">
        @include('layouts.sidebar')

        <div class="pl-64">
            @include('layouts.header')

            <div class="bg-white px-12">
                <div class="flex justify-between">
                    @yield('topbar')
                </div>
            </div>

            <main class="pb-12">
                @yield('main')
            </main>
        </div>

        <vue-progress-bar></vue-progress-bar>

        <flash-message></flash-message>

        <v-modal></v-modal>
    </div>


<?php
    $permissions = Cache::rememberForever('user:' . auth()->id() . ':app-permissions', function () {
        $role = optional(auth()->user()->roles)->first();

        if (!$role) {
            return [];
        }

        return $role->permissions->pluck('name');
    });
?>

    <!-- Scripts -->
    <script>
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

    @yield('scripts')

    <!-- Custom Script -->
    <script>
        (function() {
            let sidebar = document.querySelector('.sidebar-menu')

            sidebar.style.maxHeight = (document.documentElement.clientHeight - 48) + 'px'
        })()
    </script>
</body>
</html>
