<template>
    <div class="flex border-b border-gray-200">
        <div class="w-1/5 py-6 px-8">
            <label class="inline-block text-gray-600 pt-2 leading-tight" :for="field.attribute">
                <span v-if="!noLabel">{{ field.name }}</span>

                <span class="text-red-500" v-if="field.required">*</span>
            </label>
        </div>
        <div class="py-6 px-8" :class="classes">
            <slot></slot>

            <div class="text-xs leading-normal text-gray-600 italic mt-2 text-danger" v-if="errors[field.attribute]">
                {{ errors[field.attribute][0] }}
            </div>

            <div class="text-xs leading-normal text-gray-600 italic mt-2" v-html="field.info"></div>
        </div>
    </div>
</template>

<script>
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'

    export default {
        mixins: [ DynamicModulesMixin ],

        props: {
            namespace: String,
            classes: {
                default: 'w-1/2'
            },
            field: {},
            noLabel: Boolean
        },

        states: {
            Form: ['errors']
        }
    }
</script>
