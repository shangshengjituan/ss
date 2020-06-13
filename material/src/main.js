import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import XEUtils from 'xe-utils'
// import 'xe-utils'
// import VXETable from 'vxe-table'
// import 'vxe-table/lib/index.css'
// import './util/utils'
// import './util/table'
import './util/ui'
import api from './api'

Vue.config.productionTip = false

// Vue.use(VXETable)

// 给 vue 实例挂载全局窗口对象
// Vue.prototype.$XModal = VXETable.modal
Vue.prototype.$utils = XEUtils
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
