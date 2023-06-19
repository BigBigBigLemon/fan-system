import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import gloablComponent from './components/index'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import './styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
const app = createApp(App)

import router from './router'
import pinia from './store'

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(pinia)
app.use(gloablComponent)
//引入路由鉴权文件
import './permission'
app.mount('#app')
// 全局注册icons-vue
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
