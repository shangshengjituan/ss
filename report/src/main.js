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
  console.log('router:', from.name, '-->', to.name)
  if (store.getters.token) { // 判断是否有token
    next()
  } else {
    if (to.name === 'Login') {
      next()
    } else {
      next('/')
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

/*
this.$axios.get('/selectAll', {
      params: {
        page: 1,
        size: 10
      }
    })
      .then(rsp => { console.log(rsp) })
      .catch(error => { console.log(error) })
this.$axios.post('/25-3', {
  id: '13030300'
})
  .then(rsp => {
    console.log('success:')
    console.log(rsp)
  })
 */
