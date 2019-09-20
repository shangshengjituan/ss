import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import Login from '@/view/login'
import Error from '@/view/error'
import Admin from '@/view/home/admin'
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
        path: '/admin',
        name: 'Admin',
        component: Admin
      }, {
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

// // 通用路由
// export const constantRouterMap = [
//   {path: '/', name: 'Login', component: Login},
//   {
//     path: '/home',
//     name: 'Home',
//     component: () => import('@/view/home'),
//     children: [{
//       path: '/admin',
//       name: 'Admin',
//       component: () => import('@/view/home/admin')
//     }]
//   }
// ]
//
// export default new Router({
//   mode: 'history',
//   base: '/report/',
//   routes: constantRouterMap
// })
//
// // 异步挂载的路由
// export const asyncRouterMap = [
//   {
//     path: '/home',
//     name: 'Home',
//     component: () => import('@/view/home'),
//     children: [{
//       path: '/addoperation/:type',
//       name: 'AddOperation',
//       component: () => import('@/view/home/operation-add')
//     }, {
//       path: '/alloperation/:type',
//       name: 'AllOperation',
//       component: () => import('@/view/home/operation-all')
//     }]
//   },
//   {
//     path: '*',
//     name: 'Error',
//     component: Error
//   }
// ]
