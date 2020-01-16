@extends('auth.master')

@section('content')
<div class="w-96 mt-6 px-6 py-4 bg-white rounded-lg shadow-md overflow-hidden">
    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <div class="text-sm text-gray-600">
            If you can't remember your password, please provide your email address and we will send you a link
            which you may use to change your password.
        </div>

        @if ($errors->any())
            <div class="mt-4">
                <!-- Validation Error List -->
                <strong class="text-red-900">Whoops! Something went wrong.</strong>

                <ul class="mt-3 list-disc list-inside text-red-800 text-sm">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @if (session('status'))
            <div class="mt-4 text-sm text-green-900">
                {{ session('status') }}
            </div>
        @endif

        <!-- Email -->
        <label class="block mt-4">
            <span class="text-sm text-gray-700">Email</span>
            <input class="form-input mt-1 block w-full" type="email" name="email" value="{{ old('email') }}" required="" autofocus="">
        </label>

        <!-- Send Password Reset Link Button -->
        <div class="flex items-center justify-end mt-4">
            <button class="ml-4 btn btn-primary transition-all" type="submit">
                Send Reset Link
            </button>
        </div>
    </form>
</div>
@endsection
