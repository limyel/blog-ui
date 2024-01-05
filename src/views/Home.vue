<template>
  <div class="home">
    <posts :post-list="postList"></posts>
  </div>

  <page @get-page="getPost" :current="current" :page-list="pageList" :pages="pages" />
</template>

<script setup>
import { ref } from "vue";
import { getPostList } from "@/api/post";
import Posts from "@/components/Posts.vue";
import {getPages} from "@/utils/page-util";
import Page from "@/components/Page.vue";

const postList = ref([]);
const pages = ref(1);
const current = ref(1);
const pageList = ref([]);

function getPost(params) {
  getPostList(params).then(resp => {
    postList.value = resp.list;
    pages.value = resp.pages;
    current.value = resp.current;

    pageList.value = getPages(current.value, pages.value);
  })
}

</script>

<style lang="scss" scoped>
</style>
