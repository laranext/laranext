<template>
  <div class="hidden md:flex flex-col w-64">
    <router-link to="/" custom v-slot="{ href, navigate }">
      <a :href="href" @click="navigate" class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
        <svg class="h-8" style="color: #6875f5;" fill="none" viewBox="0 0 34 32" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M15.258 26.865a4.043 4.043 0 01-1.133 2.917A4.006 4.006 0 0111.253 31a3.992 3.992 0 01-2.872-1.218 4.028 4.028 0 01-1.133-2.917c.009-.698.2-1.382.557-1.981.356-.6.863-1.094 1.47-1.433-.024.109.09-.055 0 0l1.86-1.652a8.495 8.495 0 002.304-5.793c0-2.926-1.711-5.901-4.17-7.457.094.055-.036-.094 0 0A3.952 3.952 0 017.8 7.116a3.975 3.975 0 01-.557-1.98 4.042 4.042 0 011.133-2.918A4.006 4.006 0 0111.247 1a3.99 3.99 0 012.872 1.218 4.025 4.025 0 011.133 2.917 8.521 8.521 0 002.347 5.832l.817.8c.326.285.668.551 1.024.798.621.33 1.142.826 1.504 1.431a3.902 3.902 0 01-1.504 5.442c.033-.067-.063.036 0 0a8.968 8.968 0 00-3.024 3.183 9.016 9.016 0 00-1.158 4.244zM19.741 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 001.798 1.482 3.99 3.99 0 004.366-.873 4.042 4.042 0 00.869-4.386 4.02 4.02 0 00-1.476-1.806 3.994 3.994 0 00-5.058.501 4.038 4.038 0 00-1.175 2.845zM23.748 22.84c-.792 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.806 4.042 4.042 0 00.869 4.387 3.99 3.99 0 004.366.873A4.01 4.01 0 0027.08 29.1a4.039 4.039 0 00-.5-5.082 4 4 0 00-2.832-1.18zM34 15.994c0-.796-.235-1.574-.675-2.236a4.01 4.01 0 00-1.798-1.483 3.99 3.99 0 00-4.367.873 4.042 4.042 0 00-.869 4.387 4.02 4.02 0 001.476 1.806 3.993 3.993 0 002.226.678 4.003 4.003 0 002.832-1.18A4.04 4.04 0 0034 15.993z"/>
          <path fill="currentColor" d="M5.007 11.969c-.793 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.807 4.042 4.042 0 00.869 4.386 4.001 4.001 0 004.366.873 4.011 4.011 0 001.798-1.483 4.038 4.038 0 00-.5-5.08 4.004 4.004 0 00-2.831-1.181z"/>
        </svg>
        <span class="text-white ml-2.5 font-semibold" style="font-size: 22px;">Pyramid</span>
      </a>
    </router-link>

    <nav class="flex-1 px-2 py-4 bg-gray-800">
      <template v-for="item in items" :key="item.label">
        <router-link
          custom
          :to="item.uri"
          v-slot="{ href, navigate, isActive }"
          v-if="!item.permission"
        >
          <a :href="href" @click="navigate" :class="[isActive ? activeClass : defaultClass]">
            <component is="home-icon" :class="isActive ? 'mr-3 h-6 w-6 text-gray-300' : 'mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300'"/>
            {{ $t(item.label) }}
          </a>
        </router-link>
      </template>
    </nav>
  </div>
</template>

<script>
  // import { router } from '@/router'
  import { sidebarNavItems } from 'Use/sidebar-nav'
  import { HomeIcon } from '@heroicons/vue/outline'

  export default {
    components: {
      HomeIcon,
    },

    setup() {
      // function go(navigate) {
      //   console.log('hit go')
      //   // console.log(uri)
      //   // navigate()
      //   // main.sidebar = false
      //   router.push(uri)
      // }

      // function add(uri) {
      //   console.log('hit add')
      //   router.push(uri)
      //   // main.sidebar = false
      // }

      return {
      //   go,
      //   add,
        items: sidebarNavItems,
        defaultClass: 'group flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700',
        activeClass: 'flex items-center px-2 py-2 text-sm font-medium text-white rounded-md bg-gray-900',
      }
    }
  }
</script>
