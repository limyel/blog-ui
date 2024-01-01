<template>
  <div class="app is-flex is-flex-direction-column">
    <Header/>
    <div class="main section pl-0 pr-0 is-flex-grow-1">
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Cookies from "js-cookie";
import {useUserStore} from "@/store/user";

const token = Cookies.get('token');
const userStore = useUserStore();
if (token !== '' && token !== null && token !== undefined) {
  userStore.updateIsLogin();
}
</script>

<style lang="scss">
@font-face {
  font-family: "oppos-sons";
  src: url('./assets/font/OPPOSans-L.ttf');
  font-weight: 200;
  font-style: normal;
}
@font-face {
  font-family: "oppos-sons";
  src: url('./assets/font/OPPOSans-R.ttf');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "oppos-sons";
  src: url('./assets/font/OPPOSans-B.ttf');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: "oppos-sons";
  src: url('./assets/font/OPPOSans-H.ttf');
  font-weight: 900;
  font-style: normal;
}

.app {
  min-height: 100vh;
}

.main {
  width: 76%;
  margin: auto;
}

/* markdown 样式 */
.github-markdown-body {
  padding: 0 !important;
}

</style>
