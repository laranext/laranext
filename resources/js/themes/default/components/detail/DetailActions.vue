<template>
    <div class="flex items-center">
        <select class="form-select h-9 mr-2" v-model="value" style="min-width: 172px;" required>
            <option value="" disabled="disabled" selected>Select Action</option>
            <option :value="index" v-for="(action, index) in actions" :key="action.key">{{ action.name }}</option>
        </select>

        <button @click="handleAction" class="btn btn-primary h-9" :disabled="value === ''">
            <inline-svg name="action" classes="text-white"></inline-svg>
        </button>
    </div>
</template>

<script>
    import storeModule from '@/util/storeModule'
    import { ref, computed } from '@vue/composition-api'

    export default {
        props: {
            id: Number,
            uri: String
        },

        setup({id, uri}) {
            const value = ref('')
            let actions = ref([])
            const { dispatch } = storeModule('action')

            axios.get(uri + '/actions')
                .then(data => actions.value = data)

            function handleAction() {
                const action = actions.value[value.value]

                dispatch('confirm', {
                    name,
                    request: {
                        method: 'POST',
                        url: `${uri}/action`,
                        data: {
                            action: action.key,
                            items: [id]
                        }
                    },
                    modal: {
                        width: 'max-w-2xl',

                        title: action.name,
                        message: action.message,
                        button: action.button,
                        danger: action.danger,
                        component: 'form-modal',

                        namespace: 'action',
                        fields: action.fields

                        // uri: this.field.quickAdd.uri,
                        // button: this.field.quickAdd.button || 'Create'
                    }
                })
            }

            return {
                value,
                actions,
                handleAction
            }
        }
    }
</script>
