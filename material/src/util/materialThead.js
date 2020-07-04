const thead = {
  // 其他
  normal: [
    { label: '#', prop: 'purchaseUser' },
    { label: '日期', prop: 'materialStatisticDate' },
    { label: '原材料大类', prop: 'rawMaterialCategory' },
    { label: '具体品名', prop: 'specificProductName' },
    { label: '数量', prop: 'materialQuantity' },
    { label: '含税金额', prop: 'materialAmountTax' },
    { label: '不含税金额', prop: 'materialAmount' },
    { label: '税额', prop: 'tax' }],
  // 辅材
  auxiliary: [
    { label: '用途', prop: 'useSort' },
    { label: '详细用途', prop: 'useDetail' },
    { label: '含税金额', prop: 'materialAmountTax' },
    { label: '不含税金额', prop: 'materialAmount' },
    { label: '税额', prop: 'tax' }
  ]
}

export default thead
