import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast, Dialog, Notify } from 'vant'

import api from './api'

Vue.config.productionTip = false

Vue.prototype.$api = api

Vue.use(Toast, Dialog, Notify)

router.beforeEach((to, from, next) => {
  const token = store.getters.token
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
