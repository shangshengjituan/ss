import axios from '@/util/request'

const cost = {
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

export default cost
