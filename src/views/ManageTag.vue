<template>
  <div class="mb-5">
    <span class="title">Post</span>
    &nbsp;
    <span>50</span>
  </div>
  <table class="table is-striped is-narrow is-hoverable is-fullwidth ">
    <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Posts</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(tag, index) in tagList" :key="index">
      <th>{{tag.id}}</th>
      <td>
        <a :href="'/tag/' + tag.id">{{tag.name}}</a>
      </td>
      <td>{{tag.postNum}}</td>
      <td>
        <a class="tag is-link mr-1" :href="'/new/tag?id=' + tag.id">Edit</a>
        <a class="tag is-danger mr-1" @click="handleDelete(tag.id)">Delete</a>
      </td>
    </tr>
    </tbody>
  </table>

  <page @get-page="getTag" :current="current" :page-list="pageList" :pages="pages" />
</template>

<script setup>
import {getPages} from "@/utils/page-util";
import {ref} from "vue";
import Page from "@/components/Page.vue";
import {deleteTag, getSysTagList} from "@/api/tag";
import {useRouter} from "vue-router";

const router = useRouter();

const tagList = ref([]);
const pages = ref(1);
const current = ref(1);
const pageList = ref([]);

function getTag(params) {
  getSysTagList(params).then(resp => {
    tagList.value = resp.list;
    pages.value = resp.pages;
    current.value = resp.current;

    pageList.value = getPages(current.value, pages.value);
  })
}

function handleDelete(id) {
  deleteTag(id).then(resp => {
    router.push('/manage/tag');
  })
}
</script>

<style lang="scss" scoped>

</style>