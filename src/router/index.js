import Index from "@/pages/frontend/index.vue"
import Login from "@/pages/admin/login.vue"
import AdminIndex from "@/pages/admin/index.vue"
import { createRouter } from "vue-router"
import { createWebHistory } from "vue-router"

const routes = [
    {
        path: "/",
        component: Index,
        meta: {
            title: "Blog 首页"
        }
    },
    {
        path: "/login",
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: "/admin/index",
        component: AdminIndex,
        meta: {
            title: 'Admin 后台首页'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router