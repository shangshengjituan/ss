const thead = {
  // 人员工资
  wage: [
    {
      label: '类别',
      prop: 'staffType',
      filter: [{ text: '管理人员', value: '管理人员' }, { text: '职工', value: '职工' }]
    },
    { label: '姓名', prop: 'staffName' },
    {
      label: '工资部分',
      children: [
        { label: '基本工资', prop: 'basicWage' },
        { label: '绩效工资', prop: 'performanceWage' },
        { label: '工作津贴', prop: 'workAllowance' }
      ]
    }, {
      label: '津贴部分',
      children: [
        { label: '工龄', prop: 'seniorityWage' },
        { label: '证书', prop: 'certificateWage' },
        { label: '其他', prop: 'otherWage' }
      ]
    },
    { label: '应付金额', prop: 'amountsPayable' },
    {
      label: '扣款部分（个人承担）',
      children: [
        { label: '社会保险', prop: 'socialInsurance' },
        { label: '大额保险', prop: 'largeInsurance' },
        { label: '公积金', prop: 'providentFund' },
        { label: '伙食费', prop: 'foodExpenses' },
        { label: '所得税', prop: 'incomeTax' },
        { label: '其他', prop: 'otherDenductions' },
        { label: '扣款合计', prop: 'totalDeductions' }
      ]
    }, {
      label: '本月已发金额',
      children: [
        { label: '应发金额', prop: 'amountPayable' },
        { label: '实发金额', prop: 'amountActual' }
      ]
    },
    { label: '工资余额', prop: 'wageBalance' }
  ],
  // 社会保险
  ssFund: [
    { label: '姓名', prop: 'staffName' },
    {
      label: '社保（企业）',
      children: [
        { label: '缴费基数', prop: 'basePayEnterprise' },
        {
          label: '比例',
          children: [
            { label: '医疗', prop: 'medicalTreatmentEnterprise' },
            { label: '养老', prop: 'pensionEnterprise' },
            { label: '工伤', prop: 'workInjuryEnterprise' },
            { label: '生育', prop: 'childbirthEnterprise' },
            { label: '失业', prop: 'unemploymentEnterprise' },
            { label: '合计', prop: 'totalEnterprise' }
          ]
        },
        { label: '金额', prop: 'amountEnterprise' }
      ]
    },
    { label: '公积金（企业）', prop: 'providentFundEnterprise' },
    {
      label: '社保（个人）',
      children: [
        { label: '缴费基数', prop: 'basePayPersonal' },
        {
          label: '比例',
          children: [
            { label: '医疗', prop: 'medicalTreatmentPersonal' },
            { label: '养老', prop: 'pensionPersonal' },
            { label: '失业', prop: 'unemploymentPersonal' },
            { label: '合计', prop: 'totalPersonal' }
          ]
        },
        { label: '金额', prop: 'amountPersonal' },
        { label: '大额保险', prop: 'largeInsurance' }
      ]
    },
    { label: '公积金（个人）', prop: 'providentFundPersonal' }
  ],
  // 水电气费
  utilityFee: [
    { label: '日期', prop: 'hydropowerDate' },
    { label: '收款单位', prop: 'receivingUnit' },
    { label: '项目', prop: 'hydropowerProject' },
    { label: '单位', prop: 'hydropowerUnit' },
    { label: '用量', prop: 'hydropowerDosage' },
    {
      label: '含税金额',
      children: [
        { label: '单价', prop: 'hydropowerPriceTax' },
        { label: '金额', prop: 'hydropowerAmountTax' }
      ]
    }, {
      label: '不含税金额',
      children: [
        { label: '单价', prop: 'hydropowerPrice' },
        { label: '金额', prop: 'hydropowerAmount' },
        { label: '税额', prop: 'tax' },
        { label: '税率', prop: 'taxRate' }
      ]
    },
    { label: '发票号', prop: 'receiptNumber' }
  ],
  // 检测费
  testingFee: [
    { label: '日期', prop: 'detectDate' },
    { label: '收款单位', prop: 'receivingUnit' },
    { label: '项目', prop: 'detectProject' },
    { label: '本期付款（元）', prop: 'detectPayment' },
    {
      label: '本期发票金额',
      children: [
        { label: '金额', prop: 'detectAmount' },
        { label: '税金', prop: 'tax' },
        { label: '税率', prop: 'taxRate' }
      ]
    },
    { label: '发票号', prop: 'receiptNumber' }
  ],
  // 招待费
  entertain: [
    { label: '类别', prop: 'category' },
    { label: '日期', prop: 'entertainDate' },
    { label: '费用名称', prop: 'feeName' },
    { label: '事由', prop: 'entertainCause' },
    { label: '金额（元）', prop: 'entertainAmount' },
    { label: '发票号', prop: 'receiptNumber' }
  ],
  // 办公费
  office: [
    { label: '类别', prop: 'category' },
    { label: '日期', prop: 'officeDate' },
    { label: '名称', prop: 'officeSupplies' },
    { label: '单位', prop: 'officeUnit' },
    { label: '数量', prop: 'officeQuantity' },
    { label: '单价（元）', prop: 'officePrice' },
    { label: '总价（元）', prop: 'officeAmount' },
    { label: '发票号', prop: 'receiptNumber' }
  ],
  // 伙食费
  meal: [
    { label: '日期', prop: 'foodDate' },
    { label: '姓名', prop: 'staffName' },
    { label: '考勤', prop: 'attendance' },
    { label: '标准（元/天）', prop: 'standard' },
    {
      label: '个人承担',
      children: [
        { label: '标准', prop: 'standardPersonal' },
        { label: '小计', prop: 'subtotalPersonal' }
      ]
    },
    { label: '金额（元）', prop: 'foodAmount' }
  ],
  // 差旅费
  travel: [
    { label: '日期', prop: 'travelDate' },
    { label: '收款单位', prop: 'beneficiary' },
    { label: '费用名称', prop: 'feeName' },
    {
      label: '发票金额',
      children: [
        { label: '金额', prop: 'travelAmount' },
        { label: '税金', prop: 'tax' },
        { label: '税率', prop: 'taxRate' }
      ]
    },
    { label: '发票号', prop: 'receiptNumber' }
  ],
  // 咨询费
  consultingFee: [
    { label: '日期', prop: 'advisoryDate' },
    { label: '收款单位', prop: 'beneficiary' },
    { label: '项目', prop: 'advisoryProject' },
    { label: '合同金额（元）', prop: 'contractAmount' },
    { label: '累计付款（元）', prop: 'cumulativePayment' },
    { label: '上期付款（元）', prop: 'lastPayment' },
    { label: '本期付款（元）', prop: 'currentPayment' },
    { label: '发票号', prop: 'receiptNumber' },
    {
      label: '发票金额',
      children: [
        { label: '金额', prop: 'advisoryAmount' },
        { label: '税金', prop: 'tax' },
        { label: '税率', prop: 'taxRate' }
      ]
    }
  ],
  // 员工福利
  staffWelfare: [
    { label: '日期', prop: 'welfareDate' },
    { label: '姓名', prop: 'staffName' },
    { label: '事由', prop: 'welfareCause' },
    { label: '金额（元）', prop: 'welfareAmount' }
  ],
  // 机械设备
  machinery: [
    { label: '日期', prop: 'equipmentDate' },
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
        { label: '金额', prop: 'equipmentAmount' },
        { label: '税金', prop: 'tax' },
        { label: '税率', prop: 'taxRate' }
      ]
    }
  ]
}

export default thead
