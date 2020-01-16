@extends('auth.master')

@section('content')
<div class="w-96 mt-6 px-6 py-4 bg-white rounded-lg shadow-md overflow-hidden">
    @if (session('resent'))
        <div class="mb-4 text-sm text-green-900">
            {{ __('A fresh verification link has been sent to your email address.') }}
        </div>
    @endif

    {{ __('Before proceeding, please check your email for a verification link.') }}

    <p class="mt-4">
        {{ __('If you did not receive the email') }}
    </p>

    <form class="inline" method="POST" action="{{ route('verification.resend') }}">
        @csrf
        <button class="mt-3 btn btn-primary transition-all" type="submit">
            {{ __('click here to request another') }}
        </button>
    </form>
</div>
@endsection
