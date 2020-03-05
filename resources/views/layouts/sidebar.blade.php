<aside class="sidebar">
    <a href="/app" class="flex items-center h-16 px-4 bg-gray-900">
        <img class="h-8 w-8" src="/img/logos/workflow-mark-on-dark.svg" alt="">

        <span class="text-xl text-white font-semibold pl-4">
            {{ config('app.name') }}
        </span>
    </a>

    <div class="sidebar-menu">
        <div class="px-3 pb-6">
            <a href="/app" class="sidebar-menu__item {{ isActive(null, 2) }}">
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
