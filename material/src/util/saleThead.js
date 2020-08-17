const thead = {
  // 销售收入
  sale: [
    { label: '日期', prop: 'saleDate' },
    { label: '项目名称', prop: 'projectName' },
    { label: '品名', prop: 'commodityName' },
    { label: '规格', prop: 'commoditySize' },
    { label: '单位', prop: 'unit' },
    { label: '数量', prop: 'saleQuantity' },
    { label: '面积（㎡）', prop: 'saleArea' },
    { label: '销售单价', prop: 'salePrice' },
    { label: '金额（含税）', prop: 'saleAmountTax' },
    { label: '金额（不含税）', prop: 'saleAmount' },
    { label: '税额', prop: 'tax' },
    { label: '是否回款', prop: 'hitMoney' },
    { label: '已开发票号', prop: 'receiptNumber' },
    { label: '客户', prop: 'clientName' },
    { label: '备注', prop: 'remark' }
  ],
  // 陶粒版生产出版记录
  record: [
    { label: '项目', prop: 'projectName' },
    { label: '品名', prop: 'commodityName' },
    {
      label: '浇注',
      children: [
        { label: '规格', prop: 'commoditySize' },
        { label: '板厚', prop: 'thickness' },
        { label: '日期', prop: 'pouringDate' },
        { label: '数量', prop: 'pouringQuantity' },
        { label: '面积', prop: 'pouringArea' }
      ]
    }, {
      label: '入库',
      children: [
        { label: '日期', prop: 'warehousingDate' },
        { label: '数量', prop: 'warehousingQuantity' },
        { label: '面积', prop: 'warehousingArea' }
      ]
    },
    { label: '生产模数', prop: 'produceModule' },
    { label: '备注', prop: 'remark' }
  ],
  // 生产销售汇总
  summary: [
    { label: '品名', prop: 'commodityName' },
    { label: '规格', prop: 'commoditySize' },
    { label: '本期入库', prop: 'warehousingQuantity' },
    { label: '本期销售', prop: 'saleQuantity' },
    { label: '本期剩余', prop: 'surplusQuantity' }
  ]
}

export default thead
