import axios from '@/utils/request'

const user = {
  // 登录
  login (data) {
    return axios.post('/login', data)
  },
  // 登出
  logout () {
    return axios.get('/logout')
  }
}

export default user
