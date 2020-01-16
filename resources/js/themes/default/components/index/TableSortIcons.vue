<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" class="ml-2 text-gray-400 flex-shrink-0">
        <path class="fill-current"
              :class="{ 'text-gray-600': params.orderByDirection == 'asc' && params.orderBy == attribute }"
              d="M1.70710678 4.70710678c-.39052429.39052429-1.02368927.39052429-1.41421356 0-.3905243-.39052429-.3905243-1.02368927 0-1.41421356l3-3c.39052429-.3905243 1.02368927-.3905243 1.41421356 0l3 3c.39052429.39052429.39052429 1.02368927 0 1.41421356-.39052429.39052429-1.02368927.39052429-1.41421356 0L4 2.41421356 1.70710678 4.70710678z"
        ></path>

        <path class="fill-current"
              :class="{ 'text-gray-600': params.orderByDirection == 'desc' && params.orderBy == attribute }"
              d="M6.29289322 9.29289322c.39052429-.39052429 1.02368927-.39052429 1.41421356 0 .39052429.39052429.39052429 1.02368928 0 1.41421358l-3 3c-.39052429.3905243-1.02368927.3905243-1.41421356 0l-3-3c-.3905243-.3905243-.3905243-1.02368929 0-1.41421358.3905243-.39052429 1.02368927-.39052429 1.41421356 0L4 11.5857864l2.29289322-2.29289318z"
        ></path>
    </svg>
</template>

<script>
    import useIndexStore from '@/use/indexStore'

    export default {
        props: {
            name: String,
            attribute: String
        },

        setup({name}) {
            return { ...useIndexStore(name) }
        }
    }
</script>
