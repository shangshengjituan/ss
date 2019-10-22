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
  // 表3 新增人工费明细表
  addTable3 (data) {
    return axios.post('/insertTable3', data)
  },
  getTable3 (data) {
    return axios.get('/selectTable3', {
      params: data
    })
  }
}

export default project
