<template>
    <div class="py-4 px-8">
        <label class="block text-gray-600 leading-tight mb-1" :for="field.attribute">
            <span>{{ field.name }}</span>
            <span class="text-red-500" v-if="field.required">*</span>
        </label>

        <slot></slot>

        <div class="text-xs leading-normal text-gray-600 italic mt-2 text-danger" v-if="form.errors[field.attribute]">
            {{ form.errors[field.attribute][0] }}
        </div>

        <div class="text-xs leading-normal text-gray-600 italic mt-2" v-html="field.info"></div>
    </div>
</template>

<script>
    import { useFormStore } from 'Store/form'

    export default {
        props: {
            name: String,
            field: Object
        },

        setup({name}) {
            const { state: form } = useFormStore(name)()

            return { form }
        }
    }
</script>
