import axios from '@/util/request'

const sale = {
  getProjects () {
    return axios.get('/projectCode')
  },
  getCategories () {
    return axios.get('/commodityCode')
  },
  getClients () {
    return axios.get('/clientCode')
  },
  getSales (data) {
    return axios.get('/saleList', {
      params: data
    })
  },
  addSale (data) {
    return axios.post('/insertSaleTable', data)
  },
  delSale (data) {
    return axios.get('/delSale', {
      params: data
    })
  }
}

export default sale
