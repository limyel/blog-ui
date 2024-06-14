import Index from "@/pages/frontend/index.vue"
import Login from "@/pages/admin/login.vue"
import AdminIndex from "@/pages/admin/index.vue"
import AdminPostList from "@/pages/admin/post-list.vue"
import AdminTagList from "@/pages/admin/tag-list.vue"
import AdminBlogSetting from "@/pages/admin/blog-setting.vue"
import Admin from "@/layout/admin/admin.vue"
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"

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
        path: "/admin",
        component: Admin,
        children: [
            {
                path: '/admin/index',
                component: AdminIndex,
                meta: {
                    title: '仪表盘'
                }
            },
            {
                path: '/admin/post/list',
                component: AdminPostList,
                meta: {
                    title: '文章管理'
                }
            },
            {
                path: '/admin/tag/list',
                component: AdminTagList,
                meta: {
                    title: '标签管理'
                }
            },
            {
                path: '/admin/blog/setting',
                component: AdminBlogSetting,
                meta: {
                    title: '博客设置'
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router