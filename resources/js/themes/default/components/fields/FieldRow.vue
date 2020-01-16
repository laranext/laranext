<template>
    <div class="flex border-b">
        <div class="w-1/5 py-6 px-8">
            <label class="inline-block text-gray-600 pt-2 leading-tight" :for="field.attribute">
                {{ field.name }}
                <span class="text-red-500" v-if="field.required">*</span>
            </label>
        </div>
        <div class="py-6 px-8 w-1/2">
            <input :id="field.attribute"
                   :type="field.type"
                   :placeholder="field.placeholder ? field.placeholder : field.name"
                   class="w-full form-input"
                   :class="{ 'border-danger': errors[field.attribute] }"
                   v-model="value"
                   :readonly="field.readonly">

            <div class="text-xs leading-normal text-gray-600 italic mt-2 text-danger" v-if="errors[field.attribute]">
                {{ errors[field.attribute][0] }}
            </div>

            <div class="text-xs leading-normal text-gray-600 italic mt-2" v-html="field.info"></div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        props: ['field'],

        computed: {
            ...mapState('form', [
                'fields', 'errors'
            ]),

            value: {
                get() {
                    return this.$store.state.form.fields[this.field.attribute]
                },
                set(value) {
                    this.$store.dispatch('form/updateField', {
                        field: this.field.attribute,
                        value
                    })
                }
            }
        }
    }
</script>
