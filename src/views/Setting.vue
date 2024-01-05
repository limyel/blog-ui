<template>
  <div class="title">
    Edit Setting
  </div>

  <div class="field">
    <label class="label">About</label>
    <v-md-editor height="700px" v-model="about"></v-md-editor>
  </div>
  <br />

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link" @click="handleSubmit">Submit</button>
    </div>
  </div>
</template>

<script setup>
import {getSysAbout, updateAbout} from "../api/user";
import {ref} from "vue";

let about = ref('');

loadAbout()

function loadAbout() {
  getSysAbout().then(resp => {
    about.value = resp;
  })
}

function handleSubmit() {
  updateAbout(about.value).then(resp => {
    loadAbout();
  })
}
</script>