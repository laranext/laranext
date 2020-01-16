<template>
    <p :class="{ 'text-center': data.align == 'center' }">
        {{ data.value }}
    </p>
</template>

<script>
    export default {
        props: {
            data: ''
        }
    }
</script>
