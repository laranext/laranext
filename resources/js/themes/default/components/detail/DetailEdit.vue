<template>
    <a :href="'/' + uri + '/' + id + '/edit'" class="btn btn-primary ml-3">
        <inline-svg name="edit"></inline-svg>
    </a>
</template>

<script>
    export default {
        props: {
            id: Number,
            uri: String
        }
    }
</script>
