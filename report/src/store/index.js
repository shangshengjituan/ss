import Vue from 'vue'
import Vuex from 'vuex'
import $api from '@/api'
// import { asyncRoutes, constantRoutes } from '@/router'
// import router from '../router'
// import createVuexAlong from 'vuex-along'

Vue.use(Vuex)

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission (roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

let store = new Vuex.Store({
  state: {
    user: {},
    token: '',
    // routers: constantRoutes,
    // addRouters: [],
    // 预估实际季度选择
    addType: [{
      value: '1',
      label: '预估'
    }, {
      value: '2',
      label: '实际',
      children: [{
        value: '1',
        label: '第一季度'
      }, {
        value: '2',
        label: '第二季度'
      }, {
        value: '3',
        label: '第三季度'
      }, {
        value: '4',
        label: '第四季度'
      }]
    }]
  },
  getters: {
    token: state => state.token,
    userName: state => state.user.userName,
    userId: state => state.user.userId,
    userNum: state => state.user.userNum,
    plateId: state => state.user.plateId,
    // plateId转换为plateIdArr控制侧栏显示
    plateIdArr: state => {
      let arr = []
      arr[0] = state.user.plateId
      return arr
    },
    departmentName: state => state.user.departmentName,
    departmentId: state => state.user.userDepartment,
    // 控制个别按钮，小功能
    role: state => {
      let tem = state.user.departmentId
      if (tem !== 0) {
        return 'leader'
      } else {
        return 'superLeader'
      }
    },
    // routers: state => state.routers,
    // addRouters: state => state.addRouters,
    addType: state => state.addType // 预估实际季度选择
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    }
    // SET_ROUTERS: (state, r) => {
    //   state.addRouters = r
    //   state.routers = constantRoutes.concat(r)
    // }
  },
  actions: {
    login ({ commit, dispatch, getters }, userInfo) {
      return new Promise((resolve, reject) => {
        $api.user.login(userInfo).then(rsp => {
          let data = rsp.data
          console.log(JSON.stringify(rsp.data))
          if (data.result === '200') {
            commit('SET_USER', data.user)
            commit('SET_TOKEN', data.token)
            // 生成可访问的路由表
            // let roles = getters.plateIdArr
            // let userNum = getters.userNum
            // dispatch('generateRoutes', { roles, userNum }).then(() => { // 生成可访问的路由表
            //   router.addRoutes(getters.addRouters) // 动态添加可访问路由表
            // })
          }
          resolve(rsp.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // generateRoutes ({ commit }, data) {
    //   return new Promise(resolve => {
    //     const roles = data.roles
    //     let num = data.userNum
    //     const accessedRouters = asyncRoutes.filter(v => {
    //       // 第一层 v
    //       if (num === 'admin') return true // 测试账号
    //       if (hasPermission(roles, v)) {
    //         if (v.children && v.children.length > 0) {
    //           // 第二层 child
    //           v.children = v.children.filter(child => {
    //             if (hasPermission(roles, child)) {
    //               if (child.children && child.children.length > 0) {
    //                 // 第三层 son
    //                 child.children = child.children.filter(son => {
    //                   if (hasPermission(roles, son)) {
    //                     return son
    //                   }
    //                   return false
    //                 })
    //               }
    //               return child
    //             }
    //             return false
    //           })
    //         }
    //         return v
    //       }
    //       return false
    //     })
    //     commit('SET_ROUTERS', accessedRouters)
    //     resolve()
    //   })
    // },
    // user logout
    logout ({ commit, state }) {
      commit('SET_USER', {})
      commit('SET_TOKEN', '')
      // return new Promise((resolve, reject) => {
      // export function logout() {
      //   return request({
      //     url: '/user/logout',
      //     method: 'post'
      //   })
      // }

      // 下面的logout是后端返回的接口
      //   $api.user.logout(state.token).then(() => {
      //     commit('SET_USER', {})
      //     commit('SET_TOKEN', '')
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    }
  }
  // plugins: [createVuexAlong()]
})

export default store
