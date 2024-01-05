<template>
  <div class="posts">
    <div class="" v-for="(post, index) in postList" :key="index">
      <h1 class="title">
        <a :href="'/post/' + post.id">
          {{post.title}}
        </a>
      </h1>
      <div>
        {{post.description}}
      </div>
      <br />
      <div class="is-flex is-justify-content-space-between">
        <div>
          标签：
          <a class="tag is-link mr-1" :href="'/tag/' + tag.id" v-for="(tag, index) in post.tags" :key="index">
            {{tag.name}}
          </a>
        </div>
        <div>{{showTimeDetail(post.publishTime)}}</div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { showTimeDetail } from "@/utils/DateTimeFormat";

defineProps({
  postList: {
    type: Array,
    required: true
  }
})
</script>