<template>
<div>
  <el-form :inline="true" class="top-form">
    <el-form-item label="月份">
      <el-date-picker
        v-model="selectData.month" format="yyyy年MM月" value-format="yyyy-MM"
        type="month" placeholder="选择月" :editable="false" :clearable="false"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-radio-group v-model="selectData.type" size="small">
        <el-radio-button label="1">销售收入</el-radio-button>
        <el-radio-button label="2">运费</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <div style="text-align: right">
    <el-button-group>
      <el-button @click="handleDelete" type="warning">删除选中行</el-button>
      <!--<el-button @click="handleEditShow" type="warning">编辑选中行</el-button>-->
      <el-button @click="handleShow" type="primary" icon="el-icon-plus">新增数据</el-button>
    </el-button-group>
  </div>
  <div v-show="selectData.type === '1'">
    <el-table
      :data="tableData1" border highlight-current-row style="width: 100%"
      header-cell-class-name="top-table" :summary-method="getSummaries1" @current-change="handleCurrentChange">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="saleDate" label="日期"></el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="commodityName" label="品名"></el-table-column>
      <el-table-column prop="commoditySize" label="规格"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="saleQuantity" label="数量"></el-table-column>
      <el-table-column prop="saleArea" label="面积（㎡）"></el-table-column>
      <el-table-column prop="salePrice" label="销售单价"></el-table-column>
      <el-table-column prop="saleAmountTax" label="金额（含税）"></el-table-column>
      <el-table-column prop="saleAmount" label="金额（不含税）"></el-table-column>
      <el-table-column prop="tax" label="税额"></el-table-column>
      <el-table-column prop="hitMoney" label="是否回款"></el-table-column>
      <el-table-column prop="receiptNumber" label="已开发票号"></el-table-column>
      <el-table-column prop="clientName" label="客户"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
    <el-dialog :title="isEdit ? '编辑数据' : '新增数据'" :visible.sync="showForm1">
      <sale-sale :base-data="baseData" :isEdit="isEdit" @cancel="handleHide1" @primary="handleHideFresh1"/>
    </el-dialog>
  </div>
  <div v-show="selectData.type === '2'">
    <!---->
    <el-table
      :data="tableData2" border highlight-current-row style="width: 100%" header-cell-class-name="top-table"
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
      <el-table-column prop="clientName" label="客户/承运商" />
      <el-table-column prop="remark" label="备注" />
    </el-table>
    <el-dialog :title="isEdit ? '编辑数据' : '新增数据'" :visible.sync="showForm2">
      <sale-freight :base-data="baseData" :isEdit="isEdit" @cancel="handleHide2" @primary="handleHideFresh2"/>
    </el-dialog>
  </div>
</div>
</template>

<script>
import SaleSale from '../components/SaleSale'
import SaleFreight from '../components/SaleFreight'
export default {
  name: 'Sale',
  components: { SaleFreight, SaleSale },
  data () {
    return {
      selectData: {
        month: this.$utils.toDateString(new Date(), 'yyyy-MM'),
        type: '2'
      },
      showForm1: false,
      isEdit: false,
      baseData: {},
      tableData1: [],
      tableData2: [],
      currentRow: {},
      showForm2: false,
      isSummary: false, // 是否合计
      filterLength: 0 // 筛选后数据条数
    }
  },
  created () {
    this.getList1()
    this.getList2()
  },
  watch: {
    selectData: {
      handler (val, old) {
        if (val.type === '1') { this.getList1() }
        if (val.type === '2') { this.getList2() }
      },
      deep: true
    }
  },
  methods: {
    getList1 () {
      this.$api.sale.getSales({
        saleDate: this.selectData.month
      }).then(rsp => {
        this.$message({ type: 'success', message: '查询成功', duration: 1000 })
        this.tableData1 = rsp.data
      })
    },
    getList2 () {
      this.$api.sale.getFreights({
        freightDate: this.selectData.month
      }).then(rsp => {
        this.$message({ type: 'success', message: '查询成功', duration: 1000 })
        this.tableData2 = rsp.data
      })
    },
    handleShow () {
      if (this.selectData.type === '1') {
        this.showForm1 = true
      }
      if (this.selectData.type === '2') {
        this.showForm2 = true
      }
      this.isEdit = false
      this.baseData = {}
    },
    // handleEditShow () {
    //   if (this.selectData.type === '1') {
    //     this.showForm1 = true
    //   }
    //   if (this.selectData.type === '2') {
    //     this.showForm2 = true
    //   }
    //   this.isEdit = true
    //   this.baseData = this.currentRow
    // },
    handleHide1 () {
      this.showForm1 = false
      this.baseData = {}
    },
    handleHideFresh1 () {
      this.handleHide1()
      this.getList1()
    },
    handleHide2 () {
      this.showForm2 = false
      this.baseData = {}
    },
    handleHideFresh2 () {
      this.handleHide2()
      this.getList2()
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleDelete () {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        if (this.selectData.type === '1') {
          this.deleteItem1(this.currentRow)
        }
        if (this.selectData.type === '2') {
          this.deleteItem2(this.currentRow)
        }
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除', duration: 1000 })
      })
    },
    deleteItem1 (item) {
      this.$api.sale.delSale({
        saleId: item.saleId
      }).then(rsp => {
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
          this.getList1()
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      })
    },
    deleteItem2 (item) {
      this.$api.sale.delFreight({
        freightId: item.freightId
      }).then(rsp => {
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
          this.getList2()
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      })
    },
    getSummaries1 (params) {
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
</style>
