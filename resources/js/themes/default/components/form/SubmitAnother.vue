<template>
    <action-button class="btn-primary"
                   :processing="processing == 'another'"
                   :disabled="processing"
                   @click.native="handleSubmit"
    >
        {{ buttonText() }}
    </action-button>
</template>

<script>
    import { mapActions } from 'vuex'
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'

    export default {
        mixins: [ DynamicModulesMixin ],

        props: {
            id: String,
            title: String,
            namespace: String
        },

        states: {
            Form: ['processing']
        },

        actions: {
            Form: ['submit', 'stopProcessing', 'resetFields', 'resetErrors']
        },

        methods: {
            ...mapActions('flash', [
                'success'
            ]),

            buttonText() {
                return this.id ? this.$tc('words.update') + ' & ' + this.$tc('miscellaneous.continue_editing') : this.$tc('words.create') + ' & ' + this.$tc('miscellaneous.add_another')
            },

            handleSubmit() {
                this.submit({
                    id: this.id,
                    type: 'another',
                    namespace: this.namespace
                })
                    .then(response => {
                        if (!this.id)
                            this.resetFields()
                        else
                            this.resetErrors()

                        this.success(response.message)

                        this.stopProcessing()
                    })
            }
        }
    }
</script>
