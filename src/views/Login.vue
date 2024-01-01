<template>
  <div class="title pt-6 m-auto" style="width: 600px;">
    Log in
  </div>
  <div class="login-container mt-6">
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
       <input class="input" type="text" v-model="username">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" v-model="password">
      </div>
    </div>
    <button class="button is-info" @click="handleLogin">Submit</button>
  </div>
</template>

<script setup>
import {login} from "@/api/user";
import {ref} from "vue";
import {useRouter} from "vue-router";
import Cookies from 'js-cookie';
import {useUserStore} from "@/store/user";

const router = useRouter();
const username = ref('');
const password = ref('');
const userStore = useUserStore();

function handleLogin() {
  login(username.value, password.value).then(resp => {
    Cookies.set('token', resp.token);
    userStore.updateIsLogin();
    router.push('/')
  })
}

</script>

<style lang="scss" scoped>
.login-container {
  width: 600px;
  margin: auto;
}
</style>
