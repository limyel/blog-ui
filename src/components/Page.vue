<template>
  <nav class="pagination is-centered" role="navigation">
    <a class="pagination-previous" @click="handlePrevious" v-if="current > 1">Previous</a>
    <a class="pagination-next" @click="handleNext" v-if="current < pages">Next page</a>
    <ul class="pagination-list">
      <li v-for="(page, index) in pageList" :key="index">
        <span class="pagination-ellipsis" v-if="page === -1">&hellip;</span>
        <a :class="page === current ? 'pagination-link is-current' : 'pagination-link'" @click="handlePage(page)" v-else>{{page}}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const emit = defineEmits(['getPage'])
let props = defineProps({
  pages: {
    type: Number,
    required: true
  },
  current: {
    type: Number,
    required: true
  },
  pageList: {
    type: Number,
    required: true
  }
})

function handlePrevious() {
  if (props.current > 1) {
    emit('getPage', {pageNum: props.current - 1});
  }
}

function handleNext() {
  if (props.current < props.pages) {
    emit('getPage', {pageNum: props.current + 1});
  }
}

function handlePage(page) {
  if (page >= 1 && page <= props.pages) {
    emit('getPage', ({pageNum: page}));
  }
}

emit('getPage', {});
</script>