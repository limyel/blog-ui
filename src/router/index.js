import Index from '@/pages/frontend/index.vue'
import Archive from '@/pages/frontend/archive.vue'
import PostList from '@/pages/frontend/post-list.vue'
import PostDetail from '@/pages/frontend/post-detail.vue'
import About from '@/pages/frontend/about.vue'
import Login from '@/pages/admin/login.vue'
import AdminIndex from '@/pages/admin/index.vue'
import AdminPostList from '@/pages/admin/post-list.vue'
import AdminTagList from '@/pages/admin/tag-list.vue'
import AdminBlogSetting from '@/pages/admin/blog-setting.vue'
import ProjectList from "@/pages/frontend/project-list.vue";
import AdminProjectList from "@/pages/admin/project-list.vue";
import Admin from '@/layout/admin/admin.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: Index,
        children: [
            {
                path: '/',
                component: PostList,
                meta: {
                    title: '文章'
                }
            },
            {
                path: '/archive',
                component: Archive,
                meta: {
                    title: '归档'
                }
            },
            {
                path: '/post/:slug',
                component: PostDetail
            },
            {
                path: '/project',
                component: ProjectList
            },
            {
                path: '/about',
                component: About,
                meta: {
                    title: '关于'
                }
            },
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/admin',
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
                path: '/admin/project/list',
                component: AdminProjectList,
                meta: {
                    title: '项目管理'
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