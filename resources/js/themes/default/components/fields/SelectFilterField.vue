<template>
    <component :namespace="namespace"
               :is="field.field"
               :field="field"
               classes="w-1/2 select-filters"
    >
        <div class="flex">
            <div class="flex-1">
                <input type="text"
                       class="w-full form-select"
                       autocomplete="autocomplete_off_hack_select_xfr4!k"
                       :id="field.attribute"
                       :placeholder="field.placeholder ? field.placeholder : 'Click to choose'"
                       :class="{ 'border-danger': errors[field.attribute + '.id'] }"
                       :disabled="show || field.readonly"
                       :value="value"
                       @focus="show = true"
                >

                <SelectFilters v-if="show"
                               :namespace="namespace"
                               :field="field"
                               @hide="show = false"
                               @status="updateStatus"
                />
            </div>

            <quick-add :namespace="field.quickAdd.namespace"
                       :form-namespace="namespace"
                       :field="field"
                       v-if="field.quickAdd"
            ></quick-add>
        </div>

        <div class="text-xs leading-normal text-gray-600 italic mt-2" v-html="status"></div>

        <a :href="field.add.uri" class="text-xs leading-normal text-blue-400 mt-2" v-if="field['add']">
            {{ field.add.name }}
        </a>

        <div class="text-xs leading-normal text-gray-600 italic mt-2 text-danger" v-if="errors[field.attribute + '.id']">
            {{ errors[field.attribute + '.id'][0] }}
        </div>
    </component>
</template>

<script>
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'
    import InlineField from 'Theme/components/form/InlineField'
    import GridField from 'Theme/components/form/GridField'
    import SelectFilters from 'Theme/components/form/SelectFilters'
    import QuickAdd from 'Theme/components/form/QuickAdd'

    export default {
        mixins: [ DynamicModulesMixin ],

        components: {
            InlineField,
            GridField,
            SelectFilters,
            QuickAdd
        },

        data() {
            return {
                show: false,
                status: ''
            }
        },

        props: {
            namespace: String,
            field: Object
        },

        states: {
            Form: ['errors']
        },

        computed: {
            value() {
                return this.$store.state[this.namespace + 'Form'].fields[this.field.attribute].name
            }
        },

        methods: {
            updateStatus(status) {
                this.status = status
            }
        }
    }
</script>
