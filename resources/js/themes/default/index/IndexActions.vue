<template>
    <div class="flex items-center pr-3">
        <select class="form-select h-9 mr-2" v-model="value" @change="onChange" style="min-width: 172px;" required>
            <option value="" disabled="disabled" selected>Select Action</option>
            <option :value="index" v-for="(action, index) in index.actions" :key="action.key">{{ action.name }}</option>
        </select>

        <button @click="handleAction" class="btn btn-primary h-9" :disabled="value === ''">
            <inline-svg name="action" classes="text-white"></inline-svg>
        </button>
    </div>
</template>

<script>
    import { useIndexStore } from 'Store/index'
    import { useActionStore } from 'Store/action'
    import { useConfirmStore } from 'Store/confirm'
    import { ref } from '@vue/composition-api'

    export default {
        props: {
            name: String
        },

        setup({name}, ctx) {
            const { confirm } = useConfirmStore()
            const { performAction } = useActionStore()
            const { state: index } = useIndexStore(name)()

            let value = ref('')

            function onChange () {
                console.log('onChange')
            }

            function handleAction () {
                const action = index.actions[value.value]

                confirm(
                    performAction,
                    index.selected,
                    {
                        width: action.fields.length ? 'max-w-2xl' : 'max-w-xl',
                        component: action.fields.length ? 'form-modal' : 'confirm-modal',
                        title: action.name,
                        message: action.message,
                        button: action.button,
                        danger: action.danger,
                        key: action.key,
                        name: name,
                        fields: action.fields,
                        uri: index.config.route
                    }
                )
            }

            return { index, value, onChange, handleAction }
        }
    }
</script>
