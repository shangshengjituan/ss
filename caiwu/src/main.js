import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import api from './api'
import XEUtils from 'xe-utils'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$utils = XEUtils
Vue.prototype.$api = api

new Vue({
  render: h => h(App),
}).$mount('#app')
