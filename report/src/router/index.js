import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import Login from '@/view/login'
import Error from '@/view/error'
import Admin from '@/view/home/admin'
// import AddOperation from '@/view/home/operation-add'
// import AllOperation from '@/view/home/operation-all'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/report/',
  routes: [
    {
      path: '/', // 项目第一个页面路径为/ ，将它重定向到/login
      redirect: '/login',
      component: Home,
      children: [{
        path: '/admin',
        name: 'Admin',
        component: Admin
      }]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/operation',
      name: 'Operation',
      component: Home,
      children: [{
        path: 'add',
        name: 'Add',
        component: () => import('@/view/operation/add/index'),
        children: [{
          path: 'group',
          name: 'AddGroup',
          component: () => import('@/view/operation/add/operation-add-group')
        }, {
          path: 'building',
          name: 'AddBuilding',
          component: () => import('@/view/operation/add/operation-add-building')
        }, {
          path: 'sport',
          name: 'AddSport',
          component: () => import('@/view/operation/add/operation-add-sport')
        }]
      }, {
        path: 'all',
        name: 'All',
        component: () => import('@/view/operation/all/index'),
        children: [
          {
            path: 'group',
            name: 'AllGroup',
            component: () => import('@/view/operation/all/operation-all-group')
          }, {
            path: 'building',
            name: 'AllBuilding',
            component: () => import('@/view/operation/all/operation-all-building')
          }, {
            path: 'sport',
            name: 'AllSport',
            component: () => import('@/view/operation/all/operation-all-sport')
          }
        ]
      }]
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})

// 通用路由
export const constantRoutes = [
  {
    path: '/', // 项目第一个页面路径为/ ，将它重定向到/login
    redirect: '/login',
    component: Home,
    children: [{
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {title: '首页'}
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

// 异步挂载的路由
export const asyncRoutes = [
  {
    path: '/operation',
    name: 'Operation',
    component: Home,
    meta: {title: '运营成本统计'},
    children: [{
      path: 'add',
      name: 'Add',
      component: () => import('@/view/operation/add/index'),
      meta: {title: '运营成本统计', roles: ['1', '2', '3']},
      children: [{
        path: 'group',
        name: 'AddGroup',
        meta: {title: '集团模块', roles: ['1']},
        component: () => import('@/view/operation/add/operation-add-group')
      }, {
        path: 'building',
        name: 'AddBuilding',
        meta: {title: '建筑模块', roles: ['2']},
        component: () => import('@/view/operation/add/operation-add-building')
      }, {
        path: 'sport',
        name: 'AddSport',
        meta: {title: '文体模块', roles: ['3']},
        component: () => import('@/view/operation/add/operation-add-sport')
      }]
    }, {
      path: 'all',
      name: 'All',
      component: () => import('@/view/operation/all/index'),
      meta: {title: '运营成本汇总', roles: ['1', '2', '3', '7']},
      children: [
        {
          path: 'group',
          name: 'AllGroup',
          meta: {title: '集团模块', roles: ['1', '7']},
          component: () => import('@/view/operation/all/operation-all-group')
        }, {
          path: 'building',
          name: 'AllBuilding',
          meta: {title: '建筑模块', roles: ['2', '7']},
          component: () => import('@/view/operation/all/operation-all-building')
        }, {
          path: 'sport',
          name: 'AllSport',
          meta: {title: '文体模块', roles: ['3', '7']},
          component: () => import('@/view/operation/all/operation-all-sport')
        }
      ]
    }]
  },
  {
    path: '*',
    name: 'Error',
    component: Error
  }
]

// const createRouter = () => new Router({
//   mode: 'history',
//   base: '/report/',
//   routes: constantRoutes
// })
//
// const router = createRouter()
//
// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter () {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }
//
// export default router
