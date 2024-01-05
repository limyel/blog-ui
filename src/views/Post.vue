<template>
  <div class="post">
    <div class="title">
      {{post.title}}
    </div>

    <div class="is-flex is-justify-content-space-between">
      <div>
        标签：
        <a class="tag is-link mr-1" :href="'/tag/' + tag.id" v-for="(tag, index) in post.tags" :key="index">
          {{tag.name}}
        </a>
      </div>
      <div>{{showTimeDetail(post.publishTime)}}</div>
    </div>

    <br />

    <div>
      <v-md-preview class="p-0" :text="post.content"></v-md-preview>
    </div>

  </div>
</template>

<script setup>
import { showTimeDetail, showYearMonthDay } from "../utils/DateTimeFormat";
import { ref } from "vue";
import { getPost } from "@/api/post";
import { useRoute } from "vue-router";

const post = ref({});

const route = useRoute();
getPost(route.params['id']).then(resp => {
  post.value = resp;
})
</script>

<style lang="scss" scoped>
</style>
