<template>
  <div>
    <v-md-preview :text="about"></v-md-preview>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {getAbout} from "../api/user";

const about = ref('');

getAbout().then(resp => {
  about.value = resp;
})
</script>

<style lang="scss" scoped>
</style>
