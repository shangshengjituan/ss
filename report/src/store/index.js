import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    user: {},
    name: '',
    role: '',
    department: ''
  },
  getters: {},
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_DEPARTMENT: (state, department) => {
      state.department = department
    }
  },
  actions: {
  }
})

export default store
