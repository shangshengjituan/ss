import axios from '@/utils/request'

const user = {
  // 登录
  login (data) {
    return axios.post('/login', data)
  },
  allgroup (data) {
    return axios.get('/selectgroupform', {
      params: data
    })
  }
}

export default user
