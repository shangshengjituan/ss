import axios from '@/utils/request'

const project = {
  // 查询所有项目
  getProjectList (data) {
    return axios.get('/selectProject', {
      params: data
    })
  },
  addProjectItem (data) {
    return axios.get('/insertProject', {
      params: data
    })
  },
  // 查询工作明细
  getWorkList () {
    return axios.get('/selectWorkType')
  },
  addWorkItem (data) {
    return axios.get('/insertWorkType', {
      params: data
    })
  },
  // 表3 人工费
  addTable3 (data) {
    return axios.post('/insertTable3', data)
  },
  getTable3 (data) {
    return axios.get('/selectTable3', {
      params: data
    })
  },
  updateTable3 (data) {
    return axios.post('/updateTable3', data)
  },
  deleteTable3 (data) {
    return axios.get('/delTable3', {
      params: data
    })
  },
  // 表4 人工费明细统计表
  addTable4 (data) {
    return axios.post('/insertTable4', data)
  },
  getTable4 (data) {
    return axios.get('/selectTable4', {
      params: data
    })
  },
  updateTable4 (data) {
    return axios.post('/updateTable4', data)
  },
  deleteTable4 (data) {
    return axios.get('/delTable4', {
      params: data
    })
  },
  // 表5 使用点工统计表
  addTable5 (data) {
    return axios.post('/insertTable5', data)
  },
  getTable5 (data) {
    return axios.get('/selectTable5', {
      params: data
    })
  },
  updateTable5 (data) {
    return axios.post('/updateTable5', data)
  },
  deleteTable5 (data) {
    return axios.get('/delTable5', {
      params: data
    })
  },
  // 表7 调入调出材料费用统计表
  addTable7 (data) {
    return axios.post('/insertTable7', data)
  },
  getTable7 (data) {
    return axios.get('/selectTable7', {
      params: data
    })
  },
  updateTable7 (data) {
    return axios.post('/updateTable7', data)
  },
  deleteTable7 (data) {
    return axios.get('/delTable7', {
      params: data
    })
  }
}

export default project
