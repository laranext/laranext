<template>
    <button class="btn"
            :disabled="processing">
        <loading-svg v-if="processing" color="text-white" width="40px"></loading-svg>

        <slot v-else></slot>
    </button>
</template>

<script>
    export default {
        props: ['processing']
    }
</script>
