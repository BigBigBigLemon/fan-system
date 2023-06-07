// 登录接口请求数据
export interface loginForm {
  username: string
  password: string
}

// 登录接口响应数据
interface dataType {
  token?: string
  message?: string
}
export interface loginResponseData {
  code: number
  data: dataType
}

// 用户信息相关数据类型
export interface userResponsData {
  code: number
  data: {
    checkUser: {
      userId: number
      acatar: string
      username: string
      password: string
      desc: string
      roles: string[]
      buttons: string[]
      routes: string[]
      token: string
    }
  }
}
