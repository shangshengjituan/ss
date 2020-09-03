const thead = {
  // 发票表
  invoice: [
    { label: '供应商', prop: 'supplierName' },
    { label: '合同金额', prop: 'contractAmount' },
    { label: '发票号', prop: 'invoiceNumber' },
    { label: '发票日期', prop: 'invoiceDate' },
    { label: '金额（含税）', prop: 'invoiceAmountTax' },
    { label: '金额（不含税）', prop: 'invoiceAmount' },
    { label: '税额', prop: 'tax' }
  ],
  // 合同
  contract: [
    { label: '供应商', prop: 'supplierName' },
    { label: '签订日期', prop: 'contractDate' },
    { label: '金额', prop: 'contractAmount' },
    { label: '税率', prop: 'taxRate' },
    { label: '合同说明', prop: 'contractDirection' },
    { label: '发票金额', prop: 'invoiceAmount' },
    { label: '付款金额', prop: 'paymentAmount' }
  ],
  // 实际付款表
  payment: [
    { label: '供应商', prop: 'supplierName' },
    { label: '合同金额', prop: 'contractAmount' },
    { label: '发票号', prop: 'invoiceNumber' },
    { label: '付款日期', prop: 'paymentDate' },
    { label: '付款金额', prop: 'paymentAmount' },
    { label: '备注', prop: 'remark' }
  ]
}

export default thead
