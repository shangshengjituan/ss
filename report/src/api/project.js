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
  // 表6 材料费明细统计表
  addTable6 (data) {
    return axios.post('/insertTable6', data)
  },
  getTable6 (data) {
    return axios.get('/selectTable6', {
      params: data
    })
  },
  updateTable6 (data) {
    return axios.post('/updateTable6', data)
  },
  deleteTable6 (data) {
    return axios.get('/delTable6', {
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
  },
  // 表8 水电费所用情况统计
  addTable8 (data) {
    return axios.post('/insertTable8', data)
  },
  getTable8 (data) {
    return axios.get('/selectTable8', {
      params: data
    })
  },
  updateTable8 (data) {
    return axios.post('/updateTable8', data)
  },
  deleteTable8 (data) {
    return axios.get('/delTable8', {
      params: data
    })
  },
  // 表9 机械设备费用明细表
  addTable9 (data) {
    return axios.post('/insertTable9', data)
  },
  getTable9 (data) {
    return axios.get('/selectTable9', {
      params: data
    })
  },
  updateTable9 (data) {
    return axios.post('/updateTable9', data)
  },
  deleteTable9 (data) {
    return axios.get('/delTable9', {
      params: data
    })
  },
  // 表10 收取管理费分包工程成本统计表
  addTable10 (data) {
    return axios.post('/insertTable10', data)
  },
  getTable10 (data) {
    return axios.get('/selectTable10', {
      params: data
    })
  },
  updateTable10 (data) {
    return axios.post('/updateTable10', data)
  },
  deleteTable10 (data) {
    return axios.get('/delTable10', {
      params: data
    })
  },
  // 表11 收取管理费分包工程产量统计表
  addTable11 (data) {
    return axios.post('/insertTable11', data)
  },
  getTable11 (data) {
    return axios.get('/selectTable11', {
      params: data
    })
  },
  updateTable11 (data) {
    return axios.post('/updateTable11', data)
  },
  deleteTable11 (data) {
    return axios.get('/delTable11', {
      params: data
    })
  },
  // 表12 单价分包工程成本统计表
  addTable12 (data) {
    return axios.post('/insertTable12', data)
  },
  getTable12 (data) {
    return axios.get('/selectTable12', {
      params: data
    })
  },
  updateTable12 (data) {
    return axios.post('/updateTable12', data)
  },
  deleteTable12 (data) {
    return axios.get('/delTable12', {
      params: data
    })
  },
  // 表13 单价分包工程成本统计明细表
  addTable13 (data) {
    return axios.post('/insertTable13', data)
  },
  getTable13 (data) {
    return axios.get('/selectTable13', {
      params: data
    })
  },
  updateTable13 (data) {
    return axios.post('/updateTable13', data)
  },
  deleteTable13 (data) {
    return axios.get('/delTable13', {
      params: data
    })
  },
  // 表14 单价分包工程成本统计明细表
  addTable14 (data) {
    return axios.post('/insertTable14', data)
  },
  getTable14 (data) {
    return axios.get('/selectTable14', {
      params: data
    })
  },
  updateTable14 (data) {
    return axios.post('/updateTable14', data)
  },
  deleteTable14 (data) {
    return axios.get('/delTable14', {
      params: data
    })
  },
  // 表15 项目管理费用统计表
  addTable15 (data) {
    return axios.post('/insertTable15', data)
  },
  getTable15 (data) {
    return axios.get('/selectTable15', {
      params: data
    })
  },
  updateTable15 (data) {
    return axios.post('/updateTable15', data)
  },
  deleteTable15 (data) {
    return axios.get('/delTable15', {
      params: data
    })
  }
}

export default project
