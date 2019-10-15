import axios from '@/utils/request'

const operation = {
  // 集团
  addGroup (data) {
    return axios.post('/insertGroupForm', data)
  },
  getGroup (data) {
    return axios.get('/selectgroupform', {
      params: data
    })
  },
  updateGroup (data) {
    return axios.post('/updateGroupForm', data)
  },
  // 建筑
  addBuilding (data) {
    return axios.post('/insertBuildingForm', data)
  },
  getBuilding (data) {
    return axios.get('/selectbuildingform', {
      params: data
    })
  },
  updateBuilding (data) {
    return axios.post('/updateBuildingForm', data)
  },
  // 文体
  addSport (data) {
    return axios.post('/insertSportForm', data)
  },
  getSport (data) {
    return axios.get('/selectsportform', {
      params: data
    })
  },
  addActivity (data) {
    return axios.post('/insertActivityForm', data)
  },
  getActivity (data) {
    return axios.get('/selectActivityForm', {
      params: data
    })
  },
  updateSport (data) {
    return axios.post('/updateSportForm', data)
  },
  updateActivity (data) {
    return axios.post('/updateActivityForm', data)
  }
}

export default operation
