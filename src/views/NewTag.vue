<template>
  <div class="title" v-if="isEdit">
    Edit Tag
  </div>
  <div class="title" v-else>
    New Tag
  </div>

  <div class="field">
    <label class="label">Name</label>
    <div class="control">
      <input class="input" type="text" v-model="tag.name">
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link" @click="handleSubmit">Submit</button>
    </div>
  </div>
</template>

<script setup>
import {addTag, getSysTag, updateTag} from "@/api/tag";
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const tag = reactive({
  id: null,
  name: ''
})
const router = useRouter();
const route = useRoute();
const isEdit = ref(false);

function handleSubmit() {
  if (isEdit.value) {
    updateTag(tag).then(resp => {
      router.push('/manage/tag');
    })
  } else {
    addTag({name: tag.name}).then(resp => {
      router.push('/manage/tag');
    })
  }

}

let id = route.query['id'];
if (id !== null && id !== undefined) {
  isEdit.value = true;
  getSysTag(id).then(resp => {
    tag.id = resp.id;
    tag.name = resp.name;
  })
}

</script>

