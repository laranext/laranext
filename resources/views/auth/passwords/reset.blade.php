@extends('auth.master')

@section('content')
<div class="w-96 mt-6 px-6 py-4 bg-white rounded-lg shadow-md overflow-hidden">
    <form method="POST" action="{{ route('password.update') }}">
        @csrf

        @if ($errors->any())
            <div class="mb-4">
                <!-- Validation Error List -->
                <strong class="text-red-900">Whoops! Something went wrong.</strong>

                <ul class="mt-3 list-disc list-inside text-red-800 text-sm">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <input type="hidden" name="token" value="{{ $token }}">

        <!-- Email -->
        <label class="block">
            <span class="text-sm text-gray-700">Email</span>
            <input class="form-input mt-1 block w-full" type="email" name="email" value="{{ $email ?? old('email') }}" required="" autofocus="">
        </label>

        <!-- Password -->
        <label class="block mt-4">
            <span class="text-sm text-gray-700">Password</span>
            <input class="form-input mt-1 block w-full" type="password" name="password" required="">
        </label>

        <!-- Confirm Password -->
        <label class="block mt-4">
            <span class="text-sm text-gray-700">Confirm Password</span>
            <input class="form-input mt-1 block w-full" type="password" name="password_confirmation" required="">
        </label>

        <!-- Register Button -->
        <div class="flex items-center justify-end mt-4">
            <button class="ml-4 btn btn-black transition-all" type="submit">
                Reset Password
            </button>
        </div>
    </form>
</div>
@endsection
