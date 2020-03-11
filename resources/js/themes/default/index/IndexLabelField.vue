<template>
    <div class="flex flex-wrap">
        <span class="text-xs rounded-full bg-green-200 text-green-900 px-2 py-1 mr-1 mb-1" v-for="label in data.labels">
            {{ label.name }}
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            data: Object
        }
    }
</script>
