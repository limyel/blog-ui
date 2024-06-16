import {defineStore} from "pinia";
import {ref} from "vue";
import {getCurrentUserInfo} from "@/api/admin/user.js";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})

    function setCurrentUserInfo() {
        getCurrentUserInfo().then(resp => {
            // todo 在路由守卫处理
            if (resp.code === 'Success') {
                userInfo.value = resp.data
            }
        })
    }

    return { userInfo, setCurrentUserInfo}
})
