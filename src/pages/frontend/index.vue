<template>
  <Header></Header>

  <main class="container max-w-screen-md mx-auto p-4">
    <div>
      <div class="p-6 mt-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
           v-for="(item, index) in postList" :key="index">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline hover:text-blue-600 hover:underline">
            {{ item.title }}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ item.summary }}</p>
        <div class="flex justify-between text-xs text-gray-400">
          <div class="flex grow">
            <div class="mr-5 flex items-center justify-center">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                   viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <p>{{ item.createTime }}</p>
            </div>
            <div class="mr-3 flex items-center justify-center">
              <div class="mr-2" v-for="(tag, index) in item.tags" :key="index">
                <a href="#" class="hover:text-blue-600">
                  #{{ tag.name }}
                </a>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                   viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2"
                      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
              {{ item.viewNum }}
            </div>
          </div>

          <div>
            <a class="text-sm text-blue-600 hover:underline" href="#">
              阅读全文
            </a>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {initCollapses} from 'flowbite'
import Header from "@/layout/frontend/components/Header.vue";
import {getPostList} from "@/api/admin/post.js";
import {showMessage} from "@/composables/util.js";

// 初始化 flowbit 相关组件
onMounted(() => {
  initCollapses();
})


const postList = ref([])
getPostList({}).then(resp => {
  if (resp.code === 'Success') {
    postList.value = resp.data.list
  } else {
    showMessage(resp.msg, 'error')
  }
})
</script>