import axios from '@/util/request'

const sale = {
  // 返回项目名称
  getProjects () {
    return axios.get('/projectCode')
  },
  addProject (data) {
    return axios.post('/insertProject', data)
  },
  updateProject (data) {
    return axios.post('/updateProject', data)
  },
  delProject (data) {
    return axios.get('/delProject', {
      params: data
    })
  },
  // 返回品名+规格
  getCommodities () {
    return axios.get('/commodityCode')
  },
  // 返回客户/承运商信息
  getClients () {
    return axios.get('/clientCode')
  },
  addClient (data) {
    return axios.post('/insertClient', data)
  },
  updateClient (data) {
    return axios.post('/updateClient', data)
  },
  delClient (data) {
    return axios.get('/delClient', {
      params: data
    })
  },
  // 增删改查sale
  addSale (data) {
    return axios.post('/insertSaleTable', data)
  },
  getSales (data) {
    return axios.get('/saleList', {
      params: data
    })
  },
  delSale (data) {
    return axios.get('/delSale', {
      params: data
    })
  },
  // 增删改查sale
  addFreight (data) {
    return axios.post('/insertFreightTable', data)
  },
  getFreights (data) {
    return axios.get('/freightList', {
      params: data
    })
  },
  delFreight (data) {
    return axios.get('/delFreight', {
      params: data
    })
  },
  // 生产记录
  addRecord (data) {
    return axios.post('/insertProduceTable', data)
  },
  getRecord (data) {
    return axios.get('/produceList', {
      params: data
    })
  },
  delRecord (data) {
    return axios.get('/delProduce', {
      params: data
    })
  },
  // 生产销售汇总
  getSummary (data) {
    return axios.get('/produceInventory', {
      params: data
    })
  }
}

export default sale
