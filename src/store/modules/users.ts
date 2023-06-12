import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import { UserState } from './types'
import { setToken, getToken } from '@/utils/token'
export const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: getToken(),
    }
  },
  getters: {},
  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token as string
        setToken(result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message as string))
      }
    },
  },
})
