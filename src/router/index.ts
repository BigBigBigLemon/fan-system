// 路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
const router = createRouter({
  //路由模式hash
  history: createWebHashHistory(),

  routes: constantRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
