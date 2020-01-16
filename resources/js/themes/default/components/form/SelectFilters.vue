<template>
    <div class="border border-gray-300 rounded overflow-hidden mt-1">
        <input type="search"
               autocomplete="autocomplete_off_hack_xfr4!k"
               class="focus:outline-none px-3 w-full h-10"
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

        <div class="bg-white w-full overflow-auto max-h-40 relative" v-if="isOpen" ref="list">
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
                    return this.field.options.filter(item => {
                        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                    })
                }

                return this.items
            }
        },

        created() {
            if (this.field.options) {
                this.current = this.field.options.findIndex(x => x.name === this.$store.state[this.namespace + 'Form'].fields[this.field.attribute].name)

                this.updateScrollPosition()

                return
            }

            if (this.$store.state[this.namespace + 'Form'].fields[this.field.attribute].name) {
                this.items.push(this.$store.state[this.namespace + 'Form'].fields[this.field.attribute])
            }
        },

        mounted() {
            this.$refs['search-filter-input'].focus()
        },

        methods: {
            select(item) {
                if (!item)
                    item = this.filteredItems[this.current]

                if (!item) return

                this.$store.dispatch(this.namespace + 'Form/updateField', {
                    field: this.field.attribute,
                    value: item
                })

                this.hide()
            }
        }
    }
</script>

<style scoped>
    div.active {
        background-color: #e2e8f0;
    }
</style>
