<template>
    <component :namespace="namespace"
               :is="field.field"
               :field="field"
               classes="w-4/5"
    >
        <textarea :id="field.attribute"
                  rows="5"
                  class="w-full form-control form-input form-input-bordered py-3 h-auto"
                  :class="{ 'border-danger': errors[field.attribute] }"
                  :placeholder="field.placeholder ? field.placeholder : field.name"
                  v-model="value"
        ></textarea>
    </component>
</template>

<script>
    import FieldMixin from '@/util/FieldMixin'

    export default {
        mixins: [ FieldMixin ]
    }
</script>
