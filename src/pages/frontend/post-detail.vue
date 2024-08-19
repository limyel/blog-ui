<template>
  <div class="flex flex-row items-start grid grid-cols-12 gap-4 col-span-8">
    <div class="bg-white col-span-9 rounded-lg">
      <div class="mb-2">
        <h2 class="text-4xl text-slate-800 font-extrabold">{{ post.title }}</h2>
      </div>

      <div class="bg-gray-100 rounded-lg p-2 text-sm text-gray-500 mb-5">
        <div class="flex flex-row items-center leading-6">
          <svg data-tooltip-target="create-time-tooltip" data-tooltip-placement="bottom" class="mr-1" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
          </svg>
          <div id="create-time-tooltip" role="tooltip"
               class="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            创建时间
            <div class="tooltip-arrow" data-popper-arrow data-popper-placement></div>
          </div>
          {{ showTimeDetail(post.createTime) }}
        </div>
        <div class="flex flex-row items-center leading-6">
          <svg data-tooltip-target="update-time-tooltip" data-tooltip-placement="bottom" class="mr-1" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
               viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
          </svg>
          <div id="update-time-tooltip" role="tooltip"
               class="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            更新时间
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          {{ showTimeDetail(post.updateTime) }}
        </div>
        <div class="flex flex-row items-center leading-6">
          <svg class="mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
               viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"/>
          </svg>
          <div class="mr-2" v-for="(tag, index) in post.tags" :key="index">
            <a href="#" class="hover:text-blue-600">
              #{{ tag.name }}
            </a>
          </div>
        </div>
        <hr class="h-px my-2 bg-gray-300 border-0 dark:bg-gray-700">
        <p class="leading-6 italic">
          {{ post.summary }}
        </p>
      </div>

      <MdPreview :model-value="post.content" editorId="post-detail"></MdPreview>
    </div>

    <div class="col-span-3 sticky top-[5.5rem] text-sm/[30px] w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <MdCatalog @click="catalogOnClick" @active="catalogOnActive" editorId="post-detail"/>
    </div>
  </div>
  <ScrollToTopButton></ScrollToTopButton>

</template>

<script setup>
import {useRoute} from "vue-router";
import {getPostDetail} from "@/api/frontend/post.js";
import {ref} from "vue";
import {MdPreview, MdCatalog} from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import ScrollToTopButton from "@/layout/frontend/components/ScrollToTopButton.vue";
import {showTimeDetail} from "@/composables/datetime-format.js";

const route = useRoute()

const post = ref({})

getPostDetail(route.params.slug).then(resp => {
  if (resp.code === 0) {
    post.value = resp.data
    document.title = post.value.title
  }
})

let oldActive = ''
const catalogLink = 'md-editor-catalog-link'
const catalogLinkActive = 'md-editor-catalog-link md-editor-catalog-active'
const catalogOnClick = (e, t) => {
  window.location.hash = t.text
  let element = document.querySelector("span[title='" + t.text + "']").parentElement;
  element.className = catalogLinkActive
  let oldElement = document.querySelector("span[title='" + oldActive + "']").parentElement;
  oldElement.className = catalogLink
  oldActive = t.text
}

const catalogOnActive = heading => {
  oldActive = heading.text
}
</script>

<style>
.md-editor-preview-wrapper {
  padding: 0 !important;
}

.md-editor-catalog-active > span {
  color: #0369a1 !important;
  font-weight: bold;
}
.md-editor-catalog-link > span:hover {
  color: #0369a1 !important;
}
</style>