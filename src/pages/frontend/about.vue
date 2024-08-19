<template>
  <div class="col-span-6 col-start-2">
    <MdPreview :model-value="about"></MdPreview>
  </div>
</template>

<script setup>
import {getSettingAbout} from "@/api/frontend/setting.js";
import {ref} from "vue";
import {MdPreview} from 'md-editor-v3'

const about = ref('')

getSettingAbout().then(resp => {
  if (resp.code === 0) {
    about.value = resp.data.about
  }
})
</script>

<style>
.md-editor-preview-wrapper {
  padding: 0 !important;
}
</style>