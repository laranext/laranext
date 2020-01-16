<template>
    <img :src="src" v-if="src" key="avatar" class="rounded-full w-8 h-8">

    <div v-else key="avatar" class="flex items-center justify-center text-white uppercase rounded-full w-8 h-8" :class="[bg()]">
        {{ name.charAt(0) }}
    </div>
</template>

<script>
    export default {
        props: {
            src: String,
            name: String
        },

        methods: {
            bg() {
                const arr = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-teal-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500']

                return arr[Math.floor(Math.random() * arr.length)]
            }
        }
    }
</script>
