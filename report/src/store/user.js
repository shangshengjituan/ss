import Vue from 'vue'
import Vuex from 'vuex'
import $api from '@/api'

Vue.use(Vuex)

let user = {
  state: {
    user: {},
    token: ''
    // departmentId: '',
    // departmentName: '',
    // plateId: '',
    // userDepartment: '',
    // userId: '',
    // userName: '',
    // userNum: ''
  },
  // getters: {
  //   token: state => state.token,
  //   userName: state => state.user.userName,
  //   userId: state => state.user.userId,
  //   userNum: state => state.user.userNum,
  //   userDepartment: state => state.user.userDepartment,
  //   plateId: state => {
  //     let arr = []
  //     arr[0] = state.user.plateId
  //     return arr
  //   },
  //   departmentName: state => state.user.departmentName,
  //   departmentId: state => state.user.departmentId
  // },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
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
    }
  }
}

export default user
