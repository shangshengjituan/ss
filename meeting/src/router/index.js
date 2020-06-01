import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }, {
    path: '/meetingadd',
    name: 'MeetingAdd',
    component: () => import('../views/MeetingAdd.vue')
  }, {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue')
  }, {
    path: '/staff',
    name: 'Staff',
    component: () => import('../views/Staff.vue')
  }, {
    path: '/staffmodify',
    name: 'StaffModify',
    component: () => import('../views/StaffModify.vue')
  }, {
    path: '/updatepwd',
    name: 'UpdatePwd',
    component: () => import('../views/UpdatePwd.vue')
  }, {
    path: '/qrcode',
    name: 'QrCode',
    component: () => import('../views/QrCode.vue')
  }, {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
