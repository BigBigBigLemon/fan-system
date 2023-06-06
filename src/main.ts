import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import gloablComponent from './components/index'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import './styles/index.scss'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(gloablComponent)

app.mount('#app')
