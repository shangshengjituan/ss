import axios from '@/util/request'

const invoice = {
  // 合同id
  getContractIds () {
    return axios.get('/contractList')
  },
  getContracts (data) {
    return axios.get('/contractListSummary', {
      params: data
    })
  },
  addContract (data) {
    return axios.post('/insertContractTable', data)
  },
  // 发票
  getInvoices (data) {
    return axios.get('/invoiceList', {
      params: data
    })
  },
  addInvoice (data) {
    return axios.post('/insertInvoiceTable', data)
  },
  // 实际付款
  addPayment (data) {
    return axios.post('/insertPaymentTable', data)
  },
  getPayments (data) {
    return axios.get('/paymentList', {
      params: data
    })
  },
  updateClient (data) {
    return axios.post('/updateClient', data)
  },
  delClient (data) {
    return axios.get('/delClient', {
      params: data
    })
  }
}

export default invoice
