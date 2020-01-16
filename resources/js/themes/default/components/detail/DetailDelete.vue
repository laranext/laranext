<template>
    <button title="Delete" class="btn btn-white ml-3" @click="handleAction">
        <inline-svg name="delete"></inline-svg>
    </button>
</template>

<script>
    import storeModule from '@/util/storeModule'

    export default {
        props: {
            id: Number,
            uri: String
        },

        setup({id, uri}, ctx) {
            const { dispatch } = storeModule('action')

            function handleAction() {
                dispatch('confirm', {
                    request: {
                        method: 'delete',
                        url: `${uri}/null`,
                        data: {
                            items: [id]
                        }
                    },
                    modal: {
                        title: ctx.root.$tc('miscellaneous.delete_resource'),
                        message: ctx.root.$tc('miscellaneous.delete_confirmation_message'),
                        button: ctx.root.$tc('words.delete'),
                        danger: true
                    }
                })
                    .then(response => {
                        location.href = `/${uri}`
                    })
            }

            return { handleAction }
        }
    }
</script>
