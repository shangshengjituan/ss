import Vue from 'vue'
import XEUtils from 'xe-utils'
import {
  VXETable,
  Table,
  Column,
  Header,
  Footer,
  Filter,
  Edit,
  Menu,
  Export,
  Keyboard,
  Validator,
  Grid,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Textarea,
  Button,
  Modal,
  Tooltip,
  Form,
  Select,
  Switch,
  Icon,
  List
} from 'vxe-table'

// import VXETablePluginElement from 'vxe-table-plugin-element'
// import 'vxe-table-plugin-element/dist/style.css'

// 先安装依赖模块
Vue.use(Icon)
Vue.use(Column)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Filter)
Vue.use(Edit)
Vue.use(Menu)
Vue.use(Export)
Vue.use(Keyboard)
Vue.use(Validator)
Vue.use(Textarea)
Vue.use(Tooltip)
Vue.use(Grid)
Vue.use(Toolbar)
Vue.use(Pager)
Vue.use(Form)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Input)
Vue.use(Select)
Vue.use(Button)
Vue.use(Modal)
Vue.use(List)

// 再安装核心库
Vue.use(Table)

// Vue.use(VXETablePluginElement)

// 给 vue 实例挂载全局窗口对象
Vue.prototype.$XModal = VXETable.modal

// 自定义全局的格式化处理函数
VXETable.formats.mixin({
  // 格式化性别
  formatSex ({ cellValue }) {
    return cellValue ? (cellValue === '1' ? '男' : '女') : ''
  },
  // 格式化下拉选项
  formatSelect ({ cellValue }, list) {
    const item = list.find(item => item.value === cellValue)
    return item ? item.label : ''
  },
  // 格式化日期，默认 yyyy-MM-dd HH:mm:ss
  formatDate ({ cellValue }, format) {
    return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss')
  },
  // 格式金额，默认2位数
  formatAmount ({ cellValue }, digits) {
    return XEUtils.commafy(cellValue, { digits: digits || 2 })
  },
  // 格式化银行卡，默认每4位隔开
  formatBankcard ({ cellValue }) {
    return XEUtils.commafy(cellValue, { spaceNumber: 4, separator: ' ' })
  },
  // 四舍五入,默认两位数
  formatFixedNumber ({ cellValue }, digits) {
    return XEUtils.toNumber(cellValue).toFixed(digits || 2)
  },
  // 截取小数,默认两位数
  formatCutNumber ({ cellValue }, digits) {
    return XEUtils.toFixedString(cellValue, digits || 2)
  },
  // 转换 moment 类型为字符串
  toMomentString ({ cellValue }, format) {
    return cellValue ? cellValue.format(format) : ''
  }
})

VXETable.setup({
  size: null, // 全局尺寸
  zIndex: 100, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
  version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  table: {
    showHeader: true,
    keepSource: false,
    animat: true,
    cloak: false,
    delayHover: 250,
    showOverflow: null,
    showHeaderOverflow: null,
    showFooterOverflow: null,
    size: null,
    resizable: false,
    stripe: false,
    border: false,
    round: false,
    radioConfig: {
      trigger: 'default'
    },
    checkboxConfig: {
      trigger: 'default'
    },
    sortConfig: {
      remote: false,
      trigger: 'default',
      orders: ['asc', 'desc', null],
      sortMethod: null
    },
    filterConfig: {
      remote: false,
      filterMethod: null
    },
    expandConfig: {
      trigger: 'default'
    },
    treeConfig: {
      children: 'children',
      hasChild: 'hasChild',
      indent: 20
    },
    tooltipConfig: {
      theme: 'dark',
      enterable: false
    },
    editConfig: {
      mode: 'cell'
    },
    contextMenu: {
      visibleMethod () {}
    },
    rowId: '_XID', // 行数据的唯一主键字段名
    importConfig: {
      modes: ['insert', 'covering']
    },
    exportConfig: {
      isPrint: true,
      modes: ['current', 'selected']
    },
    customConfig: {
      storage: false
    },
    scrollX: {
      gt: 60
    },
    scrollY: {
      gt: 100
    }
  },
  grid: {
    size: null,
    zoomConfig: {
      escRestore: true
    },
    pagerConfig: {
      perfect: false
    },
    toolbar: {
      perfect: false
    },
    proxyConfig: {
      autoLoad: true,
      message: true,
      props: {
        list: null, // 用于列表，读取响应数据
        result: 'result', // 用于分页，读取响应数据
        total: 'page.total' // 用于分页，读取总条数
      },
      beforeItem: null,
      beforeColumn: null,
      beforeQuery: null,
      afterQuery: null,
      beforeDelete: null,
      afterDelete: null,
      beforeSave: null,
      afterSave: null
    }
  },
  pager: {
    size: null,
    autoHidden: false,
    perfect: true,
    pageSize: 10,
    pagerCount: 7,
    pageSizes: [10, 15, 20, 50, 100],
    layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  form: {
    size: null,
    colon: false
  },
  input: {
    size: null,
    transfer: false,
    parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
    labelFormat: '',
    valueFormat: '',
    startWeek: 1,
    digits: 2
  },
  textarea: {
    size: null,
    autosize: {
      minRows: 1,
      maxRows: 10
    }
  },
  select: {
    size: null,
    transfer: false
  },
  toolbar: {
    size: null,
    import: {
      mode: 'covering'
    },
    export: {
      types: ['csv', 'html', 'xml', 'txt']
    },
    custom: {
      isFooter: true
    },
    buttons: []
  },
  button: {
    size: null,
    transfer: false
  },
  radio: {
    size: null
  },
  checkbox: {
    size: null
  },
  switch: {
    size: null
  },
  modal: {
    // size: null,
    minWidth: 340,
    minHeight: 200,
    lockView: true,
    mask: true,
    duration: 3000,
    marginSize: 8,
    dblclickZoom: true,
    showTitleOverflow: true,
    storage: false
  },
  list: {
    scrollY: {
      gt: 100
    }
  }
})
