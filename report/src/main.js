import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import api from './api'

Vue.config.productionTip = false

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log(to, from)
  // if (to.meta.title) {
  //   document.title = to.meta.title
  // }
  next()
})
router.afterEach((to, from, next) => {
  window.scroll(0, 0)
})

// Vue.prototype.$bus = new Vue()
Vue.prototype.$axios = Axios
Vue.prototype.$api = api
Vue.use(ElementUI)

// 设置baseURL
Axios.defaults.baseURL = 'http://192.168.20.56:8081'
// 设置token值
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// 请求头
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
