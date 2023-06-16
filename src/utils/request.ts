/**
 * axios 二次封装
 */
import axios from 'axios'
import { ElMessage } from 'element-plus/es/components/index'
//引入用户相关的仓库
import useUserStore from '@/store/modules/user'

// 通过create创建一个axios实例来配置请求
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径湖携带/api
  timeout: 5000,
})

// 添加请求拦截器

request.interceptors.request.use((config) => {
  //获取用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
  let userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  // config 配置对象，header属性请求头，通常给服务器段携带公共参数
  // 返回配置对象
  return config
})

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功回调
    return response.data
  },
  (error) => {
    // 失败回调
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权限访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器未响应'
        break
      default:
        message = '网络出现问题'
        break
    }
    // 提示错误信息
    ElMessage({
      type: error,
      message,
    })
    return Promise.reject(error)
  },
)
export default request
