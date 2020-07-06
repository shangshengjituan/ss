import axios from '@/util/request'

const cost = {
  // 陶粒板产品成本表
  getCeramsitePlate (data) {
    return axios.get('/ceramsiteProductCost', {
      params: data
    })
  },
  // 固定资产投入
  addFixedItem (data) {
    return axios.post('/insertFixAssetTable', data)
  },
  getFixedList (data) {
    return axios.get('/fixAssetList', {
      params: data
    })
  },
  delFixedItem (data) {
    return axios.get('/delFixAsset', {
      params: data
    })
  },
  // 产品库存表
  getProductCate () {
    return axios.get('/productCategoryList')
  },
  addProductStoreItem (data) {
    return axios.post('/insertProductInventoryTable', data)
  },
  getProductStoreList (data) {
    return axios.get('/productInventoryList', {
      params: data
    })
  },
  delProductStoreItem (data) {
    return axios.get('/delProductInventory', {
      params: data
    })
  },
  // 原材料库存表
  getMaterialStore (data) {
    return axios.get('/selectMaterialInventory', {
      params: data
    })
  }
}

export default cost
