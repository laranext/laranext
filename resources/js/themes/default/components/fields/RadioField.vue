<template>
    <component :namespace="namespace"
               :is="field.field"
               :field="field"
    >
        <label class="block items-center"
               v-for="(item, index) in field.options"
               :for="item.id"
               :class="{
                  'inline-flex': !field.vertical,
                  'ml-6': (index > 0 && !field.vertical),
                  'mt-4': (index > 0 && field.vertical)
               }"
        >
            <input type="radio"
                   class="form-radio"
                   v-model="value"
                   :id="item.id"
                   :value="item.id"
                   :disabled="field.readonly">
            <span class="ml-2">{{ item.name }}</span>
        </label>
    </component>
</template>

<script>
    import FieldMixin from '@/util/FieldMixin'

    export default {
        mixins: [ FieldMixin ]
    }
</script>
