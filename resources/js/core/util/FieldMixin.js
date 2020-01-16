import DynamicModulesMixin from '@/util/dynamicModulesMixin'
import InlineField from 'Theme/components/form/InlineField'
import GridField from 'Theme/components/form/GridField'

export default {
    mixins: [ DynamicModulesMixin ],

    components: {
        InlineField,
        GridField
    },

    props: {
        namespace: String,
        field: Object
    },

    states: {
        Form: ['errors']
    },

    computed: {
        value: {
            get() {
                return this.$store.state[this.namespace + 'Form'].fields[this.field.attribute]
            },
            set(value) {
                this.$store.dispatch(this.namespace + 'Form/updateField', {
                    field: this.field.attribute,
                    value
                })
            }
        }
    }
}
