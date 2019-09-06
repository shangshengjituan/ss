import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import Login from '@/view/login'
import Error from '@/view/error'
import AddNews from '@/view/home/news-add'
import SortNews from '@/view/home/news-sort'
import ModifyNews from '@/view/home/news-modify'
import AddTrack from '@/view/home/track-add'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/demo/',
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
        path: '/addnews',
        name: 'Addnews',
        component: AddNews
      }, {
        path: '/modifynews/:id',
        name: 'Modifynews',
        component: ModifyNews
      }, {
        path: '/sortnews',
        name: 'Sortnews',
        component: SortNews
      }, {
        path: '/addtrack',
        name: 'Addtrack',
        component: AddTrack
      }]
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
