<template>
    <div class="flex justify-center items-center px-6 py-8">
        <div class="text-center">
            <inline-svg name="table" classes="text-gray-500" class="flex justify-center"></inline-svg>

            <p class="text-gray-700 mt-3" :class="{ 'mb-6': !noCreate && can(title.toLowerCase() + ':create') }">
                {{ $tc('miscellaneous.no_record') }}
            </p>

            <div class="inline-flex">
                <a :href="`/${uri}/create`" class="btn btn-white btn-sm" v-if="!noCreate && can(title.toLowerCase() + ':create')">
                    {{ $tc('words.create') }} {{ title }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            uri: String,
            noCreate: Boolean
        }
    }
</script>
