<template>
  <div class="posts">
    <div class="" v-for="(post, index) in postList" :key="index">
      <h1 class="title">
        <a :href="'/post/' + post.slug">
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
          <a class="tag is-link mr-1" :href="'/tag/' + tag.slug" v-for="(tag, index) in post.tagList" :key="index">
            {{tag.name}}
          </a>
        </div>
        <div>{{showYearMonthDay(post.createTime)}}</div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { showYearMonthDay } from "@/utils/DateTimeFormat";

defineProps({
  postList: {
    type: Array,
    required: true
  }
})
</script>