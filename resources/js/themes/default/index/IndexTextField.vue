<template>
    <p class="whitespace-no-wrap" :class="{ 'text-center': data.align == 'center' }">
        {{ data.value }}
    </p>
</template>

<script>
    export default {
        props: {
            data: Object
        }
    }
</script>
