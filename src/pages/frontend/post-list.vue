<template>
  <div class="grow col-start-2 col-span-6">
    <div class="p-6 mb-10 bg-gray-100 border border-gray-200 rounded-lg shadow flex flex-col">
      <div>
        <button @click="clearActiveTag" type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
          清除
        </button>
      </div>

      <div class="flex">
        <div class="text-blue-800 text-sm me-2 px-3 py-1  rounded"
             :class="activeTagSlug.indexOf(tag.slug) === -1 ? 'bg-blue-100 font-medium dark:bg-blue-900 dark:text-blue-300' : 'bg-pink-100 font-bold dark:bg-pink-900 dark:text-pink-300'"
             v-for="(tag, index) in tags" :key="index">
          <a href="#"
             @click="filterTagSubmit(tag.slug)">
            {{ tag.name }}
            <span class="rounded-full px-2 bg-indigo-300">
              {{ tag.postNum }}
            </span>
          </a>
        </div>
      </div>

    </div>

    <div class="p-6 mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
         v-for="(item, index) in postList" :key="index">
      <div class="flex flex-row">
        <div class="grow">
          <a @click="router.push('/post/' + item.slug)" href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline hover:text-blue-600 hover:underline">
              {{ item.title }}</h5>
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
            <p>{{ showTimeDetail(item.createTime) }}</p>
          </div>
          <div class="mr-3 flex md:items-center md:justify-center mb-2">
            <div class="mr-2" v-for="(tag, index) in item.tags" :key="index">
              <a href="#" class="hover:text-blue-600">
                #{{ tag.name }}
              </a>
            </div>
          </div>
          <div class="flex md:items-center md:justify-center mb-2">
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
          <a @click="router.push('/post/' + item.slug)" class="text-sm text-blue-600 hover:underline" href="#">
            阅读全文
          </a>
        </div>
      </div>
    </div>


    <nav class="flex justify-center">
      <ul class="flex items-center -space-x-px h-8 text-sm">
        <!-- 上一页 -->
        <li>
          <a @click="getPostListSubmit(current - 1)" href="#"
             class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             :class="[current > 1 ? '' : 'cursor-not-allowed']"
          >

            <span class="sr-only">上一页</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
          </a>
        </li>
        <li v-for="(pageNo, index) in pages" :key="index">
          <a @click="getPostListSubmit(pageNo)" href="#"
             class="flex items-center justify-center px-4 h-10 leading-tight border  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             :class="[pageNo === current ? 'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700']"
          >
            {{ index + 1 }}
          </a>
        </li>
        <!-- 下一页 -->
        <li>
          <a @click="getPostListSubmit(current + 1)" href="#"
             class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             :class="[current < pages ? '' : 'cursor-not-allowed']"
          >
            <span class="sr-only">下一页</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {showMessage} from "@/composables/util.js";
import {getPostList} from "@/api/frontend/post.js";
import {getTagAll} from "@/api/frontend/tag.js";
import {useRouter} from "vue-router";
import {showTimeDetail} from "@/composables/datetime-format.js";

const router = useRouter()

const total = ref(0)
const pages = ref(1)
const current = ref(1)
const postList = ref([])
const pageNum = ref(1)
const activeTagSlug = ref([])

const getPostListSubmit = pageNo => {
  if (pageNo < 1 || pageNo > pages.value) {
    return
  }
  let params = {
    pageNum: pageNo.value,
    tags: activeTagSlug.value.join(',')
  }
  getPostList(params).then(resp => {
    if (resp.code === 0) {
      postList.value = resp.data.list
      total.value = resp.data.total
      pages.value = resp.data.pages
      current.value = resp.data.current
    } else {
      showMessage(resp.msg, 'error')
    }
  })
}
getPostListSubmit(pageNum.value)


const tags = ref([])
getTagAll().then(resp => {
  if (resp.code === 0) {
    tags.value = resp.data
  } else {
    showMessage(resp.msg, 'error')
  }
})


const filterTagSubmit = slug => {
  let slugIndex = activeTagSlug.value.indexOf(slug)
  slugIndex === -1 ? activeTagSlug.value.push(slug) : activeTagSlug.value.splice(slugIndex, 1)
  getPostListSubmit(pageNum)
}
const clearActiveTag = () => {
  activeTagSlug.value = []
  getPostListSubmit(pageNum)
}
</script>