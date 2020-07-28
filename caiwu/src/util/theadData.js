const thead = {
	invoice: [
		{ label: '项目', prop: 'projectName' },
		{ label: '项目号', prop: 'projectNumber' },
		{ label: '开票日期', prop: 'invoiceDate' },
		{ label: '凭证号', prop: 'voucherNumber' },
		{ label: '开票金额', prop: 'invoiceAmount' },
		{ label: '税率', prop: 'taxRate' },
		{ label: '总金额', prop: 'totalAmount' }
	],
	// 收款
	receipt: [
		{ label: '项目', prop: 'projectName' },
		{ label: '项目号', prop: 'projectNumber' },
		{ label: '开票日期', prop: 'receiptDate' },
		{ label: '凭证号', prop: 'voucherNumber' },
		{ label: '收款金额', prop: 'receiptAmount' },
		{ label: '税率', prop: 'taxRate' },
		{ label: '总金额', prop: 'totalAmount' }
	],
	contract: [
		{ label: '项目', prop: 'projectName' },
		{ label: '项目号', prop: 'projectNumber' },
		{ label: '甲方单位名称', prop: 'partyAId' },
		{ label: '合同价款', prop: 'contractPrice' },
		{ label: '结算价款', prop: 'settlementPrice' },
		{ label: '累计产值', prop: 'cumulativeOutputValue' }
	],
	summary: [
		{ label: '项目', prop: 'materialQuantity' },
		{ label: '项目号', prop: 'materialQuantity' },
		{ label: '甲方单位名称', prop: 'materialStatisticDate' },
		{ label: '合同价', prop: 'rawMaterialCategory' },
		{ label: '上报结算价', prop: 'specificProductName' },
		{ label: '累计产值', prop: 'materialQuantity' },
		{ label: '开票合计', prop: 'materialQuantity' },
		{ label: '已收款合计', prop: 'materialQuantity' }
	]
}

export default thead
