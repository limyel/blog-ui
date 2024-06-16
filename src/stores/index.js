// 引入全局状态管理
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

// pinia 持久化
pinia.use(piniaPluginPersistedstate)

export default pinia