<template>
    <action-button class="btn-primary"
                   :processing="processing == 'default'"
                   :disabled="processing"
                   @click.native="handleSubmit"
    >
        {{ buttonText() }} {{ title }}
    </action-button>
</template>

<script>
    import { mapActions } from 'vuex'
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'

    export default {
        mixins: [ DynamicModulesMixin ],

        props: {
            path: String,
            id: String,
            uri: String,
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
                console.log('buttonText')
                console.log(this)
                return this.id ? this.$tc('words.update') : this.$tc('words.create')
            },

            handleSubmit() {
                this.submit({
                    id: this.id,
                    type: 'default',
                    namespace: this.namespace
                })
                    .then(response => {
                        location.href = response.redirect || `/${this.uri}`

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
