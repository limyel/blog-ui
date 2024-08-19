<template>
  <div class="grow col-start-2 col-span-6">
  <div class="p-6 mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
       v-for="(item, index) in projectList" :key="index">
    <div class="flex flex-row">
      <div class="grow">
        <a @click="router.push('/post/' + item.slug)" href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline hover:text-blue-600 hover:underline">
            {{ item.name }}</h5>
        </a>
      </div>
      <div class="flex items-center" v-if="item.top">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 0v6M9.5 9A2.5 2.5 0 0 1 12 6.5"/>
        </svg>
      </div>
    </div>
    <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">{{ item.summary }}</p>
    <div class="md:flex justify-between text-xs text-gray-400">
      <div class="md:flex sm:flex-row grow ">
        <div class="md:mr-5 flex md:items-center md:justify-center mb-2">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
               viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <p>最后提交时间：{{ showTimeDetail(item.createTime) }}</p>
        </div>
        <div class="mr-3 flex md:items-center md:justify-center mb-2">
          <div class="mr-2" v-for="(tag, index) in item.tags" :key="index">
            <a href="#" class="hover:text-blue-600">
              #{{ tag.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {showMessage} from "@/composables/util.js";
import router from "@/router/index.js";
import {showTimeDetail} from "@/composables/datetime-format.js";
import {getProjectList} from "@/api/frontend/project.js";

const projectList = ref([])

getProjectList({}).then(resp => {
  if (resp.code === 0) {
    projectList.value = resp.data
  } else {
    showMessage(resp.msg, 'error')
  }
})
</script>