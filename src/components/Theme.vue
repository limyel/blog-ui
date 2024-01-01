<template>
  <div class="is-flex is-flex-grow-1">
    <div class="pl-0 is-flex-grow-1" style="width: calc(100% - 280px);">
      <router-view></router-view>
    </div>
    <blog-tag />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import BlogTag from "@/components/BlogTag.vue";

export default {
  name: "Theme",
  components: {
    BlogTag,
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
</style>
