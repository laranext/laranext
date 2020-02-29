<template>
    <div class="flex justify-center items-center px-6 py-8">
        <div class="text-center">
            <inline-svg name="table" classes="text-gray-500" class="flex justify-center"></inline-svg>

            <p class="text-gray-700 mt-3"
               :class="{ 'mb-6': !index.config.noCreate && can(index.config.title.toLowerCase() + ':create') }"
            >
                {{ $tc('miscellaneous.no_record') }}
            </p>

            <div class="inline-flex">
                <a :href="`/${index.config.uri}/create`"
                   class="btn btn-white btn-sm"
                   v-if="!index.config.noCreate && can(index.config.title.toLowerCase() + ':create')"
                >
                    {{ $tc('words.create') }} {{ index.config.title }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import { useIndexStore } from 'Store/index'

    export default {
        props: {
            name: String
        },

        setup({name}) {
            const { state: index } = useIndexStore(name)()

            return { index }
        }
    }
</script>
