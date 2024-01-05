<template>
  <div class="archive container">
    <div class="archive-container" v-for="(year, index) in yearList" :key="index">
      <div class="year">
        {{year}} 年
      </div>
      <div class="archive-posts">
        <div class="archive-post" v-for="(item, index) in archive[year]" :key="index">
          <div class="time">
            {{showMonthDay(item.publishTime)}}
          </div>
          <div>
            <router-link :to="{name: 'Post', params: {id: item.id}}">{{item.title}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {showMonthDay} from "@/utils/DateTimeFormat";
import {ref} from "vue";
import {getArchive} from "@/api/post";

const archive = ref({})
const yearList = ref([])

getArchive().then(resp => {
  archive.value = resp;
  yearList.value = Object.keys(resp).sort().reverse()
})

</script>

<style scoped lang="scss">
.archive {
  .archive-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;

    .year {
      margin-right: 40px;
      font-size: 1.5rem;
    }

    .archive-posts {
      padding-left: 40px;
      border-left: 2px solid #e5e5e5;

      .archive-post {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;

        .time {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>