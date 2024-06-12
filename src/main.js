import '@/assets/main.css'
import 'element-plus/dist/index.css'

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

app.use(router)
app.mount('#app')
