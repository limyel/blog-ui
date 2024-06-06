import Index from "@/pages/frontend/index.vue"
import Login from "@/pages/admin/login.vue"
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router