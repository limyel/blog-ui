<template>
  <div class="fixed top-[64px] h-[44px] px-2 right-0 z-50 flex items-center bg-white transition-all duration-300 shadow"
       :style="{left: menuStore.menuWidth}">
    <!-- 标签导航栏 -->
    <el-tabs v-model="activeTab" type="card" @tab-remove="removeTab" @tab-change="tabChange" style="min-width: 10px;">
      <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"
                   :closable="item.path !== '/admin/index'">
      </el-tab-pane>
    </el-tabs>

    <!-- 下拉菜单 -->
    <span class="ml-auto flex items-center justify-center h-[32px] w-[32px]">
      <el-dropdown @command="handleCloseTab">
          <span class="el-dropdown-link">
              <el-icon class="el-icon--right">
                  <arrow-down/>
              </el-icon>
          </span>
          <template #dropdown>
              <el-dropdown-menu>
                  <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
                  <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
              </el-dropdown-menu>
          </template>
      </el-dropdown>
    </span>
  </div>

  <div class="h-[44px]"></div>
</template>

<script setup>
import {ref} from "vue";
import {useMenuStore} from "@/stores/menu.js";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {getTabList, setTabList} from "@/composables/cookie.js";

const route = useRoute()
const router = useRouter()

const menuStore = useMenuStore()

const activeTab = ref(route.path)
const tabList = ref([
  {
    title: '仪表盘',
    path: "/admin/index"
  }
])

// 添加新的标签
function addTab(tab) {
  let isTabNotExist = tabList.value.findIndex(item => item.path === tab.path) === -1
  if (isTabNotExist) {
    tabList.value.push(tab)
  }
  setTabList(tabList.value)
}

// 删除标签
const removeTab = (targetPath) => {
  let tabs = tabList.value
  let activePath = activeTab.value

  // 如果关闭的是当前标签，则跳转到当前标签的后一个或前一个标签
  if (activePath === targetPath) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetPath) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activePath = nextTab.path
        }
      }
    })
  }

  activeTab.value = activePath
  // 移除标签
  tabList.value = tabs.filter((tab) => tab.path !== targetPath)
  setTabList(tabList.value)
  tabChange(activeTab.value)
}

// 标签切换事件
const tabChange = path => {
  activeTab.value = path
  router.push(path)
}

// 初始化标签
function initTabList() {
  let tabs = getTabList()
  if (tabs) {
    tabList.value = tabs
  }
}
initTabList()

const handleCloseTab = command => {
  let indexPath = '/admin/index'
  if (command === 'closeOthers') {
    // 关闭其他标签
    tabList.value = tabList.value.filter(tab => tab.path === indexPath || tab.path === activeTab.value)
  } else if (command === 'closeAll') {
    // 关闭所有标签
    activeTab.value = indexPath
    tabList.value = tabList.value.filter(tab => tab.path === indexPath)
    tabChange(activeTab.value)
  }
  setTabList(tabList.value)
}

onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.path
  addTab({
    title: to.meta.title,
    path: to.path
  })
})

</script>

<style>
.el-tabs__item {
  font-size: 12px;
  border: 1px solid #d8dce5 !important;
  border-radius: 3px !important;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
  margin-left: 0.1rem !important;
  margin-right: 0.1rem !important;
}

.el-tabs__item.is-active {
  background-color: var(--el-color-primary) !important;
  color: #fff;
}

.el-tabs__item.is-active::before {
  content: "";
  background-color: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 4px;
}

.el-tabs {
  height: 32px;
}

.el-tabs__header {
  margin-bottom: 0;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 0;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
  height: 32px;
  line-height: 32px;
  border: 0;
  background: #fff;
}

.el-tabs--card > .el-tabs__header {
  border: 0;
}

.el-tabs__nav-prev, .el-tabs__nav-next {
  line-height: 35px;
}

.is-disabled {
  cursor: not-allowed;
  color: #d1d5db;
}
</style>