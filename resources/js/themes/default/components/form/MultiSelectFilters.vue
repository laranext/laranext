<template>
    <div class="select-filters relative">
        <input type="search"
               autocomplete="autocomplete_off_hack_xfr4!k"
               class="focus:outline-none px-3 w-full h-10 rounded"
               placeholder="Search"
               v-model="search"
               @keydown.up.prevent="move(-1)"
               @keydown.down.prevent="move(1)"
               @keydown.enter.prevent="select()"
               @keydown.tab="hide"
               @keydown.esc="hide"
               @input="handleSearch"
               @focus="handleFocus"
               ref="search-filter-input"
        >

        <div class="bg-white w-full overflow-auto max-h-40" v-if="isOpen && filteredItems.length" ref="list">
            <div class="px-3 py-1 hover:bg-gray-300"
                 v-for="(item, index) in filteredItems"
                 :class="{ active: index === current }"
                 :ref="index === current ? 'current' : null"
                 @click="select(item)"
            >
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import debounce from 'debounce'
    import differenceBy from 'lodash/differenceBy'
    import selectFiltersMixin from '@/util/selectFiltersMixin'

    export default {
        mixins: [selectFiltersMixin],

        computed: {
            filteredItems() {
                if (this.field.options) {
                    let options = this.field.options.filter(item => {
                        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                    })

                    return differenceBy(options, this.$store.state[this.namespace + 'Form'].fields[this.field.attribute], 'name')
                }

                return differenceBy(this.items, this.$store.state[this.namespace + 'Form'].fields[this.field.attribute], 'name')
            }
        },

        methods: {
            select(item) {
                if (!item)
                    item = this.filteredItems[this.current]

                if (!item && this.field['accept-new-value']) {
                    item = {
                        id: null,
                        name: this.search
                    }

                    this.search = ''
                }
                else if (!item) {
                    return
                }

                let exists = this.$store.state[this.namespace + 'Form'].fields[this.field.attribute].find(obj => obj.name == item.name)

                if (!exists) {
                    this.$store.dispatch(this.namespace + 'Form/pushArrayField', {
                        field: this.field.attribute,
                        value: item
                    })
                }
            }
        }
    }
</script>

<style scoped>
    div.active {
        background-color: #e2e8f0;
    }
</style>
