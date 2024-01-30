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
      <select multiple size="8" v-model="tagIds">
        <option :value="tag.id" v-for="(tag, index) in tagList" :key="index" @click="handle">{{tag.name}}</option>
      </select>
    </div>
  </div>

  <div class="field">
    <label class="label">Draft</label>
    <div class="control">
      <label class="radio">
        <input type="radio" name="draft" value="true" :checked="draft === true" v-model="draft">
        True
      </label>
      <label class="radio">
        <input type="radio" name="draft" value="false" :checked="draft === false" v-model="draft">
        False
      </label>
    </div>
  </div>

  <div class="field">
    <label class="label">Top</label>
    <div class="control">
      <label class="radio">
        <input type="radio" name="top" value="true" :checked="top === true" v-model="top">
        True
      </label>
      <label class="radio">
        <input type="radio" name="top" value="false" :checked="top === false" v-model="top">
        False
      </label>
    </div>
  </div>

  <div class="field">
    <label class="label">Publish Time(millisecond)</label>
    <div class="control">
      <input class="input" type="number" v-model="publishTime" />
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
const draft = ref(false);
const top = ref(false);
const publishTime = ref(null);
const tagIds = ref([]);
const content = ref('');
const isEdit = ref(false);

getTagAll().then(resp => {
  tagList.value = resp;
})

function handleSubmit() {
  if (isEdit.value) {
    updatePost({id: id, title: title.value, description: description.value,
      draft: draft.value, top: top.value, tagIds: tagIds.value,
      publishTime: publishTime.value, content: content.value}).then(resp => {
      router.push('/manage/post');
    })
  } else {
    addPost({title: title.value, description: description.value,
      draft: draft.value, top: top.value, tagIds: tagIds.value,
      publishTime: publishTime.value, content: content.value}).then(resp => {
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
    draft.value = resp.draft;
    top.value = resp.top
    publishTime.value = resp.publishTime
    tagIds.value = resp.tagIds;
    content.value = resp.content;
  })
}


</script>