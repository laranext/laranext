<template>
    <button class="bg-gray-200 flex items-center h-9 rounded px-3 ml-3" @click="handleAction">
        <inline-svg name="delete" classes="text-gray-600"></inline-svg>
    </button>
</template>

<script>
    import storeModule from '@/util/storeModule'
    import { computed } from '@vue/composition-api'

    export default {
        props: {
            name: String
        },

        setup({name}, ctx) {
            const { dispatch } = storeModule('action')
            const { state } = storeModule('index', name)

            let items = computed(() => state.selected)

            function handleAction() {
                dispatch('confirm', {
                    name,
                    request: {
                        method: 'delete',
                        url: `${state.config.uri}/null`,
                        data: {
                            items: items.value
                        }
                    },
                    modal: {
                        title: ctx.root.$tc('miscellaneous.delete_resource', 2),
                        message: ctx.root.$tc('miscellaneous.delete_confirmation_message', 2),
                        button: ctx.root.$tc('words.delete'),
                        danger: true
                    }
                })
            }

            return { handleAction }
        }
    }
</script>
