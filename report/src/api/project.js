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
  },
  // 表16 项目检测实验费用统计表
  addTable16 (data) {
    return axios.post('/insertTable16', data)
  },
  getTable16 (data) {
    return axios.get('/selectTable16', {
      params: data
    })
  },
  updateTable16 (data) {
    return axios.post('/updateTable16', data)
  },
  deleteTable16 (data) {
    return axios.get('/delTable16', {
      params: data
    })
  },
  // 表17 项目管理人员工资统计表
  addTable17 (data) {
    return axios.post('/insertTable17', data)
  },
  getTable17 (data) {
    return axios.get('/selectTable17', {
      params: data
    })
  },
  updateTable17 (data) {
    return axios.post('/updateTable17', data)
  },
  deleteTable17 (data) {
    return axios.get('/delTable17', {
      params: data
    })
  },
  // 表18 项目经营费用统计表
  addTable18 (data) {
    return axios.post('/insertTable18', data)
  },
  getTable18 (data) {
    return axios.get('/selectTable18', {
      params: data
    })
  },
  updateTable18 (data) {
    return axios.post('/updateTable18', data)
  },
  deleteTable18 (data) {
    return axios.get('/delTable18', {
      params: data
    })
  },
  // 表19 项目临时设施成本统计表
  addTable19 (data) {
    return axios.post('/insertTable19', data)
  },
  getTable19 (data) {
    return axios.get('/selectTable19', {
      params: data
    })
  },
  updateTable19 (data) {
    return axios.post('/updateTable19', data)
  },
  deleteTable19 (data) {
    return axios.get('/delTable19', {
      params: data
    })
  },
  // 表20 项目临时设施人工费明细统计表
  addTable20 (data) {
    return axios.post('/insertTable20', data)
  },
  getTable20 (data) {
    return axios.get('/selectTable20', {
      params: data
    })
  },
  updateTable20 (data) {
    return axios.post('/updateTable20', data)
  },
  deleteTable20 (data) {
    return axios.get('/delTable20', {
      params: data
    })
  },
  // 表21 项目临时设施、场地等材料费明细统计表
  addTable21 (data) {
    return axios.post('/insertTable21', data)
  },
  getTable21 (data) {
    return axios.get('/selectTable21', {
      params: data
    })
  },
  updateTable21 (data) {
    return axios.post('/updateTable21', data)
  },
  deleteTable21 (data) {
    return axios.get('/delTable21', {
      params: data
    })
  },
  // 表22 项目自行完成总产值与相应的成本对比统计表
  addTable22 (data) {
    return axios.post('/insertTable22', data)
  },
  getTable22 (data) {
    return axios.get('/selectTable22', {
      params: data
    })
  },
  updateTable22 (data) {
    return axios.post('/updateTable22', data)
  },
  deleteTable22 (data) {
    return axios.get('/delTable22', {
      params: data
    })
  },
  // 表23 项目各工种每平方米单价统计表
  addTable23 (data) {
    return axios.post('/insertTable23', data)
  },
  getTable23 (data) {
    return axios.get('/selectTable23', {
      params: data
    })
  },
  updateTable23 (data) {
    return axios.post('/updateTable23', data)
  },
  deleteTable23 (data) {
    return axios.get('/delTable23', {
      params: data
    })
  },
  // 表二
  // 获取项目汇总的类型名称
  getOptions () {
    return axios.get('/selectOptions')
  },
  // 获取汇总部分统计值
  getSummary (data) {
    return axios.get('/selectSummary', {
      params: data
    })
  },
  // 新增人工费
  addTable2option1 (data) {
    return axios.post('/insertTable2Option1', data)
  },
  // 新增材料费
  addTable2option2 (data) {
    return axios.post('/insertTable2Option2', data)
  },
  // 新增水电费
  addTable2option3 (data) {
    return axios.post('/insertTable2Option3', data)
  },
  // 新增机械费
  addTable2option4 (data) {
    return axios.post('/insertTable2Option4', data)
  },
  // 新增分包工程
  addTable2option5 (data) {
    return axios.post('/insertTable2Option5', data)
  },
  // 新增管理费
  addTable2option6 (data) {
    return axios.post('/insertTable2Option6', data)
  },
  // 新增规费
  addTable2option7 (data) {
    return axios.post('/insertTable2Option7', data)
  },
  // 新增安全文明费
  addTable2option8 (data) {
    return axios.post('/insertTable2Option8', data)
  },
  // 新增临时设施费
  addTable2option9 (data) {
    return axios.post('/insertTable2Option9', data)
  },
  // 新增税费
  addTable2option10 (data) {
    return axios.post('/insertTable2Option10', data)
  }
}

export default project
