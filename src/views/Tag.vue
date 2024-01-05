<template>
  <div>
    <div class="title">
      <h1>
        Tag：{{tagName}}
      </h1>
    </div>

    <posts :post-list="postList"></posts>

    <page :page-list="pageList" :current="current" :pages="pages" @get-page="getPost"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getTagDetail } from "@/api/tag";
import { useRoute } from "vue-router";
import Posts from "@/components/Posts.vue";
import {getPostList} from "@/api/post";
import {getPages} from "@/utils/page-util";
import Page from "@/components/Page.vue";

const route = useRoute();
const tagName = ref('');
const tagId = ref(null);
const postList = ref([]);

getTagDetail(route.params['id']).then(resp => {
  tagName.value = resp.name;
  tagId.value = resp.id;
})

const pages = ref(1);
const current = ref(1);
const pageList = ref([]);
function getPost(params) {
  params.tagId = route.params['id'];
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
