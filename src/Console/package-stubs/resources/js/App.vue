<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <!-- <mobile-sidebar/> -->
    <page-sidebar/>

    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <page-header/>

      <main class="flex-1 relative overflow-y-auto focus:outline-none" tabindex="0">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <router-view/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
  import PageSidebar from './views/layouts/sidebar.vue'
  import MobileSidebar from './views/layouts/mobile-sidebar.vue'
  import PageHeader from 'View/layouts/header.vue'
</script>
