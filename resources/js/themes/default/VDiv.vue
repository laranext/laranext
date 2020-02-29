<template>
    <div :class="field.class">
        <component v-if="!field.sub"
                   :key="field.attribute"
                   :is="field.component"
                   :field="field"
                   :name="name"
        ></component>

        <v-div v-else v-for="(field, index) in field.sub" :key="index" :field="field" :name="name"></v-div>
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
