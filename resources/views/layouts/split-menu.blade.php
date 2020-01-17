@extends('theme::layouts.master')

@section('main')
    <div class="flex px-12 py-8">
        <aside class="mr-8">
            @yield('menu')
        </aside>

        <main class="flex-1">
            @yield('content')
        </main>
    </div>
@endsection
