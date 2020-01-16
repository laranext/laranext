<template>
    <div class="dropdown relative">
        <div @click.prevent="isOpen = ! isOpen">
            <slot name="trigger"></slot>
        </div>

        <transition name="pop-out-quick">
            <div class="card absolute mt-2 rounded overflow-hidden shadow right-0 z-10" v-show="isOpen">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isOpen: false
            }
        },

        watch: {
            isOpen(isOpen) {
                if (isOpen) {
                    document.addEventListener(
                        'click',
                        this.closeIfClickedOutside
                    )
                }
            }
        },

        methods: {
            closeIfClickedOutside(event) {
                // console.log('yes hit here')
                if (! event.target.closest('.dropdown')) {
                    this.isOpen = false
                    // console.log('yes hit here in the if')
                    document.removeEventListener('click', this.closeIfClickedOutside)
                }
            }
        }
    }
</script>

<style scoped>
    .pop-out-quick-enter-active,
    .pop-out-quick-leave-active {
        transition: all 0.4s;
    }

    .pop-out-quick-enter,
    .pop-out-quick-leave-active {
        opacity: 0;
        transform: translateY(-7px);
    }
</style>
