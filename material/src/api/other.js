import axios from '@/util/request'
const other = {
  addUser  (data) {
    return axios.post('/insertWageTable', data)
  }
}

export default other
