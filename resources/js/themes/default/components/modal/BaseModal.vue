<template>
    <div>
        <slot name="header">
            <div class="px-6 py-4 text-lg" v-if="title">
                {{ title }}
            </div>
        </slot>

        <slot></slot>

        <footer class="px-6 py-4 bg-gray-100 flex justify-end rounded-b-lg">
            <button class="btn btn-white transition-all" @click="dispatch('hide')">
                {{ $tc('words.cancel') }}
            </button>

            <slot name="button">
                <action-button class="btn-primary ml-4 transition-all"
                               :class="{ 'btn-danger': danger }"
                               :processing="processing"
                               @click.native="dispatch('proceed')"
                >
                    {{ button }}
                </action-button>
            </slot>
        </footer>
    </div>
</template>

<script>
    import useModalStore from '@/use/modalStore'

    export default {
        setup() {
            return { ...useModalStore() }
        }

        // computed: {
        //     ...mapState('modal', [
        //         'title', 'button', 'danger', 'processing'
        //     ])
        // },

        // methods: {
        //     ...mapActions('modal', [
        //         'hide', 'proceed'
        //     ])
        // }
    }
</script>
