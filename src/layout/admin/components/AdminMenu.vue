<template>
  <div class="bg-slate-800 h-screen text-white transition-all" :style="{ width: menuStore.menuWidth }">
    <div class="flex items-center justify-center h-[64px]">
      Blog
    </div>

    <el-menu :default-active="defaultActive" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false">
      <template v-for="(item, index) in menus" :key="index">
        <el-menu-item :index="item.path">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useMenuStore} from "@/stores/menu.js";

const menus = [
  {
    'name': '仪表盘',
    'icon': 'Monitor',
    'path': '/admin/index'
  },
  {
    'name': '文章管理',
    'icon': 'Document',
    'path': '/admin/post/list',
  },
  {
    'name': '标签管理',
    'icon': 'PriceTag',
    'path': '/admin/tag/list',
  },
  {
    'name': '博客设置',
    'icon': 'Setting',
    'path': '/admin/blog/setting',
  },
]

const route = useRoute()
const router = useRouter()

const menuStore = useMenuStore()

// todo
// const defaultActive = ref(route.path)
const defaultActive = computed(() => route.path)

// 菜单选择事件
const handleSelect = path => {
  router.push(path)
}

// 是否折叠菜单
const isCollapse = computed(() => !(menuStore.menuWidth === '250px'))
</script>

<style scoped>
.el-menu {
  background-color: rgb(30 41 59 / 1);
  border-right: 0;
}

.el-sub-menu__title {
  color: #fff;
}

.el-sub-menu__title:hover {
  background-color: #ffffff10;
}

.el-menu-item.is-active {
  background-color: var(--el-color-primary);
  color: #fff;
}

.el-menu-item.is-active:hover {
  background-color: var(--el-color-primary);
}

.el-menu-item {
  color: #fff;
}

.el-menu-item:hover {
  background-color: #ffffff10;
}

</style>