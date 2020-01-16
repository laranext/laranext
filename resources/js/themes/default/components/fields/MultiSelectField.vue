<template>
    <component :namespace="namespace"
               :is="field.field"
               :field="field"
    >
        <div class="border border-gray-300 rounded">
            <div class="flex flex-wrap p-1 pb-0" v-if="fields[field.attribute].length">
                <div class="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1"
                     v-for="({ name }, index) in fields[field.attribute]"
                >
                    {{ name }}
                    <inline-svg name="close" class="ml-2 cursor-pointer" width="16" height="16" @click.native="remove(index)"></inline-svg>
                </div>
            </div>

            <MultiSelectFilters :namespace="namespace" :field="field" @status="updateStatus"/>
        </div>

        <div class="text-xs leading-normal text-gray-600 italic mt-2" v-html="status"></div>

        <a :href="field.add.uri" class="text-xs leading-normal text-blue-400 mt-2" v-if="field['add']">
            {{ field.add.name }}
        </a>
    </component>
</template>

<script>
    import FieldMixin from '@/util/FieldMixin'
    import MultiSelectFilters from 'Theme/components/form/MultiSelectFilters'

    export default {
        mixins: [ FieldMixin ],

        components: {
            MultiSelectFilters
        },

        data() {
            return {
                status: ''
            }
        },

        states: {
            Form: ['fields', 'errors']
        },

        actions: {
            Form: ['spliceArrayField']
        },

        methods: {
            updateStatus(status) {
                this.status = status
            },

            remove(index) {
                this.spliceArrayField({
                    field: this.field.attribute,
                    index
                })
            }
        }
    }
</script>
