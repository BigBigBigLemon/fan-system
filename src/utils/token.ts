// 封装本地存储和读取数据方法
export const setToken = (token: string) => localStorage.setItem('TOKEN', token)
export const getToken = (): string => localStorage.getItem('TOKEN')
export const removeToken = () => localStorage.setItem('TOKEN', '')
