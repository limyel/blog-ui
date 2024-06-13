<template>
  <!-- 外层容器 -->
  <el-container>

    <!-- 左边侧边栏 -->
    <el-aside>
      <AdminMenu></AdminMenu>
    </el-aside>

    <!-- 右边主内容 -->
    <el-container>
      <!-- 顶栏容器 -->
      <el-header>
        <AdminHeader></AdminHeader>
      </el-header>

      <el-main>
        <!-- 标签导航栏 -->
        <AdminTagList></AdminTagList>

        <!-- 主内容 -->
        <router-view></router-view>
      </el-main>

      <!-- 底部容器 -->
      <el-footer>
        <AdminFooter></AdminFooter>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import AdminMenu from "@/layout/admin/components/AdminMenu.vue";
import AdminHeader from "@/layout/admin/components/AdminHeader.vue";
import AdminTagList from "@/layout/admin/components/AdminTagList.vue";
import AdminFooter from "@/layout/admin/components/AdminFooter.vue";
</script>

<style scoped>
.el-header {
  padding: 0!important;
}

:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}
</style>