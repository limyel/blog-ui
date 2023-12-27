import { createApp } from 'vue'
import App from '@/App.vue'
import '@css/tailwind.css'
import router from "@/router";

const app = createApp(App)

app.mount('#app')
app.use(router)
