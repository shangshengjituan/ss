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
          <el-radio-button label="成本汇总表">成本汇总表</el-radio-button>
          <el-radio-button label="管理费用明细">管理费用明细</el-radio-button>
          <el-radio-button label="陶粒板产品成本表">陶粒板产品成本表</el-radio-button>
          <el-radio-button label="路牙、盖板成本">路牙、盖板成本</el-radio-button>
          <el-radio-button label="固定资产投入">固定资产投入</el-radio-button>
          <el-radio-button label="车间制造费用明细表">车间制造费用明细表</el-radio-button>
          <el-radio-button label="产品库存表">产品库存表</el-radio-button>
          <el-radio-button label="原材料库存表">原材料库存表</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div  style="text-align: right">
      <el-button-group>
        <el-button @click="handleDelete" type="warning">删除选中行</el-button>
        <!--<el-button @click="handleEditShow" type="warning">编辑选中行</el-button>-->
        <el-button @click="handleShow" type="primary" icon="el-icon-plus">新增数据</el-button>
      </el-button-group>
    </div>
    <el-table
      :data="tableData" border style="width: 100%" header-cell-class-name="top-table" highlight-current-row
      :show-summary="isSummary" :summary-method="getSummaries" @current-change="handleCurrentChange">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label">
        <el-table-column v-for="it in item.children" :key="it.prop" :prop="it.prop" :label="it.label">
          <el-table-column v-for="i in it.children" :key="i.prop" :prop="i.prop" :label="i.label"/>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
    <el-dialog :title="isEdit ? `编辑${selectData.type}数据` : `新增${selectData.type}数据`" :visible.sync="showForm">
    <cost-fixed v-if="selectData.type==='固定资产投入'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    <cost-product-store v-if="selectData.type==='产品库存表'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    </el-dialog>
  </div>
</template>

<script>
import thead from '../util/costThead'
import CostFixed from '../components/CostFixed'
import CostProductStore from '../components/CostProductStore'
export default {
  name: 'Cost',
  components: { CostProductStore, CostFixed },
  data () {
    return {
      selectData: {
        month: this.$utils.toDateString(new Date(), 'yyyy-MM'),
        type: '固定资产投入'
      },
      tableHead: thead.wage,
      isSummary: true,
      showForm: false,
      isEdit: false,
      baseData: {},
      tableData: [],
      currentRow: {}
    }
  },
  created () {
    this.getList()
  },
  watch: {
    selectData: {
      handler (val, old) {
        switch (val.type) {
          case '成本汇总表':
            this.tableHead = thead.wage
            this.isSummary = true
            break
          case '管理费用明细':
            this.tableHead = thead.ssFund
            this.isSummary = true
            break
          case '陶粒板产品成本表':
            this.tableHead = thead.utilityFee
            this.isSummary = true
            break
          case '路牙、盖板成本':
            this.tableHead = thead.testingFee
            this.isSummary = false
            break
          case '固定资产投入':
            this.tableHead = thead.fixed
            this.isSummary = true
            break
          case '车间制造费用明细表':
            this.tableHead = thead.office
            this.isSummary = true
            break
          case '产品库存表':
            this.tableHead = thead.productStore
            this.isSummary = true
            break
          case '原材料库存表':
            this.tableHead = thead.travel
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
        this.$message.warning('请选择查询类别')
        return
      }
      switch (this.selectData.type) {
        case '成本汇总表':
          this.$api.cost.getWageList({ wageDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '管理费用明细':
          this.$api.cost.getSSFundList({ socialSecurityDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '陶粒板产品成本表':
          this.$api.cost.getUtilityList({ hydropowerDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '路牙、盖板成本':
          this.$api.cost.getTestingList({ detectDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '固定资产投入':
          this.$api.cost.getFixedList({ entertainDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '车间制造费用明细表':
          this.$api.cost.getOfficeList({ officeDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '产品库存表':
          this.$api.cost.getProductStoreList({ foodDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '原材料库存表':
          this.$api.cost.getTravelList({ travelDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
      }
    },
    handleShow () {
      this.showForm = true
      this.isEdit = false
      this.baseData = {}
      console.log(JSON.stringify(this.baseData))
    },
    // handleEditShow () {
    //   this.showForm = true
    //   this.isEdit = true
    //   this.baseData = this.currentRow
    // },
    handleHide () {
      this.showForm = false
    },
    handleHideFresh () {
      this.handleHide()
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleDelete () {
      console.log(this.currentRow)
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteItem(this.currentRow)
      }).catch(() => { this.$message.info('已取消删除') })
    },
    deleteItem (item) {
      switch (this.selectData.type) {
        case '成本汇总表':
          this.$api.cost.delWageItem({ wageId: item.wageId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '管理费用明细':
          this.$api.cost.delSSFundItem({ socialSecurityId: item.socialSecurityId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '陶粒板产品成本表':
          this.$api.cost.delUtilityItem({ hydropowerId: item.hydropowerId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '路牙、盖板成本':
          this.$api.cost.delTestingItem({ detectId: item.detectId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '固定资产投入':
          this.$api.cost.delEntertainItem({ entertainId: item.entertainId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '车间制造费用明细表':
          this.$api.cost.delOfficeItem({ officeId: item.officeId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '产品库存表':
          this.$api.cost.delMealItem({ foodId: item.foodId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '原材料库存表':
          this.$api.cost.delTravelItem({ travelId: item.travelId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
      }
    },
    getSummaries (params) {
      const sums = []
      const { columns, data } = params
      let demo
      switch (this.selectData.type) {
        case '成本汇总表':
          demo = []
          data.forEach((columns) => {
            demo[0] = this.$utils.add(columns.amountsPayable, demo[0])
            demo[1] = this.$utils.add(columns.socialInsurance, demo[1])
            demo[2] = this.$utils.add(columns.largeInsurance, demo[2])
            demo[3] = this.$utils.add(columns.foodExpenses, demo[3])
            demo[4] = this.$utils.add(columns.providentFund, demo[4])
            demo[5] = this.$utils.add(columns.totalDeductions, demo[5])
            demo[6] = this.$utils.add(columns.amountPayable, demo[6])
            demo[7] = this.$utils.add(columns.amountActual, demo[7])
            demo[8] = this.$utils.add(columns.wageBalance, demo[8])
          })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            switch (columns.property) {
              case 'amountsPayable': sums[index] = demo[0]
                break
              case 'socialInsurance': sums[index] = demo[1]
                break
              case 'largeInsurance': sums[index] = demo[2]
                break
              case 'foodExpenses': sums[index] = demo[3]
                break
              case 'providentFund': sums[index] = demo[4]
                break
              case 'totalDeductions': sums[index] = demo[5]
                break
              case 'amountPayable': sums[index] = demo[6]
                break
              case 'amountActual': sums[index] = demo[7]
                break
              case 'wageBalance': sums[index] = demo[8]
                break
            }
          })
          break
        case '管理费用明细':
          demo = []
          data.forEach((columns) => {
            demo[0] = this.$utils.add(columns.amountEnterprise, demo[0])
            demo[1] = this.$utils.add(columns.providentFundEnterprise, demo[1])
            demo[2] = this.$utils.add(columns.amountPersonal, demo[2])
            demo[3] = this.$utils.add(columns.largeInsurance, demo[3])
            demo[4] = this.$utils.add(columns.providentFundPersonal, demo[4])
          })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            switch (columns.property) {
              case 'amountEnterprise': sums[index] = demo[0]
                break
              case 'providentFundEnterprise': sums[index] = demo[1]
                break
              case 'amountPersonal': sums[index] = demo[2]
                break
              case 'largeInsurance': sums[index] = demo[3]
                break
              case 'providentFundPersonal': sums[index] = demo[4]
                break
            }
          })
          break
        case '陶粒板产品成本表':
          demo = []
          data.forEach((columns) => {
            demo[0] = this.$utils.add(columns.hydropowerAmountTax, demo[0])
            demo[1] = this.$utils.add(columns.hydropowerAmount, demo[1])
            demo[2] = this.$utils.add(columns.tax, demo[2])
          })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            switch (columns.property) {
              case 'hydropowerAmountTax': sums[index] = demo[0]
                break
              case 'hydropowerAmount': sums[index] = demo[1]
                break
              case 'tax': sums[index] = demo[2]
                break
            }
          })
          break
        // case '路牙、盖板成本':
        //   break
        case '固定资产投入':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.entertainAmount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'entertainAmount') sums[index] = demo
          })
          break
        case '车间制造费用明细表':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.officeAmount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'officeAmount') sums[index] = demo
          })
          break
        case '产品库存表':
          demo = []
          data.forEach((columns) => {
            demo[0] = this.$utils.add(columns.subtotalPersonal, demo[0])
            demo[1] = this.$utils.add(columns.foodAmount, demo[1])
          })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            switch (columns.property) {
              case 'subtotalPersonal': sums[index] = demo[0]
                break
              case 'foodAmount': sums[index] = demo[1]
                break
            }
          })
          break
        // case '原材料库存表':
        //   break
      }
      return sums
    }
  }
}
</script>

<style scoped>
  .el-dialog {
    margin-top: 5vh;
  }
</style>
