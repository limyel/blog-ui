<template>
  <div class="title">
    我正在做/想些什么
  </div>
  <div class="mb-5">
    发布于 {{showYearMonthDay(now.createTime)}}
  </div>
  <div class="box">
    <v-md-preview class="p-0" :text="now.content"></v-md-preview>
  </div>
</template>

<script setup>
import {getNow} from "@/api/now";
import {reactive} from "vue";
import {showYearMonthDay} from "../utils/DateTimeFormat";

const now = reactive({
  content: '',
  createTime: null
})

getNow().then(resp => {
  now.content = resp.content;
  now.createTime = resp.createTime;
})
</script>