import axios from 'axios'
import store from '../store'
import Notify from 'vant/lib/notify'
import 'vant/lib/notify/style'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
const instance = axios.create({
  baseURL: 'http://192.168.20.100:8091'
  // baseURL: 'http://2e56198e61.zicp.vip:22089'
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    console.log('request config:', config)
    const token = store.getters.token
    if (token) {
      config.headers.common.Authorization = token
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log('request error:', error)
    return Promise.reject(error)
  })

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data
  },
  error => {
    if (error.message === 'Network Error') {
      Notify('网络连接失败')
    }
    console.log(error)
    return Promise.reject(error)
  })

export default instance
