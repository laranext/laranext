<template>
    <div class="flex flex-1 items-center justify-center z-50 p-6"
         style="min-height: 150px;"
         v-if="loading"
         key="loading"
    >
        <loading-svg></loading-svg>
    </div>

    <div v-else key="loading">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            loading: Boolean
        }
    }
</script>
