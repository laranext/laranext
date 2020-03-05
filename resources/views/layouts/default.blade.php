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
    <div class="px-12 py-8">
        @yield('content')
    </div>
@endsection
