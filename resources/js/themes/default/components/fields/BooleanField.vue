<template>
    <component :namespace="namespace"
               :is="field.field"
               :field="field"
               no-label
    >
        <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox h-5 w-5" v-model="value">
            <span class="ml-2">{{ field.name }}</span>
        </label>
    </component>
</template>

<script>
    import FieldMixin from '@/util/FieldMixin'

    export default {
        mixins: [ FieldMixin ]
    }
</script>
