import { defineStore } from 'pinia'
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      isLogin: false
    }
  },
  getter: {
    getIsLogin() {
      return this.isLogin;
    }
  },
  actions: {
    updateIsLogin() {
      this.isLogin = !this.isLogin;
    }
  },
  getters: {},
  persist: true,
})
