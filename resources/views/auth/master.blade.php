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
    <link href="{{ mix('root.css', 'vendor/laranext') }}" rel="stylesheet">
    <link href="{{ mix('style.css', 'vendor/laranext') }}" rel="stylesheet">
</head>

<body>
    <div id="app" class="min-h-screen flex flex-col items-center pt-24 pb-12">
        <div class="text-2xl font-semibold">
            {{ config('app.name') }}
        </div>

        @yield('content')
    </div>
</body>
</html>
