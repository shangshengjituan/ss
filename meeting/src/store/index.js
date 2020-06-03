import Vue from 'vue'
import Vuex from 'vuex'
import $api from '../api'
import Notify from 'vant/lib/notify'
import 'vant/lib/notify/style'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: '',
    departments: []
  },
  getters: {
    token: state => state.token,
    userNum: state => state.user.userNum,
    departments: state => state.user.departments
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_DEPARTMENTS: (state, departments) => {
      state.departments = departments
    }
  },
  actions: {
    login ({ commit, dispatch, getters }, userInfo) {
      return new Promise((resolve, reject) => {
        $api.login(userInfo).then(rsp => {
          console.log(JSON.stringify(rsp))
          if (rsp.result === 200) {
            commit('SET_USER', rsp.user)
            commit('SET_TOKEN', rsp.token)
            Notify({ type: 'success', duration: 1000, message: '提示：登录成功！' })
            resolve()
          } else {
            Notify('提示：' + rsp.resultText)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        $api.logout().then(rsp => {
          commit('SET_USER', {})
          commit('SET_TOKEN', '')
          Notify({ type: 'success', message: '提示：退出成功！' })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getDepartments ({ commit }) {
      $api.getDepartments().then(rsp => {
        commit('SET_DEPARTMENTS', rsp.departments)
      })
    }
  }
})
