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
      <th>Title</th>
      <th>Tag</th>
      <th>CreateTime</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(post, index) in postList" :key="index">
        <th>{{post.id}}</th>
        <td>
          <a :href="'/post/' + post.slug">{{post.title}}</a>
        </td>
        <td>
          <a class="tag mr-1" :href="'/tag/' + tag.slug" v-for="(tag, index) in post.tagList" :key="index">
            {{tag.name}}
          </a>
        </td>
        <td>{{ showYearMonthDay(post.createTime) }}</td>
        <td>
          <a class="tag is-link mr-1" :href="'/new/post?id=' + post.id">Edit</a>
          <a class="tag is-danger mr-1" @click="handleDelete(post.id)">Delete</a>
        </td>
      </tr>
    </tbody>
  </table>

  <page @get-page="getPost" :current="current" :page-list="pageList" :pages="pages" />
</template>

<script setup>
import {ref} from "vue";
import {getPages} from "@/utils/page-util";
import Page from "@/components/Page.vue";
import {showYearMonthDay} from "@/utils/DateTimeFormat";
import {deletePost, getSysPostList} from "@/api/post";
import {useRouter} from "vue-router";

const router = useRouter();

const postList = ref([]);
const pages = ref(1);
const current = ref(1);
const pageList = ref([]);

function getPost(params) {
  getSysPostList(params).then(resp => {
    postList.value = resp.records;
    pages.value = resp.pages;
    current.value = resp.current;

    pageList.value = getPages(current.value, pages.value);
  })
}

function handleDelete(id) {
  deletePost(id).then(resp => {
    router.push('/manage/post');
  })
}
</script>

<style lang="scss" scoped>

</style>