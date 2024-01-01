import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "theme",
    path: "/",
    component: () => import("../components/Theme.vue"),
    redirect: "Home",
    children: [
      {
        name: "Home",
        path: "/",
        component: () => import("../views/Home.vue"),
      },
      {
        name: "Archive",
        path: "/archive",
        component: () => import("../views/Archive.vue"),
      },
      {
        name: "Post",
        path: "/post/:slug",
        component: () => import("@/views/Post.vue"),
      },
      {
        name: "Tag",
        path: "/tag/:slug",
        component: () => import("@/views/Tag.vue"),
      },
      {
        name: "About",
        path: "/about",
        component: () => import("../views/About.vue"),
      },
      {
        name: "search",
        path: "/search",
        component: () => import("../views/Search.vue"),
      },
      {
        name: "message",
        path: "/message",
        component: () => import("@/views/Message.vue"),
      },
      {
        name: 'Now',
        path: '/now',
        component: () => import('@/views/Now.vue')
      }
    ],
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    name: 'NewPost',
    path: '/new/post',
    component: () => import('@/views/NewPost.vue')
  },
  {
    name: 'NewTag',
    path: '/new/tag',
    component: () => import('@/views/NewTag.vue')
  },
  {
    name: 'NewNow',
    path: '/new/now',
    component: () => import('@/views/new/NewNow.vue')
  },
  {
    name: 'ManagePost',
    path: '/manage/post',
    component: () => import('@/views/ManagePost.vue')
  },
  {
    name: 'ManageTag',
    path: '/manage/tag',
    component: () => import('@/views/ManageTag.vue')
  },
  {
    name: 'ManageNow',
    path: '/manage/now',
    component: () => import('@/views/manage/ManageNow.vue')
  },
  {
    name: 'Settings',
    path: '/settings',
    component: () => import('@/views/new/NewSetting.vue')
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
