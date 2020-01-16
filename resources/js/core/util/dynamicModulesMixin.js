import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    beforeCreate() {
        const namespace = this.$options.propsData.namespace

        // Register Modules
        for (const key in this.$options.modules) {
            this.$store.registerModule(namespace + key, this.$options.modules[key])
        }

        // Register States
        for (const key in this.$options.states) {
            const state = this.$options.states[key],
                  name = namespace + key

            this.$options.computed = {
                ...mapState(name, state),
                ...(this.$options.computed || {})
            }
        }

        // Register Actions
        for (const key in this.$options.actions) {
            const action = this.$options.actions[key],
                  name = namespace + key

            this.$options.methods = {
                ...mapActions(name, action),
                ...(this.$options.methods || {})
            }
        }

        // Register Getters
        for (const key in this.$options.getters) {
            const getter = this.$options.getters[key],
                  name = namespace + key

            this.$options.computed = {
                ...mapGetters(name, getter),
                ...(this.$options.computed || {})
            }
        }

        // Register Mutations
        for (const key in this.$options.mutations) {
            const mutation = this.$options.mutations[key],
                  name = namespace + key

            this.$options.methods = {
                ...mapMutations(name, mutation),
                ...(this.$options.methods || {})
            }
        }
    },

    beforeDestroy() {
        const namespace = this.$options.propsData.namespace,
              modules = this.$options.modules

        for (const key in modules) {
            const module = modules[key],
                  name = namespace + key

            this.$store.unregisterModule(name)
        }
    }
}
