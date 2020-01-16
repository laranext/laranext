<template>
    <component :namespace="namespace"
               :is="field.field"
               :field="field"
    >
        <input class="w-full form-input"
               v-model="value"
               :id="field.attribute"
               :type="field.type"
               :placeholder="field.placeholder ? field.placeholder : field.name"
               :class="{ 'border-danger': errors[field.attribute] }"
               :readonly="field.readonly"
        >
    </component>
</template>

<script>
    import FieldMixin from '@/util/FieldMixin'

    export default {
        mixins: [ FieldMixin ]
    }
</script>
