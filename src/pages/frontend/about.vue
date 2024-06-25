<template>
  <MdPreview :model-value="about"></MdPreview>

  <MdPreview :editorId="id" :modelValue="text" />
  <MdCatalog :editorId="id" :scrollElement="scrollElement" />
</template>

<script setup>
import {getSettingAbout} from "@/api/frontend/setting.js";
import {ref} from "vue";
import {MdPreview,MdCatalog} from 'md-editor-v3'

const about = ref('')

getSettingAbout().then(resp => {
  if (resp.code === 'Success') {
    about.value = resp.data.about
  }
})

const id = 'preview-only';
const text = ref('# Hello Editor');
const scrollElement = document.documentElement;
</script>

<style>
.md-editor-preview-wrapper {
  padding: 0 !important;
}
</style>