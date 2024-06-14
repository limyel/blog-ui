import router from "@/router/index.js";
import {getToken} from "@/composables/cookie.js";
import {hidePageLoading, showMessage, showPageLoading} from "@/composables/util.js";

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
    // 展示页面加载
    showPageLoading()

    let token = getToken()
    if (!token && to.path.startsWith('/admin')) {
        showMessage('请先登录', 'warning')
        next({ path: '/login' })
    } else if (token && to.path === '/login') {
        showMessage('请勿重复登录', 'warning')
        next({ path: '/admin/index' })
    } else {
        next()
    }
})

// 全局路由后置守卫
router.afterEach((to, from) => {
    // 动态设置页面 Title
    let title = (to.meta.title ? to.meta.title : '') + ' - Blog'
    document.title = title

    // 隐藏页面加载
    hidePageLoading()
})