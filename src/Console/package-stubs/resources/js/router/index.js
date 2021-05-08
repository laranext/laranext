import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

export const router = createRouter({
    history: createWebHistory(Config.prefix),
    routes,
})

router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    // startProgress()

    // this is confusing logic need to refactor.
    // console.log('beforeEach')
    // console.log(to)
    // console.log(app.config.globalProperties.can(to.meta.permission))

    // if (to.meta.permission && !app.config.globalProperties.can(to.meta.permission))
    //     return next({ name: 'NotFound' })

    next()
})
// export default router
