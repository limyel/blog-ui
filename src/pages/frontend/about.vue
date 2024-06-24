<template>
  <MdPreview :model-value="about"></MdPreview>
</template>

<script setup>
import {getSettingAbout} from "@/api/frontend/setting.js";
import {ref} from "vue";
import {MdPreview} from 'md-editor-v3'

const about = ref('')

getSettingAbout().then(resp => {
  if (resp.code === 'Success') {
    about.value = resp.data.about
  }
})
</script>

<style>
.md-editor-preview-wrapper {
  padding: 0 !important;
}
</style>