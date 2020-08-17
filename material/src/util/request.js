import axios from 'axios'
// import store from '@/store'
import { Message } from 'element-ui'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
const instance = axios.create({
  baseURL: 'http://192.168.20.100:8093'
  // baseURL: 'http://njssjt.wicp.vip:26296'
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    console.log('request config:', config)
    // console.log(JSON.stringify(config.data))
    // console.log(store.state)
    // const token = store.getters.token
    // if (token) {
    //   config.headers.common.Authorization = token
    // }
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
    console.log('response:', response.data)
    return response.data
  },
  error => {
    // 对响应错误做点什么
    Message({
      message: error,
      type: 'error',
      duration: 1000
    })
    console.log('response error:', error)
    return Promise.reject(error)
  })

export default instance
