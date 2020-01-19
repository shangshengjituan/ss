import Vue from 'vue'
import Vuex from 'vuex'
import $api from '@/api'
// import { asyncRoutes, constantRoutes } from '@/router'
// import router from '../router'
import createVuexAlong from 'vuex-along'

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
    }],
    openTab: [], // 所有打开的路由
    activeIndex: '/admin' // 激活状态
  },
  getters: {
    token: state => state.token,
    userName: state => state.user.userName,
    userId: state => state.user.userId,
    userNum: state => state.user.userNum,
    plateId: state => state.user.plateId,
    // plateId转换为plateIdArr控制侧栏显示
    // 不用了
    plateIdArr: state => {
      let arr = []
      arr[0] = state.user.plateId
      return arr
    },
    // plateId值4和123 departmentId值0和其他
    // plateId departmentId用于分配权限
    // userDepartment用户部门
    departmentId: state => state.user.departmentId,
    departmentName: state => state.user.departmentName,
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
    },
    // SET_ROUTERS: (state, r) => {
    //   state.addRouters = r
    //   state.routers = constantRoutes.concat(r)
    // }
    // 添加tabs
    add_tabs (state, data) {
      this.state.openTab.push(data)
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0
      for (let option of state.openTab) {
        if (option.route === route) {
          break
        }
        index++
      }
      this.state.openTab.splice(index, 1)
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.activeIndex = index
    }
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
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        $api.user.logout().then(rsp => {
          commit('SET_USER', {})
          commit('SET_TOKEN', '')
          resolve(rsp.data)
        }).catch(error => {
          reject(error)
        })
      })
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
  },
  plugins: [createVuexAlong({
    name: 'state',
    session: {
      list: ['user', 'token', 'addType']
    },
    justSession: true
  })]
})

export default store
