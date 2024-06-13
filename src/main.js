import '@/assets/main.css'
// element plus 样式
import 'element-plus/dist/index.css'
// 页面加载样式
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局路由守卫
import '@/permission'

const app = createApp(App)

// 引入动画样式
import 'animate.css'

// 导入 Element Plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 引入全局状态管理
import {createPinia} from "pinia";
const pinia = createPinia()
app.use(pinia)

app.use(router)
app.mount('#app')
