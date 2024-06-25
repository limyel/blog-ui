<template>
  <div class="flex flex-col h-screen">

    <Header></Header>

    <main class="container max-w-5xl grid grid-cols-8 gap-4 mx-auto p-4 grow">
      <router-view></router-view>
    </main>

    <Footer></Footer>
  </div>
</template>

<script setup>
import {onMounted} from 'vue'
import {initCollapses} from 'flowbite'
import Header from "@/layout/frontend/components/Header.vue";
import Footer from "@/layout/frontend/components/Footer.vue";

// 初始化 flowbit 相关组件
onMounted(() => {
  initCollapses();
})

</script>