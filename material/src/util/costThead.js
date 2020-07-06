const thead = {
  // 成本汇总表
  summarySheet: [
    { label: '分类', prop: 'staffName' },
    { label: '项目', prop: 'providentFundEnterprise' },
    { label: '金额', prop: 'providentFundPersonal' }
  ],
  // 管理费用明细
  manageFee: [
    { label: '费用类别', prop: 'staffName' },
    { label: '项目', prop: 'providentFundEnterprise' },
    { label: '金额', prop: 'providentFundPersonal' },
    { label: '备注', prop: 'remark' }
  ],
  // 陶粒板产品表
  ceramsitePlate: [
    { label: '项目', prop: 'hydropowerDate' },
    { label: '类别', prop: 'receivingUnit' },
    { label: '供应商', prop: 'hydropowerProject' },
    { label: '品名', prop: 'hydropowerUnit' },
    { label: '规格', prop: 'hydropowerDosage' },
    { label: '单位', prop: 'hydropowerDosage' },
    {
      label: '本月消耗',
      children: [
        { label: '数量', prop: 'hydropowerPrice' },
        { label: '单价', prop: 'hydropowerPrice' },
        { label: '金额', prop: 'hydropowerAmount' }
      ]
    }
  ],
  // 路牙、盖板产品表
  roadBoard: [
    { label: '项目', prop: 'hydropowerDate' },
    { label: '类别', prop: 'receivingUnit' },
    { label: '供应商', prop: 'hydropowerProject' },
    { label: '品名', prop: 'hydropowerUnit' },
    { label: '规格', prop: 'hydropowerDosage' },
    { label: '单位', prop: 'hydropowerDosage' },
    {
      label: '本月消耗',
      children: [
        { label: '数量', prop: 'hydropowerPrice' },
        { label: '单价', prop: 'hydropowerPrice' },
        { label: '金额', prop: 'hydropowerAmount' }
      ]
    }
  ],
  // 固定资产投入
  fixed: [
    { label: '日期', prop: 'fixAssetDate' },
    { label: '收款单位', prop: 'beneficiary' },
    { label: '设备名称', prop: 'equipmentName' },
    { label: '合同金额（元）', prop: 'contractAmount' },
    { label: '累计付款（元）', prop: 'cumulativePayment' },
    { label: '上期付款（元）', prop: 'lastPayment' },
    { label: '本期付款（元）', prop: 'currentPayment' },
    { label: '发票号', prop: 'receiptNumber' },
    {
      label: '发票金额',
      children: [
        { label: '金额', prop: 'amountReceipt' },
        { label: '税金', prop: 'taxReceipt' },
        { label: '税率', prop: 'taxRate' }
      ]
    },
    { label: '备注', prop: 'remark' }
  ],
  // 车间制造费用明细表 复杂
  workshop: [
    { label: '类别', prop: 'staffName' },
    { label: '明细', prop: 'providentFundEnterprise' },
    { label: '金额', prop: 'providentFundPersonal' }
  ],
  // 产品库存表
  productStore: [
    { label: '产品大类', prop: 'productCategory' },
    { label: '具体品名', prop: 'specificProductName' },
    { label: '规格', prop: 'specificSpecification' },
    {
      label: '上期库存',
      children: [
        { label: '块数', prop: 'blockPast' },
        { label: '面积（㎡）', prop: 'areaPast' },
        { label: '金额', prop: 'amountPast' }
      ]
    }, {
      label: '本期入库',
      children: [
        { label: '块数', prop: 'blockCurrent' },
        { label: '面积（㎡）', prop: 'areaCurrent' },
        { label: '成本单价', prop: 'priceCurrent' },
        { label: '金额', prop: 'amountCurrent' }
      ]
    }, {
      label: '本期销售',
      children: [
        { label: '块数', prop: 'blockSale' },
        { label: '面积（㎡）', prop: 'areaSale' },
        { label: '成本单价', prop: 'priceSale' },
        { label: '金额', prop: 'amountSale' }
      ]
    }, {
      label: '本期累计库存',
      children: [
        { label: '块数', prop: 'blockInventory' },
        { label: '面积（㎡）', prop: 'areaInventory' },
        { label: '金额', prop: 'amountInventory' }
      ]
    },
    { label: '备注', prop: 'remark' }
  ],
  // 原材料库存表
  materialStore: [
    { label: '产品大类', prop: 'rawMaterialCategory' },
    { label: '具体品名', prop: 'specificProductName' },
    { label: '单位', prop: 'materialUnit' },
    {
      label: '上期库存',
      children: [
        { label: '数量', prop: 'quantityLast' },
        { label: '余额', prop: 'amountLast' }
      ]
    }, {
      label: '本期采购',
      children: [
        { label: '数量', prop: 'quantityPurchase' },
        {
          label: '发票已到',
          children: [
            { label: '金额', prop: 'amountPurchaseReceipt' }
          ]
        },
        {
          label: '发票未到',
          children: [
            { label: '金额', prop: 'amountPurchase' }
          ]
        }
      ]
    }, {
      label: '本期领用',
      children: [
        {
          label: '陶粒板',
          children: [
            { label: '数量', prop: 'quantityUse' },
            { label: '金额', prop: 'amountUse' }
          ]
        }
      ]
    }, {
      label: '本期库存',
      children: [
        { label: '数量', prop: 'quantityInventory' },
        { label: '金额', prop: 'amountInventory' }
      ]
    }
  ]
}

export default thead
