<template>
    <base-modal>
        <template #header>
            <div v-if="loading" key="form-modal-header"></div>

            <div class="px-6 py-4 text-lg" key="form-modal-header" v-else>
                {{ title }}
            </div>
        </template>

        <form-fields :namespace="namespace" :uri="`${uri}/create?type=modal`" :fields="fields"></form-fields>

<!--         <template #button>
            <div v-if="loading" key="form-modal-button"></div>

            <action-button class="btn-primary ml-4 transition-all"
                           :class="{ 'btn-danger': danger }"
                           :processing="processing"
                           @click.native="proceed"
                           key="form-modal-button"
                           v-else
            >
                {{ button }}
            </action-button>
        </template> -->
    </base-modal>
</template>

<script>
    import BaseModal from './BaseModal'
    import { mapState, mapActions } from 'vuex'
    import FormFields from 'Theme/components/form/FormFields'
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'

    export default {
        mixins: [ DynamicModulesMixin ],

        components: {
            BaseModal,
            FormFields
        },

        created() {
            this.setUri({
                id: this.id,
                uri: this.uri
            })
        },

        props: {
            namespace: String
        },

        states: {
            Form: ['loading', 'processing']
        },

        actions: {
            Form: ['setUri']
        },

        computed: {
            ...mapState('modal', [
                'title', 'uri', 'button', 'danger', 'fields'
            ])
        },

        methods: {
            ...mapActions('modal', [
                'proceed'
            ])
        }
    }
</script>
