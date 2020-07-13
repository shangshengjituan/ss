import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import XEUtils from 'xe-utils'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'xe-utils'
// import './util/utils'
// import './util/ui'
import api from './api'

Vue.config.productionTip = false

Vue.prototype.$utils = XEUtils
Vue.prototype.$api = api

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
