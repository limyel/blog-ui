<template>
  <div class="mb-5">
    <span class="title">Now</span>
    &nbsp;
    <span>50</span>
  </div>
  <table class="table is-striped is-narrow is-hoverable is-fullwidth ">
    <thead>
    <tr>
      <th>ID</th>
      <th>CreateTime</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(now, index) in nowList" :key="index">
      <th>{{now.id}}</th>
      <td>{{showYearMonthDay(now.createTime)}}</td>
      <td>
        <a class="tag is-link mr-1" :href="'/new/now?id=' + now.id">Edit</a>
        <a class="tag is-danger mr-1" @click="handleDelete(now.id)">Delete</a>
      </td>
    </tr>
    </tbody>
  </table>

  <page @get-page="getNow" :current="current" :page-list="pageList" :pages="pages" />
</template>

<script setup>
import {getPages} from "@/utils/page-util";
import {ref} from "vue";
import Page from "@/components/Page.vue";
import {useRouter} from "vue-router";
import {showYearMonthDay} from "@/utils/DateTimeFormat";
import {deleteNow, getSysNowList} from "@/api/now";

const router = useRouter();

const nowList = ref([]);
const pages = ref(1);
const current = ref(1);
const pageList = ref([]);

function getNow(params) {
  getSysNowList(params).then(resp => {
    nowList.value = resp.records;
    pages.value = resp.pages;
    current.value = resp.current;

    pageList.value = getPages(current.value, pages.value);
  })
}

function handleDelete(id) {
  deleteNow(id).then(resp => {
    router.push('/manage/now');
  })
}
</script>

<style lang="scss" scoped>

</style>