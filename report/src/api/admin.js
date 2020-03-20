import axios from '@/utils/request'

const admin = {
  // 查询所有用户
  getUsers () {
    return axios.get('/selectAllUser')
  },
  // 注册用户
  addUser (data) {
    return axios.post('/registerUser', data)
  },
  // 修改用户信息
  updateUser (data) {
    return axios.post('/updateUser', data)
  },
  // 重置用户密码
  updateUserPwd (data) {
    return axios.get('/resetPwd', {
      params: data
    })
  },
  /* ************************************************************* */
  // 查询所有部门
  getDepartments () {
    return axios.get('/selectDepartments')
  },
  // 新增公司/部门
  addDepartment (data) {
    return axios.post('/insertDepartment', data)
  },
  // 修改公司/部门
  updateDepartment (data) {
    return axios.post('/updateDepartment', data)
  },
  /* ************************************************************* */
  // 查询权限
  getAuthority () {
    return axios.get('/selectAuthority')
  },
  // 查询板块
  getPlates () {
    return axios.get('/selectPlate')
  }
}

export default admin
