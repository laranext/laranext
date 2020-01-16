<template>
    <div class="flex items-center pr-3">
        <select class="form-select h-9 mr-2" v-model="value" @change="onChange" style="min-width: 172px;" required>
            <option value="" disabled="disabled" selected>Select Action</option>
            <option :value="index" v-for="(action, index) in actions" :key="action.key">{{ action.name }}</option>
        </select>

        <button @click="handleAction" class="btn btn-primary h-9" :disabled="value === ''">
            <inline-svg name="action" classes="text-white"></inline-svg>
        </button>
    </div>
</template>

<script>
    import store from '@/store'
    import Form from '@/store/modules/form'
    import storeModule from '@/util/storeModule'
    import { ref, computed } from '@vue/composition-api'

    export default {
        props: {
            name: String,
            namespace: {
                default: 'action'
            }
        },

        setup({name}) {
            const value = ref('')
            const { dispatch } = storeModule('action')
            const { state } = storeModule('index', name)

            let items = computed(() => state.selected)
            const actions = computed(() => state.actions)

            const fields = computed(() => store.state['actionForm'].fields)

            function handleAction() {
                const action = actions.value[value.value]

                dispatch('confirm', {
                    name,
                    request: {
                        method: 'POST',
                        url: `${state.config.uri}/action`,
                        data: {
                            action: action.key,
                            items: items.value,
                            fields: fields.value
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

            // Temporary to integrate old format
            const isNotFirst = ref(false)

            function onChange() {
                // console.log('onChange')
                if (isNotFirst.value)
                    store.unregisterModule('actionForm')

                store.registerModule('actionForm', Form)
                isNotFirst.value = true
            }

            return { actions, value, handleAction, onChange }
        }

        // computed: {
        //     value: {
        //         get() {
        //             return this.$store.state[this.namespace + 'Actions'].actionIndex
        //         },
        //         set(value) {
        //             this.$store.dispatch(this.namespace + 'Actions/setAction', value)
        //         }
        //     }
        // }
    }
</script>
