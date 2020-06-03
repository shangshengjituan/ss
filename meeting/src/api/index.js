import axios from '../utils/request'

const api = {
  // 管理员
  login (data) {
    return axios.post('/login', data)
  },
  logout () {
    return axios.get('/logout')
  },
  updatePwd (data) {
    return axios.post('/updatePwd', data)
  },
  // 部门 员工
  getDepartments () {
    return axios.get('/allDepartment')
  },
  getDepStaff () {
    return axios.get('/selectStaff')
  },
  // 成员
  addStaff (data) {
    return axios.post('/insertStaff', data)
  },
  updateStaff (data) {
    return axios.get('/updateDepartment', {
      params: data
    })
  },
  deleteStaff (data) {
    return axios.get('/delStaff', {
      params: data
    })
  },
  // 根据部门查询员工
  getStaff (data) {
    return axios.get('/selectAllStaff', {
      params: data
    })
  },
  // 系统用户
  addUser (data) {
    return axios.post('/register', data)
  },
  getUsers () {
    return axios.get('/selectAllUser')
  },
  updateUserPwd (data) {
    return axios.post('/updateUserPwd', data)
  },
  deleteUser (data) {
    return axios.get('/delUser', {
      params: data
    })
  },
  // 会议
  addMeeting (data) {
    return axios.post('/insertConference', data)
  },
  getMeetings (data) {
    return axios.get('/conferenceList', {
      params: data
    })
  },
  getMeeting (data) {
    return axios.get('/conferenceDetail', {
      params: data
    })
  },
  filterMeetings (data) {
    return axios.get('/selectConference', {
      params: data
    })
  },
  updateMeeting (data) {
    return axios.post('/updateConference', data)
  },
  finishMeeting (data) {
    return axios.get('/updateStatus', {
      params: data
    })
  },
  deleteMeeting (data) {
    return axios.get('/delConference', {
      params: data
    })
  }
}

export default api
