import router from "@/router/index.js";
import {getToken} from "@/composables/auth.js";
import {showMessage} from "@/composables/util.js";

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
    let token = getToken()
    if (!token && to.path.startsWith('/admin')) {
        showMessage('请先登录', 'warning')
        next({ path: '/login' })
    } else {
        next()
    }
})

// 全局路由后置守卫
router.afterEach((to, from) => {
    // 动态设置页面 Title
    let title = (to.meta.title ? to.meta.title : '') + ' - Blog'
    document.title = title
})