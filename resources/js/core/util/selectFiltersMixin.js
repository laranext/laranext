import Vue from 'vue'
import debounce from 'debounce'
import differenceBy from 'lodash/differenceBy'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            search: '',
            current: 0,
            items: [],
            processing: true,
            isOpen: false,
            status: ''
        }
    },

    props: {
        namespace: String,
        field: Object
    },

    methods: {
        show() {
            this.isOpen = true
            document.addEventListener('click', this.handleClickOutside)
        },

        hide() {
            this.isOpen = false
            this.current = 0
            this.search = ''
            this.$emit('hide')
            document.removeEventListener('click', this.handleClickOutside)
        },

        move(offset) {
            let newIndex = this.current + offset

            if (newIndex >= 0 && newIndex < this.filteredItems.length) {
                this.current = newIndex
                this.updateScrollPosition()
            }
        },

        updateScrollPosition() {
            Vue.nextTick(() => {
                if (this.$refs.current) {
                    if (
                        this.$refs.current[0].offsetTop >
                        this.$refs.list.scrollTop +
                            this.$refs.list.clientHeight -
                            this.$refs.current[0].clientHeight
                    ) {
                        this.$refs.list.scrollTop =
                            this.$refs.current[0].offsetTop +
                            this.$refs.current[0].clientHeight -
                            this.$refs.list.clientHeight
                    }

                    if (this.$refs.current[0].offsetTop < this.$refs.list.scrollTop) {
                        this.$refs.list.scrollTop = this.$refs.current[0].offsetTop
                    }
                }
            })
        },

        handleSearch: debounce(function (e) {
            if (this.field.uri) {
                this.processing = true
                axios.get(this.field.uri + '?search=' + this.search)
                    .then(data => {
                        this.items = data
                        this.processing = false

                        if (!data.length)
                            this.status = `No ${this.field.name} Found!`
                        else
                            this.status = ''

                        this.broadcast()
                    })
            }
        }, 250),

        broadcast() {
            this.$emit('status', this.status)
        },

        handleFocus() {
            this.handleSearch()
            this.show()
        },

        handleClickOutside(evt) {
            if (! event.target.closest('.select-filters')) {
                this.hide()
            }
        }
    }
}
