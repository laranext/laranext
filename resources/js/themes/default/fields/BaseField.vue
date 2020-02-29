<template>
    <component :is="field.baseField" :field="field">
        <slot></slot>

        <div class="text-xs leading-normal text-gray-600 italic mt-2 text-danger" v-if="form.errors[field.attribute]">
            {{ form.errors[field.attribute][0] }}
        </div>

        <div class="text-xs leading-normal text-gray-600 italic mt-2" v-html="field.info"></div>
    </component>
</template>

<script>
    import { useFormStore } from 'Store/form'

    export default {
        props: {
            name: String,
            field: Object
        },

        setup({name, field}) {
            const { state: form } = useFormStore(name)()

            return { form }
        }
    }
</script>
