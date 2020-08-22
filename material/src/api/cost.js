import axios from '@/util/request'

const cost = {
  // 成本汇总表
  getSummarySheet (data) {
    return axios.get('/costSummaryList', {
      params: data
    })
  },
  // 分类
  getSort () {
    return axios.get('/costSort')
  },
  addSummarySheet (data) {
    return axios.post('/insertCostSummary', data)
  },
  delSummarySheet (data) {
    return axios.get('/delCostSummary', {
      params: data
    })
  },
  // 管理费用
  getManageFee (data) {
    return axios.get('/costDetailList', {
      params: data
    })
  },
  addManageFee (data) {
    return axios.post('/insertCostDetail', data)
  },
  delManageFee (data) {
    return axios.get('/delCostDetail', {
      params: data
    })
  },
  // 陶粒板产品成本表
  getCeramsitePlate (data) {
    return axios.get('/ceramsiteProductCost', {
      params: data
    })
  },
  // 固定资产成本
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
  // 产品销售利润
  getSaleProfit (data) {
    return axios.get('/fixAssetList', {
      params: data
    })
  },
  // 车间明细
  getWorkshop (data) {
    return axios.get('/costDetailList', {
      params: data
    })
  },
  addWorkshop (data) {
    return axios.post('/insertCostDetail', data)
  },
  delWorkshop (data) {
    return axios.get('/delCostDetail', {
      params: data
    })
  },
  // 产品库存表
  getProductStorePre (data) {
    return axios.get('/returnProduceInventory', {
      params: data
    })
  },
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
