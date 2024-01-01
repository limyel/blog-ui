<template>
  <div class="title" v-if="isEdit">
    Edit Now
  </div>
  <div class="title" v-else>
    New Now
  </div>

  <div class="field">
    <label class="label">Content</label>
    <v-md-editor v-model="now.content" height="700px"></v-md-editor>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link" @click="handleSubmit">Submit</button>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {addNow, getSysNow, updateNow} from "@/api/now";

const now = reactive({
  id: null,
  content: ''
})
const router = useRouter();
const route = useRoute();
const isEdit = ref(false);

function handleSubmit() {
  if (isEdit.value) {
    updateNow(now).then(resp => {
      router.push('/manage/now');
    })
  } else {
    addNow({content: now.content}).then(resp => {
      router.push('/manage/now');
    })
  }
}

let id = route.query['id'];
console.log(id)
if (id !== null && id !== undefined) {
  isEdit.value = true;
  getSysNow(id).then(resp => {
    now.id = resp.id;
    now.content = resp.content;
  })
}

</script>

