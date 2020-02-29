<template>
    <a :href="link" class="sidebar-menu__item" :class="active">
        <slot></slot>
    </a>
</template>

<script>
    export default {
        props: {
            href: String,
            dynamic: Boolean
        },

        setup({href, dynamic}) {
            const prefix = App.adminPrefix,
                  key = (dynamic && App.key) ? App.key + '/' + href : href,
                  link = prefix ? `/${prefix}/${key}` : `/${key}`,
                  active = window.location.pathname.includes(href) ? 'active' : ''

            return { link, active }
        }
    }
</script>
