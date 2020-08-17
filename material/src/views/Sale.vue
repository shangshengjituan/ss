<template>
<div>
  <el-form :inline="true" class="top-form">
    <el-form-item label="月份">
      <el-date-picker
        v-model="selectData.month" format="yyyy年MM月" value-format="yyyy-MM" size="small"
        type="month" placeholder="选择月" :editable="false" :clearable="false"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-radio-group v-model="selectData.type" size="small">
        <el-radio-button label="销售收入">销售收入</el-radio-button>
        <el-radio-button label="运费">运费</el-radio-button>
        <el-radio-button label="生产出版记录">生产出版记录</el-radio-button>
        <el-radio-button label="生产销售汇总">生产销售汇总</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <div style="text-align: right">
    <el-button-group>
      <el-button @click="handleDelete" type="warning">删除选中行</el-button>
      <!--<el-button @click="handleEditShow" type="warning">编辑选中行</el-button>-->
      <el-button @click="handleShow" type="primary" icon="el-icon-plus">新增数据</el-button>
      <!--<el-button @click="handleOutput" type="primary">导出</el-button>-->
    </el-button-group>
  </div>
  <div v-if="selectData.type !== '2'">
    <el-table
      id="table1"
      :data="tableData" border highlight-current-row style="width: 100%"
      header-cell-class-name="top-table" :show-summary="isSummary" :summary-method="getSummaries1" @current-change="handleCurrentChange">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label" show-overflow-tooltip>
        <el-table-column v-for="it in item.children" :key="it.prop" :prop="it.prop" :label="it.label" show-overflow-tooltip>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
  <div v-else>
    <!---->
    <el-table
      id="table2"
      :data="tableData" border highlight-current-row style="width: 100%" header-cell-class-name="top-table"
      :show-summary="isSummary" :summary-method="getSummaries2" @filter-change="filterChange" @current-change="handleCurrentChange">
      <el-table-column type="index" label="#" width="50" />
      <el-table-column prop="freightDate" label="日期" />
      <el-table-column
        prop="incomeExpenditure" label="类型"
        :filters="[{ text: '收入', value: '收入' }, { text: '支出', value: '支出' }]"
        column-key="incomeExpenditure" :filter-multiple="false"
        :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.incomeExpenditure === '收入' ? 'success' : 'warning'"
            disable-transitions>{{scope.row.incomeExpenditure}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="freightType" label="费用类别"/>
      <el-table-column prop="projectName" label="项目名称" />
      <el-table-column prop="carLength" label="车型" />
      <el-table-column prop="frequency" label="趟次" />
      <el-table-column prop="basicMileage" label="基本公里数" />
      <el-table-column prop="actualMileage" label="实际公里数" />
      <el-table-column label="含税金额">
        <el-table-column prop="freightPriceTax" label="单价" />
        <el-table-column prop="freightAmountTax" label="金额" />
      </el-table-column>
      <el-table-column label="不含税金额">
        <el-table-column prop="freightPrice" label="单价" />
        <el-table-column prop="freightAmount" label="金额" />
        <el-table-column prop="tax" label="税额" />
        <el-table-column prop="taxRate" label="税率" />
      </el-table-column>
      <el-table-column prop="receiptNumber" label="发票号" />
      <el-table-column prop="clientName" label="客户/承运商" show-overflow-tooltip/>
      <el-table-column prop="remark" label="备注" />
    </el-table>
  </div>
  <el-dialog :title="isEdit ? `编辑${selectData.type}数据` : `新增${selectData.type}数据`" :visible.sync="showForm">
    <sale-sale v-if="selectData.type==='销售收入'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    <sale-freight v-if="selectData.type==='运费'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    <sale-record v-if="selectData.type==='生产出版记录'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
  </el-dialog>
</div>
</template>

<script>
import thead from '@/util/saleThead'
import SaleSale from '../components/Sale/SaleSale'
import SaleFreight from '../components/Sale/SaleFreight'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import SaleRecord from '../components/Sale/SaleRecord'
export default {
  name: 'Sale',
  components: { SaleRecord, SaleFreight, SaleSale },
  data () {
    return {
      selectData: {
        month: this.$utils.toDateString(new Date(), 'yyyy-MM'),
        type: '销售收入'
      },
      tableHead: thead.sale,
      showForm: false,
      isEdit: false,
      baseData: {},
      tableData: [],
      currentRow: {},
      isSummary: false, // 是否合计
      filterLength: 0 // 筛选后数据条数
    }
  },
  created () {
    this.getList()
  },
  watch: {
    selectData: {
      handler (val, old) {
        switch (val.type) {
          case '销售收入':
            this.tableHead = thead.sale
            // this.isSummary = true
            break
          // case '运费':
          //   this.tableHead = thead.ssFund
          //   this.isSummary = true
          //   break
          case '生产出版记录':
            this.tableHead = thead.record
            this.isSummary = false
            break
          case '生产销售汇总':
            this.tableHead = thead.summary
            this.isSummary = false
            break
        }
        this.getList()
      },
      deep: true
    }
  },
  methods: {
    getList () {
      if (!this.selectData.month || !this.selectData.type) {
        this.$message({ type: 'warning', message: '请选择查询类别', duration: 1000 })
        return
      }
      switch (this.selectData.type) {
        case '销售收入':
          this.$api.sale.getSales({
            saleDate: this.selectData.month
          }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '运费':
          this.$api.sale.getFreights({
            freightDate: this.selectData.month
          }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data.map(item => {
              for (const key in item) {
                if (item[key] === 0) item[key] = ''
              }
              return item
            })
          })
          break
        case '生产出版记录':
          this.$api.sale.getRecord({
            produceDate: this.selectData.month
          }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '生产销售汇总':
          this.$api.sale.getSummary({
            produceDate: this.selectData.month
          }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
      }
    },
    handleShow () {
      this.showForm = true
      this.isEdit = false
      this.baseData = {}
    },
    // handleEditShow () {
    //   this.showForm = true
    //   this.isEdit = true
    //   this.baseData = this.currentRow
    // },
    handleHide () {
      this.showForm = false
      this.baseData = {}
    },
    handleHideFresh () {
      this.handleHide()
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleDelete () {
      if (JSON.stringify(this.currentRow) === '{}') return
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        this.deleteItem(this.currentRow)
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除', duration: 1000 })
      })
    },
    deleteItem (item) {
      switch (this.selectData.type) {
        case '销售收入':
          this.$api.sale.delSale({ saleId: item.saleId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else {
              this.$message({ type: 'error', message: rsp.resultText })
            }
          })
          break
        case '运费':
          this.$api.sale.delFreight({ freightId: item.freightId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else {
              this.$message({ type: 'error', message: rsp.resultText })
            }
          })
          break
        case '生产出版记录':
          this.$api.sale.delRecord({ produceId: item.produceId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else {
              this.$message({ type: 'error', message: rsp.resultText })
            }
          })
          break
      }
    },
    getSummaries1 (params) {
      console.log('合计')
      const { columns, data } = params
      const sums = []
      let [demo, demo1, demo2, demo3, demo4] = [0, 0, 0, 0, 0]
      data.forEach((columns) => {
        demo = this.$utils.add(columns.saleQuantity, demo)
        demo1 = this.$utils.add(columns.saleArea, demo1)
        demo2 = this.$utils.add(columns.saleAmountTax, demo2)
        demo3 = this.$utils.add(columns.saleAmount, demo3)
        demo4 = this.$utils.add(columns.tax, demo4)
      })
      columns.forEach((columns, index) => {
        if (index === 0) {
          sums[index] = '合计'
        }
        switch (columns.property) {
          case 'saleQuantity': sums[index] = demo
            break
          case 'saleArea': sums[index] = demo1
            break
          case 'saleAmountTax': sums[index] = demo2
            break
          case 'saleAmount': sums[index] = demo3
            break
          case 'tax': sums[index] = demo4
            break
        }
      })
      return sums
    },
    getSummaries2 (params) {
      const { columns, data } = params
      const sums = []
      let [demo, demo1, demo2] = [0, 0, 0]
      data.forEach((columns) => {
        demo = this.$utils.add(columns.freightAmountTax, demo)
        demo1 = this.$utils.add(columns.freightAmount, demo1)
        demo2 = this.$utils.add(columns.tax, demo2)
      })
      columns.forEach((columns, index) => {
        if (index === 0) {
          sums[index] = '合计'
        }
        switch (columns.property) {
          case 'freightAmountTax': sums[index] = demo
            break
          case 'freightAmount': sums[index] = demo1
            break
          case 'tax': sums[index] = demo2
            break
        }
      })
      return sums
    },
    filterTag (value, row) {
      if (row.incomeExpenditure === value) { this.filterLength++ }
      return row.incomeExpenditure === value
    },
    filterChange (filters) {
      this.isSummary = this.filterLength > 0 && filters.incomeExpenditure.length > 0
      this.filterLength = 0
    },
    handleOutput () {
      if (this.selectData.type === '1') {
        console.log('output1')
        this.downloadTable1()
      } else if (this.selectData.type === '2') {
        console.log('output2')
        this.downloadTable2()
      }
    },
    downloadTable1 () {
      /* 生成工作簿对象 */
      const wb = XLSX.utils.table_to_book(document.querySelector('#table1'))// mytable为表格的id名
      console.log(wb)
      /* 获取二进制字符串作为输出 */
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          this.selectData.month + '产品销售明细表.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    downloadTable2 () {
      /* 生成工作簿对象 */
      const wb = XLSX.utils.table_to_book(document.querySelector('#table2'))// mytable为表格的id名
      /* 获取二进制字符串作为输出 */
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          this.selectData.month + '运费收支明细表.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  }
}
</script>

<style>
  .top-form {
    padding: 10px;
    margin: 10px 0;
    background: #F5F7FA;
  }
  .top-form .el-form-item {
    margin: 0 15px 0 0;
  }
  .el-table thead.is-group th {
    background: #FFFFE0;
  }
  .el-table .top-table {
    /*background-color: #F5F7FA;*/
    background-color: #FFFFE0;

  }
  .el-dialog {
    width: 80%;
  }
  .el-table__header-wrapper tbody td {
    text-align: center;
  }
  .el-table__footer-wrapper tbody td {
    /*background-color: #fff;*/
    font-weight: bold;
  }
  .el-table td {
    padding: 6px 0;
  }
  .el-table .cell {
    padding: 0 5px;
  }
</style>
