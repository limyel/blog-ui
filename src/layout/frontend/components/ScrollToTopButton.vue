<template>
  <div
      class="border cursor-pointer fixed bottom-2 right-2 md:bottom-10 md:right-10 inline p-3 bg-white hover:bg-gray-100 rounded"
      @click="scrollToTop">
    <svg class="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 10 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 13V1m0 0L1 5m4-4 4 4"></path>
    </svg>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";

const showScrollToTopBtn = ref(false)

// 添加滚动监听
onMounted(() => window.addEventListener('scroll', handleScroll))

onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

const handleScroll = () => {
  showScrollToTopBtn.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>