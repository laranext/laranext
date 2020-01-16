@extends('auth.master')

@section('content')
<div class="w-96 mt-6 px-6 py-4 bg-white rounded-lg shadow-md overflow-hidden">
    <form method="POST" action="{{ route('register') }}">
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

        <!-- Name -->
        <label class="block">
            <span class="text-sm text-gray-700">Name</span>
            <input class="form-input mt-1 block w-full" type="text" name="name" value="{{ old('name') }}" required="" autofocus="">
        </label>

        <!-- Email -->
        <label class="block mt-4">
            <span class="text-sm text-gray-700">Email</span>
            <input class="form-input mt-1 block w-full" type="email" name="email" value="{{ old('email') }}" required="" autofocus="">
        </label>

        <!-- Password -->
        <label class="block mt-4">
            <span class="text-sm text-gray-700">Password</span>
            <input class="form-input mt-1 block w-full" type="password" name="password" required="">
        </label>

        <!-- Register Button -->
        <div class="flex items-center justify-end mt-4">
            <a class="text-sm text-gray-600 hover:text-gray-900" href="{{ route('login') }}">
                Already have an account ? Login
            </a>

            <button class="ml-4 btn btn-primary transition-all" type="submit">
                Register
            </button>
        </div>
    </form>
</div>
@endsection
