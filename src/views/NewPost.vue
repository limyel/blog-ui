<template>
  <div class="title" v-if="isEdit">
    Edit Post
  </div>
  <div class="title" v-else>
    New Post
  </div>

  <div class="field">
    <label class="label">Title</label>
    <div class="control">
      <input class="input" type="text" v-model="title" />
    </div>
  </div>

  <div class="field">
    <label class="label">Description</label>
    <div class="control">
      <textarea class="textarea" v-model="description" />
    </div>
  </div>

  <div class="field" v-if="tagList.length > 0">
    <label class="label">Tag</label>
    <div class="select is-multiple">
      <select multiple size="8" v-model="tagIdList">
        <option :value="tag.id" v-for="(tag, index) in tagList" :key="index" @click="handle">{{tag.name}}</option>
      </select>
    </div>
  </div>

  <div class="field">
    <label class="label">Status</label>
    <div class="control">
      <label class="radio">
        <input type="radio" name="question" value="1" :checked="status === 1" v-model="status">
        Publish
      </label>
      <label class="radio">
        <input type="radio" name="question" value="0" :checked="status === 0" v-model="status">
        Draft
      </label>
    </div>
  </div>

  <div class="field">
    <label class="label">Content</label>
    <v-md-editor v-model="content" height="700px"></v-md-editor>
  </div>
  <br />

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link" @click="handleSubmit">Submit</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {getTagAll} from "@/api/tag";
import {addPost, getSysPost, updatePost} from "@/api/post";
import {useRoute, useRouter} from "vue-router";

const tagList = ref([]);
const router = useRouter();
const route = useRoute();

const title = ref('');
const description = ref('');
const status = ref(0);
const tagIdList = ref([]);
const content = ref('');
const isEdit = ref(false);

getTagAll().then(resp => {
  tagList.value = resp;
})

function handleSubmit() {
  if (isEdit.value) {
    updatePost({id: id, title: title.value, description: description.value,
      status: status.value, tagIdList: tagIdList.value, content: content.value}).then(resp => {
      router.push('/manage/post');
    })
  } else {
    addPost({title: title.value, description: description.value,
      status: status.value, tagIdList: tagIdList.value, content: content.value}).then(resp => {
      router.push('/manage/post');
    })
  }

}

let id = route.query['id'];
if (id !== null && id !== undefined) {
  isEdit.value = true;
  getSysPost(id).then(resp => {
    title.value = resp.title;
    description.value = resp.description;
    status.value = resp.status;
    tagIdList.value = resp.tagIdList;
    content.value = resp.content;
  })
}


</script>