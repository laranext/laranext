@extends('layouts.master')

@section('sidebar')
    @include('layouts.sidebar')
@endsection

@section('topbar-wrap')
    <div class="bg-white px-12">
        <div class="flex justify-between">
            @yield('topbar')
        </div>
    </div>
@endsection

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
