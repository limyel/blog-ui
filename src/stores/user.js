import {defineStore} from "pinia";
import {ref} from "vue";
import {getCurrentUserInfo} from "@/api/admin/user.js";
import {removeToken} from "@/composables/cookie.js";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})

    // 获取当前用户信息
    function setCurrentUserInfo() {
        getCurrentUserInfo().then(resp => {
            // todo 在路由守卫处理
            if (resp.code === 'Success') {
                userInfo.value = resp.data
            }
        })
    }

    // 登出
    function logout() {
        removeToken()
        userInfo.value = {}
    }

    return { userInfo, setCurrentUserInfo, logout }
},
{
    // 开启持久化
    persist: true,
}
)
