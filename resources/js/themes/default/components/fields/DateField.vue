<template>
    <component :namespace="namespace"
               :is="field.field"
               :field="field"
    >
        <flat-pickr :id="field.attribute"
                    :placeholder="field.placeholder ? field.placeholder : field.name"
                    class="w-full form-input"
                    :class="{ 'border-danger': errors[field.attribute] }"
                    v-model="value"
        ></flat-pickr>
    </component>
</template>

<script>
    import FieldMixin from '@/util/FieldMixin'
    import flatPickr from 'vue-flatpickr-component'
    import 'flatpickr/dist/flatpickr.css'

    export default {
        mixins: [ FieldMixin ],

        components: {
            flatPickr
        }
    }
</script>
