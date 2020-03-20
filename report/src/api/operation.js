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
  getGroupSummary (data) {
    return axios.get('/selectGroupSummary', {
      params: data
    })
  },
  // 科技
  addTech (data) {
    return axios.post('/insertTechForm', data)
  },
  getTech (data) {
    return axios.get('/selectTechform', {
      params: data
    })
  },
  updateTech (data) {
    return axios.post('/updateTechForm', data)
  },
  getTechSummary (data) {
    return axios.get('/selectTechSummary', {
      params: data
    })
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
  getBuildingSummary (data) {
    return axios.get('/selectBuildingSummary', {
      params: data
    })
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
  },
  getSportSummary (data) {
    return axios.get('/selectSportSummary', {
      params: data
    })
  }
}

export default operation
