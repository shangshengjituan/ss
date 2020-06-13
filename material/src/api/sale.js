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
  getSales () {
    return axios.get('/saleList')
  },
  addGroup (data) {
    return axios.post('/insertGroupForm', data)
  },
  getGroup (data) {
    return axios.get('/selectgroupform', {
      params: data
    })
  },
  getGroupSummary () {
    return axios.get('/selectGroupSummary')
  }
}

export default sale
