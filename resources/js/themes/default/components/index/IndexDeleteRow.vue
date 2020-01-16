<template>
    <button title="Delete" class="appearance-none cursor-pointer text-gray-500 hover:text-primary mr-3" @click="handleAction">
        <inline-svg name="delete"></inline-svg>
    </button>
</template>

<script>
    import storeModule from '@/util/storeModule'

    export default {
        props: {
            name: String,
            item: Number
        },

        setup({name, item}, ctx) {
            const { dispatch } = storeModule('action')
            const { state } = storeModule('index', name)

            console.log(ctx)
            // console.log(ctx.root.t)
            console.log(ctx.root.$t('words.delete'))
            // console.log(ctx)
            // console.log(ctx.tc('words.delete'))
            function handleAction() {
                let items = []
                items.push(item)

                dispatch('confirm', {
                    name,
                    request: {
                        method: 'delete',
                        url: `${state.config.uri}/null`,
                        data: {
                            items
                        }
                    },
                    modal: {
                        title: ctx.root.$tc('miscellaneous.delete_resource'),
                        message: ctx.root.$tc('miscellaneous.delete_confirmation_message'),
                        button: ctx.root.$tc('words.delete'),
                        danger: true
                    }
                })
            }

            return { handleAction }
        }
    }
</script>
