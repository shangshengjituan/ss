import axios from '../util/request'

const api = {
	// 项目
	getProjects () {
		return axios.get('/projectList')
	},
	getProjectsAndAll () {
		return axios.get('/projectLists')
	},
	addProject (data) {
		return axios.post('/insertProjectCode', data)
	},
	modifyProject (data) {
		return axios.post('/updateProjectCode', data)
	},
	deleteProject (data) {
		return axios.get('/delProject', {
			params: data
		})
	},
	// 甲方
	getParties () {
		return axios.get('/partyAList')
	},
	addParty (data) {
		return axios.post('/insertPartyA', data)
	},
	modifyParty (data) {
		return axios.post('/updatePartyA', data)
	},
	deleteParty (data) {
		return axios.get('/delPartyA', {
			params: data
		})
	},
	// 发票
	addInvoice (data) {
		return axios.post('/insertInvoiceTable', data)
	},
	getInvoices (data) {
		return axios.get('/invoiceTableList', {
			params: data
		})
	},
	modifyInvoice (data) {
		return axios.post('/updateInvoiceTable', data)
	},
	deleteInvoice (data) {
		return axios.get('/delInvoiceTable', {
			params: data
		})
	},
	// 收款
	addReceipt (data) {
		return axios.post('/insertReceiptTable', data)
	},
	getReceipts (data) {
		return axios.get('/receiptTableList', {
			params: data
		})
	},
	modifyReceipt (data) {
		return axios.post('/updateReceiptTable', data)
	},
	deleteReceipt (data) {
		return axios.get('/delReceiptTable', {
			params: data
		})
	},
	// 合同价款
	addContract (data) {
		return axios.post('/insertContractTable', data)
	},
	getContracts (data) {
		return axios.get('/contractTableList', {
			params: data
		})
	},
	modifyContract (data) {
		return axios.post('/updateContractTable', data)
	},
	deleteContract (data) {
		return axios.get('/delContractTable', {
			params: data
		})
	},
	// 汇总
	getSummary (data) {
		return axios.get('/statisticList', {
			params: data
		})
	}
}

export default api
