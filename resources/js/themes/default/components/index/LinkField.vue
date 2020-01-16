<template>
    <a :href="data.url" :class="{ 'text-center': data.align == 'center' }" class="no-underline font-bold dim text-blue-500">
        {{ data.value }}
    </a>
</template>

<script>
    export default {
        props: {
            data: ''
        }
    }
</script>
