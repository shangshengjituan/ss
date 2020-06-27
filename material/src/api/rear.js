import axios from '@/util/request'

const rear = {
  // 1
  addWageItem (data) {
    return axios.post('/insertWageTable', data)
  },
  getWageList (data) {
    return axios.get('/wageList', {
      params: data
    })
  },
  delWageItem (data) {
    return axios.get('/delWage', {
      params: data
    })
  },
  // 2
  addSSFundItem (data) {
    return axios.post('/insertSocialSecurityTable', data)
  },
  getSSFundList (data) {
    return axios.get('/socialSecurityList', {
      params: data
    })
  },
  delSSFundItem (data) {
    return axios.get('/delSocialSecurity', {
      params: data
    })
  },
  // 3
  addUtilityItem (data) {
    return axios.post('/insertHydropowerTable', data)
  },
  getUtilityList (data) {
    return axios.get('/hydropowerList', {
      params: data
    })
  },
  delUtilityItem (data) {
    return axios.get('/delHydropower', {
      params: data
    })
  },
  // 4
  addTestingItem (data) {
    return axios.post('/insertDetectTable', data)
  },
  getTestingList (data) {
    return axios.get('/detectList', {
      params: data
    })
  },
  delTestingItem (data) {
    return axios.get('/delDetect', {
      params: data
    })
  },
  // 5
  addEntertainItem (data) {
    return axios.post('/insertEntertainTable', data)
  },
  getEntertainList (data) {
    return axios.get('/entertainList', {
      params: data
    })
  },
  delEntertainItem (data) {
    return axios.get('/delEntertain', {
      params: data
    })
  },
  // 6
  addOfficeItem (data) {
    return axios.post('/insertOfficeTable', data)
  },
  getOfficeList (data) {
    return axios.get('/officeList', {
      params: data
    })
  },
  delOfficeItem (data) {
    return axios.get('/delOffice', {
      params: data
    })
  },
  // 7
  addMealItem (data) {
    return axios.post('/insertOfficeTable', data)
  },
  getMealList (data) {
    return axios.get('/officeList', {
      params: data
    })
  },
  delMealItem (data) {
    return axios.get('/delOffice', {
      params: data
    })
  }
}

export default rear
