<template>
    <div class="flex border-gray-300 data-row">
        <div class="w-1/4 py-4">
            <h4 class="font-normal text-gray-600">{{ name }}</h4>
        </div>
        <div class="w-3/4 py-4">
            <a :href="href" class="no-underline font-bold dim text-primary" v-if="href" :target="{ _blank: blank }">
                <slot>{{ data ? data : '—' }}</slot>
            </a>

            <slot v-else>
                <p class="">
                    {{ data ? data : '—' }}
                </p>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            data: {
                default: ''
            },
            href: String,
            blank: Boolean
        }
    }
</script>

<style lang="sass">
    .data-row:not(:last-child)
        border-bottom-width: 1px
</style>
