<template>
    <component :is="field.baseField" :name="name" :field="field">
        <input type="file"
               accept="image/*"
               class="w-full form-input"
               :id="field.attribute"
               :class="{ 'border-danger': form.errors[field.attribute] }"
               :readonly="field.readonly"
               @change="onChange"
               ref="file"
        >

        <div class="text-xs leading-normal text-gray-600 italic mt-2 text-danger" v-if="error">
            {{ error }}
        </div>

        <div class="text-xs leading-normal text-green-500 italic mt-2" v-if="done">Image uploaded successfully!</div>
    </component>
</template>

<script>
    import { useFormStore } from 'Store/form'
    import { ref } from '@vue/composition-api'

    export default {
        props: {
            name: String,
            field: Object
        },

        setup({name, field}, ctx) {
            let { state: form } = useFormStore(name)(),
                done = ref(false),
                error = ref(false)

            function onChange(e) {
                if (! e.target.files.length) return

                let file = e.target.files[0]

                let reader = new FileReader()

                reader.readAsDataURL(file)

                persist(file)
            }

            function persist(image) {
                let data = new FormData()

                data.append('image', image)

                axios.post(field.uri, data)
                    .then(response => {
                        if (!response) return

                        done.value = true
                        error.value = false

                        form.data[field.attribute] = response
                    })
                    .catch(errors => {
                        if (errors.response.data.errors) {
                            error.value = errors.response.data.errors[field.attribute][0]

                            ctx.refs.file.value = ''
                        }
                    })
            }

            return { form, error, done, onChange }
        }
    }
</script>
