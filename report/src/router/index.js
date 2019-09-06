import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import Login from '@/view/login'
import Error from '@/view/error'
import AddOperation from '@/view/home/operation-add'
import AllOperation from '@/view/home/operation-all'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/report/',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
        path: '/addoperation/:type',
        name: 'AddOperation',
        component: AddOperation
      }, {
        path: '/alloperation/:type',
        name: 'AllOperation',
        component: AllOperation
      }]
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
