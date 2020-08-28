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
  // 返回材料用途
  getMaterialUses () {
    return axios.get('/materialUseList')
  },
  addMaterialUse (data) {
    return axios.post('/insertMaterialUse', data)
  },
  updateMaterialUse (data) {
    return axios.post('/updateMaterialUse', data)
  },
  delMaterialUse (data) {
    return axios.get('/delMaterialUse', {
      params: data
    })
  },
  // 返回供应商信息
  getProviders () {
    return axios.get('/supplierType')
  },
  // 增删改查
  addItem (data) {
    return axios.post('/insertMaterialTable', data)
  },
  // 普通材料
  getList (data) {
    return axios.get('/materialStatisticList', {
      params: data
    })
  },
  // 外加剂
  getAddList (data) {
    return axios.get('/additiveStatisticsList', {
      params: data
    })
  },
  delItem (data) {
    return axios.get('/delMaterialStatistic', {
      params: data
    })
  },
  // 实际量
  getSubtotal (data) {
    return axios.get('/useSubtotal', {
      params: data
    })
  },
  addRealItem (data) {
    return axios.post('/insertInventoryTable', data)
  },
  addTrigger (data) {
    return axios.get('/updateInventory', {
      params: data
    })
  },
  delRealItem (data) {
    return axios.get('/delInventory', {
      params: data
    })
  },
  // 辅材
  getUseList () {
    return axios.get('/useList')
  },
  addAuxiliaryItem (data) {
    return axios.post('/insertAuxiliaryMaterial', data)
  },
  getUsages () {
    return axios.get('/useDetail')
  },
  getAuxiliaryList (data) {
    return axios.get('/auxiliaryMaterialList', {
      params: data
    })
  },
  delAuxiliaryItem (data) {
    return axios.get('/delAuxiliaryMaterial', {
      params: data
    })
  }
}

export default material
