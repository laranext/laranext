<template>
    <component :namespace="namespace"
               :is="field.field"
               :field="field"
    >
        <input type="file"
               accept="image/*"
               class="w-full form-input"
               :id="field.attribute"
               :placeholder="field.placeholder ? field.placeholder : field.name"
               :class="{ 'border-danger': errors[field.attribute] }"
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
    import FieldMixin from '@/util/FieldMixin'

    export default {
        mixins: [ FieldMixin ],

        data() {
            return {
                done: false,
                error: false
            }
        },

        methods: {
            onChange(e) {
                if (! e.target.files.length) return

                let file = e.target.files[0]

                let reader = new FileReader()

                reader.readAsDataURL(file)

                this.persist(file)
            },

            persist(image) {
                let data = new FormData()

                data.append('image', image)

                axios.post(this.field.uri, data)
                    .then(response => {
                        if (!response) return

                        this.done = true
                        this.error = false

                        this.$store.dispatch(this.namespace + 'Form/updateField', {
                            field: this.field.attribute,
                            value: response
                        })
                    })
                    .catch(error => {
                        if (error.response.data.errors) {
                            this.error = error.response.data.errors[this.field.attribute][0]

                            this.$refs.file.value = ''
                        }
                    })
            }
        }
    }
</script>
