<template>
    <div class="bg-gray-100 rounded-b-lg">
        <nav class="flex items-center" style="height: 42px;">
            <span class="uppercase tracking-wider text-sm font-bold py-3 px-6 dim text-gray-600"
                  :disabled="!index.meta.prev"
                  :class="{ 'opacity-50': !index.meta.prev, 'text-blue-500 cursor-pointer': index.meta.prev }"
                  @click="paginate('prev', -1)"
            >
                {{ $t('pagination.previous') }}
            </span>

            <span class="uppercase tracking-wider text-sm font-bold ml-auto py-3 px-6 dim text-gray-600"
                  :disabled="!index.meta.next"
                  :class="{ 'opacity-50': !index.meta.next, 'text-blue-500 cursor-pointer': index.meta.next }"
                  @click="paginate('next', +1)"
            >
                {{ $t('pagination.next') }}
            </span>
        </nav>
    </div>
</template>

<script>
    import { useIndexStore } from 'Store/index'

    export default {
        props: {
            name: String
        },

        setup({name}) {
            const { state: index, paginate } = useIndexStore(name)()

            return { index, paginate }
        }
    }
</script>
