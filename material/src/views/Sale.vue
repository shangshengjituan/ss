<template>
<div>
  <el-form :inline="true" class="top-form">
    <el-form-item label="月份">
      <el-date-picker
        v-model="selectData.month" format="yyyy年MM月" value-format="yyyy-MM"
        type="month" placeholder="选择月" :editable="false" :clearable="false"></el-date-picker>
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="selectData.type" placeholder="类型">
        <el-option label="销售收入" value="1"></el-option>
        <el-option label="运费" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-button-group style="float: right">
      <el-button @click="handleShow" type="success" icon="el-icon-plus">新增数据</el-button>
    </el-button-group>
  </el-form>
  <div v-if="selectData.type === '1'">
    <el-table
      :data="tableData1" border highlight-current-row style="width: 100%"
      header-cell-class-name="top-table" show-summary :summary-method="getSummaries1">
      <el-table-column type="index" label="#"></el-table-column>
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
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!--<el-button @click="handleShow(scope.row)" type="primary" size="mini" icon="el-icon-edit" circle></el-button>-->
          <el-button @click="handleDelete(scope.row)" type="danger" size="mini" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="isEdit ? '编辑数据' : '新增数据'" :visible.sync="showForm1">
      <sale-sale :base-data="baseData" :isEdit="isEdit" @cancel="handleHide1" @primary="handleHideFresh1"/>
    </el-dialog>
  </div>
  <div v-if="selectData.type === '2'">
    <!---->
    <el-table
      :data="tableData2" border highlight-current-row style="width: 100%"
      show-summary :summary-method="getSummaries2">
      <el-table-column type="index" />
      <el-table-column prop="freightDate" label="日期" />
      <el-table-column
        prop="incomeExpenditure" label="类型"
        :filters="[{ text: '收入', value: '收入' }, { text: '支出', value: '支出' }]"
        :filter-method="filterTag" filter-placement="bottom-end"/>
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
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!--<el-button @click="handleShow(scope.row)" type="primary" icon="el-icon-edit" size="mini" circle></el-button>-->
          <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
        </template>
      </el-table-column>
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
      showForm2: false
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
        console.log(rsp)
        this.tableData1 = rsp.data
      })
    },
    getList2 () {
      this.$api.sale.getFreights({
        freightDate: this.selectData.month
      }).then(rsp => {
        console.log(rsp)
        this.tableData2 = rsp.data
      })
    },
    handleShow (item) {
      if (this.selectData.type === '1') {
        this.showForm1 = true
      }
      if (this.selectData.type === '2') {
        this.showForm2 = true
      }
      if (item.saleId || item.freightId) {
        this.isEdit = true
        this.baseData = item
      } else {
        this.isEdit = false
        this.baseData = {}
      }
    },
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
    handleDelete (item) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        if (this.selectData.type === '1') {
          this.deleteItem1(item)
        }
        if (this.selectData.type === '2') {
          this.deleteItem2(item)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteItem1 (item) {
      this.$api.sale.delSale({
        saleId: item.saleId
      }).then(rsp => {
        if (rsp.result === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList1()
        } else {
          this.$message({
            type: 'error',
            message: rsp.resultText
          })
        }
      })
    },
    deleteItem2 (item) {
      this.$api.sale.delFreight({
        freightId: item.freightId
      }).then(rsp => {
        if (rsp.result === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList2()
        } else {
          this.$message({
            type: 'error',
            message: rsp.resultText
          })
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
      console.log(value)
      console.log(row)
      return row.incomeExpenditure === value
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
  .el-table .top-table {
    background-color: #F5F7FA;
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
