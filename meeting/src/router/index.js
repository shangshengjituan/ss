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
    component: () => import('../views/Login.vue')
  }, {
    path: '/updatepwd',
    name: 'UpdatePwd',
    component: () => import('../views/UpdatePwd.vue')
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
    path: '/staffadd',
    name: 'StaffAdd',
    component: () => import('../views/StaffAdd.vue')
  }, {
    path: '/staffmodify',
    name: 'StaffModify',
    component: () => import('../views/StaffModify.vue')
  }, {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue')
  }, {
    path: '/useradd',
    name: 'UserAdd',
    component: () => import('../views/UserAdd.vue')
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
