<template>
  <div class="col-start-2 col-span-3">
    <div class="p-5 mb-4 border border-gray-100 rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700"
         v-for="(archive, index) in archiveList" :key="index">
      <time class="text-lg font-semibold text-gray-900 dark:text-white">{{ archive.year }}</time>
      <ol class="relative border-s border-gray-200 dark:border-gray-700">
        <li class="mb-3 ms-4" v-for="(post, index) in archive.posts" :key="index">
          <div
              class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{ post.createTime }}
          </time>
          <div>
            <a href="#">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white inline hover:text-blue-600 hover:underline">
                {{ post.title }}</h3>
            </a>
          </div>
          <div class="flex mb-2 text-xs text-gray-400">
            <div class="mr-2" v-for="(tag, index) in post.tags" :key="index">
              <a href="#" class="hover:text-blue-600">
                #{{ tag.name }}
              </a>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import {getPostArchive} from "@/api/frontend/post.js";
import {showMessage} from "@/composables/util.js";
import {ref} from "vue";

const archiveList = ref([])
getPostArchive().then(resp => {
  if (resp.code === 'Success') {
    archiveList.value = resp.data
  } else {
    showMessage(resp.msg, 'error')
  }
})
</script>