<aside class="sidebar">
    <a href="/admin" class="flex items-center justify-center h-16 px-4 bg-gray-900 text-xl text-white font-medium">
        {{ config('app.name') }}
    </a>

    <div class="sidebar-menu">
        <div class="px-3 pb-6">
            <a href="/admin" class="sidebar-menu__item {{ isActive(null, 2) }}">
                Dashboard
            </a>
        </div>

        <div class="py-6 border-t border-gray-700">
            <h4 class="px-6 text-sm text-gray-600 uppercase font-bold tracking-widest">
                Resources
            </h4>

            @can('demo:view')
                <div class="px-3 mt-2">
                    <route-link href="demo">Demo</route-link>
                </div>
            @endcan

            <div class="px-3 mt-2">
                <route-link href="demo">Demo</route-link>
            </div>
        </div>

        <div class="py-6 border-t border-gray-700">
            <h4 class="px-6 text-sm text-gray-600 uppercase font-bold tracking-widest">
                Others
            </h4>

            <div class="px-3 mt-2">
                <route-link href="users">Users</route-link>
            </div>
        </div>
    </div>
</aside>
