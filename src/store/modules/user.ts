import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { RouteRecordRaw } from 'vue-router'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
import { setToken, getToken, removeToken } from '@/utils/token'
// import router from '@/router'
import { constantRoute } from '@/router/routes'
// import cloneDeep from 'lodash/cloneDeep'
//用于过滤当前用户需要展示的异步路由
// function filterAsyncRoute(asnycRoute: any, routes: any) {
//   return asnycRoute.filter((item: any) => {
//     if (routes.includes(item.name)) {
//       if (item.children && item.children.length > 0) {
//         //硅谷333账号:product\trademark\attr\sku
//         item.children = filterAsyncRoute(item.children, routes)
//       }
//       return true
//     }
//   })
// }

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: getToken(),
      username: '',
      avatar: '',
      menuRoutes: constantRoute as RouteRecordRaw[], //仓库存储生成菜单需要数组(路由)
      buttons: [], //存储当前用户是否包含某一个按钮
    }
  },
  getters: {},
  actions: {
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token as string
        setToken(result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message as string))
      }
    },
    //获取用户信息方法

    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      const result: userInfoReponseData = await reqUserInfo()
      console.log(result)
      //如果获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.username = result.data.username
        this.avatar = result.data.avatar
        // console.log(this.username, this.avatar)
        // this.buttons = result.data.buttons
        //计算当前用户需要展示的异步路由
        // let userAsyncRoute = filterAsyncRoute(
        //   cloneDeep(asnycRoute),
        //   result.data.routes,
        // )
        // //菜单需要的数据整理完毕
        // this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        // //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        // ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
        //   router.addRoute(route)
        // })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout() {
      //退出登录请求
      // let result: any = await reqLogout()
      // if (result.code == 200) {
      //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
      this.token = ''
      this.username = ''
      this.avatar = ''
      removeToken()
      // return 'ok'
      // } else {
      // return Promise.reject(new Error(result.message))
      // }
    },
  },
})
//对外暴露获取小仓库方法
export default useUserStore
