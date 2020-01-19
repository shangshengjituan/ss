import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import store from './store'
import api from './api'
// 引入全局css
import './assets/index.css'

Vue.config.productionTip = false
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // let token = JSON.parse(sessionStorage.getItem('store')).token || store.getters.token || ''
  let token = store.getters.token
  if (token) { // 判断是否有token
    console.log('有token：', token, '  router:', from.name, '-->', to.name)
    next()
  } else {
    console.log('无token：', token, '  router:', from.name, '-->', to.name)
    if (to.name === 'Login') {
      next()
    } else {
      next('/login')
    }
  }
})
router.afterEach((to, from, next) => {
  window.scroll(0, 0)
})

Vue.prototype.$axios = Axios
Vue.prototype.$api = api
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
