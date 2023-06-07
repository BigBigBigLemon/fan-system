import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import gloablComponent from './components/index'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import './styles/index.scss'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(gloablComponent)
app.use(pinia)
app.mount('#app')
