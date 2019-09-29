import Vue from 'vue'
import Vuex from 'vuex'
import $api from '@/api'
import { asyncRoutes, constantRoutes } from '@/router'
// import user from './user'
// import permission from './permission'
// import getters from './getters'

Vue.use(Vuex)

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role) >= 0)
  } else {
    return true
  }
}

let store = new Vuex.Store({
  state: {
    user: {},
    token: '',
    routers: constantRoutes,
    addRouters: [],
    isRouters: false
    // departmentId: '',
    // departmentName: '',
    // plateId: '',
    // userDepartment: '',
    // userId: '',
    // userName: '',
    // userNum: ''
  },
  getters: {
    token: state => state.token,
    userName: state => state.user.userName,
    userId: state => state.user.userId,
    userNum: state => state.user.userNum,
    userDepartment: state => state.user.userDepartment,
    plateId: state => {
      let arr = []
      arr[0] = state.user.plateId
      return arr
    },
    departmentName: state => state.user.departmentName,
    departmentId: state => state.user.departmentId,
    addRouters: state => state.addRouters,
    isRouters: state => state.isRouters
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRoutes.concat(routers)
    },
    MODIFY_ISROUTERS: (state) => {
      state.isRouters = true
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      console.log(userInfo)
      return new Promise((resolve, reject) => {
        $api.user.login(userInfo).then(rsp => {
          let data = rsp.data
          console.log(JSON.stringify(rsp.data))
          if (data.result === '200') {
            commit('SET_USER', data.user)
            commit('SET_TOKEN', data.token)
            // // 生成可访问的路由表
            // store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            // })
          }
          resolve(rsp.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    generateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const roles = data.roles
        console.log(roles)
        const accessedRouters = asyncRoutes.filter(v => {
          if (roles.indexOf('admin') >= 0) return true
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false
              })
              return v
            } else {
              return v
            }
          }
          return false
        })
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
})

/* const store = new Vuex.Store({
  modules: {
    user,
    permission
  },
  getters: {
    // token: state => state.user.token,
    userName: state => state.user.user.userName,
    userId: state => state.user.user.userId,
    userNum: state => state.user.user.userNum,
    userDepartment: state => state.user.user.userDepartment,
    roles: state => {
      let arr = []
      arr[0] = state.user.user.plateId
      return arr
    },
    departmentName: state => state.user.user.departmentName,
    departmentId: state => state.user.user.departmentId,
    // language: state => state.app.language,
    // sidebar: state => state.app.sidebar,
    // device: state => state.app.device,
    // avatar: state => state.user.avatar,
    // name: state => state.user.name,
    // roles: state => state.user.roles,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters
    // website: state => state.common.website,
    // isLock: state => state.user.isLock,
    // lockPasswd: state => state.user.lockPasswd,
    // isFullScren: state => state.common.isFullScren,
    // visitedViews: state => state.tagsView.visitedViews,
    // cachedViews: state => state.tagsView.cachedViews,
    // browserHeaderTitle: state => state.user.browserHeaderTitle,
    // errorLogs: state => state.errorLog.logs
  }
}) */

export default store
