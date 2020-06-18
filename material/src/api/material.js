import axios from '@/util/request'

const material = {
  // 返回材料
  getMaterials () {
    return axios.get('/materialCategory')
  },
  // 返回材料+品名
  getMaterialType () {
    return axios.get('/materialType')
  },
  // 返回采购领用
  getKinds () {
    return axios.get('/purchaseOrUser')
  },
  // 返回供应商信息
  getProviders () {
    return axios.get('/supplierType')
  },
  // 增删改查
  addItem (data) {
    return axios.post('/insertMaterialTable', data)
  },
  getList (data) {
    return axios.get('/materialStatisticList', {
      params: data
    })
  },
  delItem (data) {
    return axios.get('/delMaterialStatistic', {
      params: data
    })
  }
}

export default material
