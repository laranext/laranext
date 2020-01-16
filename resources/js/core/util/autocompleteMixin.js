import debounce from 'debounce'

export default {
    data() {
        return {
            search: '',
            current: -1,
            currentItem: '',
            items: [],
            processing: true,
            isOpen: false
        }
    },

    methods: {
        show() {
            this.isOpen = true
            document.addEventListener('click', this.handleClickOutside)
        },

        hide() {
            this.isOpen = false
            document.removeEventListener('click', this.handleClickOutside)
        },

        move(offset) {
            let newIndex = this.current + offset

            if (newIndex >= 0 && newIndex < this.filteredItems.length) {
                this.current = newIndex
                this.updateScrollPosition()
            }
        },

        down() {
            let current = this.current + 1
            if (current < this.filterdItems.length) {
                this.current = current
                this.currentItem = this.filterdItems[this.current]
            }
        },

        up() {
            if (this.current > 0) {
                this.current = this.current - 1
                this.currentItem = this.filterdItems[this.current]
            }
        },

        handleSearch: debounce(function (e) {
            this.processing = true
            axios.get(this.field['options-uri'] + '?search=' + this.search)
                .then(data => {
                    this.items = data
                    this.processing = false
                })
        }, 250),

        handleFocus() {
            if (!this.isOpen && !this.items.length)
                this.handleSearch()

            this.show()
        },

        handleClickOutside(evt) {
            if (! event.target.closest('.field-container')) {
                this.hide()
                this.current = -1
                this.search = ''
            }
        }
    }
}
