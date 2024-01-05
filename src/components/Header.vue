<template>
  <nav class="navbar is-info header" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item logo pl-0">
        limyel
      </div>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" :class="menuName === 'Home' ? 'is-active' : ''" href="/">
          文章
        </a>
        <a class="navbar-item" :class="menuName === 'Archive' ? 'is-active' : ''" href="/archive">
          归档
        </a>
        <a class="navbar-item" :class="menuName === 'Message' ? 'is-active' : ''" href="/message">
          留言
        </a>
        <a class="navbar-item" :class="menuName === 'About' ? 'is-active' : ''" href="/about">
          关于
        </a>
        <a class="navbar-item" :class="menuName === 'Search' ? 'is-active' : ''" href="/search">
          搜索
        </a>
      </div>

      <div class="navbar-end" v-if="isLogin">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            New
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/new/post">
              Post
            </a>
            <a class="navbar-item" href="/new/tag">
              Tag
            </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Manage
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/manage/post">
              Post
            </a>
            <a class="navbar-item" href="/manage/tag">
              Tag
            </a>
            <a class="navbar-item">
              Message
            </a>
          </div>
        </div>
        <a class="navbar-item" href="/setting">
          Setting
        </a>
        <a class="navbar-item" @click="handleLogout">
          Logout
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {logout} from "@/api/user";
import Cookies from 'js-cookie';
import {useUserStore} from "@/store/user";

const userStore = useUserStore();
const isLogin = computed(() => userStore.isLogin);

const route = useRoute();
const router = useRouter();
const menuName = ref(null);

watch(() => route.name, (newName, oldName) => {
  menuName.value = newName;
})

function handleLogout() {
  logout().then(resp => {
    Cookies.remove('token');
    router.push('/')
    userStore.updateIsLogin();
  })
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 2rem;
  font-weight: bold;
  padding-left: 0;
}

.header {
  padding: 0 12%;
}
</style>
