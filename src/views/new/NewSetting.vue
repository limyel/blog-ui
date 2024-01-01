<template>
  <div class="title">
    Edit Setting
  </div>

  <div class="field">
    <label class="label">About</label>
    <v-md-editor v-model="setting.about" height="700px"></v-md-editor>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link" @click="handleSubmit">Submit</button>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getSysSetting, updateSetting} from "@/api/setting";

const setting = reactive({
  id: null,
  about: ''
})
const router = useRouter();

function handleSubmit() {
  updateSetting(setting).then(resp => {
  })
}

getSysSetting().then(resp => {
  setting.id = resp.id;
  setting.about = resp.about;
})

</script>

