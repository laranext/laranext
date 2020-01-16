<template>
    <base-modal>
        <div class="px-6 mb-4">
            {{ message }}
        </div>
    </base-modal>
</template>

<script>
    import useModalStore from '@/use/modalStore'
    import BaseModal from './BaseModal'

    export default {
        components: {
            BaseModal
        },

        setup() {
            return { ...useModalStore() }
        }
    }
</script>
