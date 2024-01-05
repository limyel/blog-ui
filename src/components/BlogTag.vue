<template>
  <div class="section pt-0 pr-0">
    <article class="panel is-link tag-container">
      <p class="panel-heading">
        标签
      </p>
      <div class="panel-block pl-125em pr-125em is-flex is-justify-content-space-between"
           v-for="(tag, index) in tagList" :key="index">
        <a class="is-block" :href="'/tag/' + tag.id">
          {{tag.name}}
        </a>
        <div class="tag is-info">
          {{tag.postNum}}
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { getTagList } from "@/api/tag";
import { ref } from "vue";

const tagList = ref([]);

getTagList().then(resp => {
  tagList.value = resp;
})
</script>

<style lang="scss" scoped>
.tag-container {
  width: 280px;
}
.pl-125em {
  padding-left: 1.25em;
}
.pr-125em {
  padding-right: 1.25em;
}

.panel-block:hover {
  background-color: hsl(0, 0%, 96%);
}
</style>