<template>
    <component :is="field.baseField" :name="name" :field="field">
        <label class="block items-center"
               v-for="(item, index) in field.options"
               :class="{
                  'inline-flex': !field.vertical,
                  'ml-6': (index > 0 && !field.vertical),
                  'mt-4': (index > 0 && field.vertical)
               }"
        >
            <input type="radio"
                   class="form-radio"
                   v-model="form.data[field.attribute]"
                   :value="item.id"
                   :disabled="field.readonly"
            >
            <span class="ml-2">{{ item.name }}</span>
        </label>
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
