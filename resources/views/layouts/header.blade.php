<header class="header">
    <div class="flex items-center h-16 px-12">
        <div class="ml-auto">
            <dropdown v-cloak>
                <template #trigger>
                    <div class="flex items-center cursor-pointer">
                        <avatar class="mr-3" src="{{ auth()->user()->avatar }}" name="{{ auth()->user()->name }}"></avatar>
                        <p class="mr-3">{{ auth()->user()->name }}</p>
                        <inline-svg name="arrow-down" classes="text-gray-600"></inline-svg>
                    </div>
                </template>

                <div class="card w-64 py-2">
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Edit Profile</a>

                    <a href="{{ route('logout') }}"
                       class="block px-4 py-2 hover:bg-gray-100"
                       onclick="event.preventDefault();
                       document.getElementById('logout-form').submit();">
                        Logout
                    </a>
                </div>
            </dropdown>
        </div>
    </div>

    <form id="logout-form" action="/logout" method="POST" style="display: none;">
        @csrf
    </form>
</header>
