<template>
    <component :namespace="namespace"
               :is="field.field"
               :field="field"
    >
        <div class="pt-2">
            <label class="block items-center"
                   v-for="(item, index) in field.options"
                   :for="item.id"
                   :class="{
                      'inline-flex': !field.vertical,
                      'ml-6': (index > 0 && !field.vertical),
                      'mt-4': (index > 0 && field.vertical)
                   }"
            >
                <input class="form-checkbox h-5 w-5"
                       type="checkbox"
                       v-model="value"
                       :id="item.id"
                       :value="item.id"
                       :disabled="field.readonly"
                       :class="[field.classes]"
                >
                <span class="ml-2">{{ item.name }}</span>
            </label>
        </div>
    </component>
</template>

<script>
    import FieldMixin from '@/util/FieldMixin'

    export default {
        mixins: [ FieldMixin ]
    }
</script>
