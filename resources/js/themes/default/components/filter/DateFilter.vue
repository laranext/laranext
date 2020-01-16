<template>
    <div>
        <h3 class="text-sm uppercase tracking-wide text-gray-600 bg-gray-200 p-3">{{ filter.name }}</h3>

        <div class="p-2">
            <flat-pickr :id="filter.attribute"
                        placeholder="Choose date"
                        class="w-full form-input"
                        v-model="value"
                        @on-close="onChange"
            ></flat-pickr>
        </div>
    </div>
</template>

<script>
    import useFilter from '@/use/filter'
    import 'flatpickr/dist/flatpickr.css'
    import flatPickr from 'vue-flatpickr-component'

    export default {
        components: {
            flatPickr
        },

        props: {
            name: String,
            filter: Object
        },

        setup(props) {
            return { ...useFilter(props) }
        }
    }
</script>
