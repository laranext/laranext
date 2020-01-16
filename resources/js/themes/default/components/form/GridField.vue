<template>
    <div class="flex-1 px-8 py-6">
        <label class="block" :for="field.attribute">
            <span class="form-label mb-1">
                {{ field.name }}
                <span class="text-red-500" v-if="field.required">*</span>
            </span>

            <slot></slot>

            <div class="text-xs leading-normal text-gray-600 italic mt-2 text-danger" v-if="errors[field.attribute]">
                {{ errors[field.attribute][0] }}
            </div>

            <div class="text-xs leading-normal text-gray-600 italic mt-2" v-html="field.info"></div>
        </label>
    </div>
</template>

<script>
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'

    export default {
        mixins: [ DynamicModulesMixin ],

        props: {
            namespace: String,
            field: {}
        },

        states: {
            Form: ['errors']
        }
    }
</script>
