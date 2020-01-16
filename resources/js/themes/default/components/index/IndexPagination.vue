<template>
    <div class="bg-gray-100 rounded-b">
        <nav class="flex" style="height: 42px;">
            <button :disabled="!data.meta.prev"
                    :class="{ 'opacity-50': !data.meta.prev, 'text-blue-500': data.meta.prev }"
                    class="btn btn-link font-bold py-3 px-6 dim text-gray-600"
                    @click="dispatch('paginate', -1)">
                {{ $t('pagination.previous') }}
            </button>
            <button :disabled="!data.meta.next"
                    :class="{ 'opacity-50': !data.meta.next, 'text-blue-500': data.meta.next }"
                    class="ml-auto btn btn-link font-bold py-3 px-6 dim text-gray-600"
                    @click="dispatch('paginate', +1)">
                {{ $t('pagination.next') }}
            </button>
        </nav>
    </div>
</template>

<script>
    import useIndexStore from '@/use/indexStore'

    export default {
        props: {
            name: String
        },

        setup({name}) {
            return { ...useIndexStore(name) }
        }
    }
</script>
