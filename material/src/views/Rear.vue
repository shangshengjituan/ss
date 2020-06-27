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
          <el-radio-button label="人员工资">人员工资</el-radio-button>
          <el-radio-button label="社保公积金">社保公积金</el-radio-button>
          <el-radio-button label="水电气费">水电气费</el-radio-button>
          <el-radio-button label="检测费">检测费</el-radio-button>
          <el-radio-button label="招待费">招待费</el-radio-button>
          <el-radio-button label="办公费用">办公费用</el-radio-button>
          <el-radio-button label="伙食费">伙食费</el-radio-button>
          <el-radio-button label="差旅资料">差旅资料</el-radio-button>
          <el-radio-button label="咨询费">咨询费</el-radio-button>
          <el-radio-button label="员工福利">员工福利</el-radio-button>
          <el-radio-button label="机械设备">机械设备</el-radio-button>
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
      <rear-wage v-if="selectData.type==='人员工资'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-s-s-fund v-if="selectData.type==='社保公积金'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-utility-fee v-if="selectData.type==='水电气费'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-testing-fee v-if="selectData.type==='检测费'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-entertain v-if="selectData.type==='招待费'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-office v-if="selectData.type==='办公费用'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-meal v-if="selectData.type==='伙食费'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    </el-dialog>
  </div>
</template>

<script>
import thead from '@/util/rearThead'
import RearWage from '../components/RearWage'
import RearSSFund from '../components/RearSSFund'
import RearUtilityFee from '../components/RearUtilityFee'
import RearTestingFee from '../components/RearTestingFee'
import RearEntertain from '../components/RearEntertain'
import RearOffice from '../components/RearOffice'
import RearMeal from '../components/RearMeal'
export default {
  name: 'Rear',
  components: { RearMeal, RearOffice, RearEntertain, RearTestingFee, RearUtilityFee, RearSSFund, RearWage },
  data () {
    return {
      selectData: {
        month: this.$utils.toDateString(new Date(), 'yyyy-MM'),
        type: '人员工资'
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
          case '人员工资':
            this.tableHead = thead.wage
            this.isSummary = true
            break
          case '社保公积金':
            this.tableHead = thead.ssFund
            this.isSummary = true
            break
          case '水电气费':
            this.tableHead = thead.utilityFee
            this.isSummary = true
            break
          case '检测费':
            this.tableHead = thead.testingFee
            this.isSummary = false
            break
          case '招待费':
            this.tableHead = thead.entertain
            this.isSummary = true
            break
          case '办公费用':
            this.tableHead = thead.office
            this.isSummary = true
            break
          case '伙食费':
            this.tableHead = thead.meal
            this.isSummary = true
            break
          case '差旅资料':
            break
          case '咨询费':
            break
          case '员工福利':
            break
          case '机械设备':
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
        case '人员工资':
          this.$api.rear.getWageList({ wageDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '社保公积金':
          this.$api.rear.getSSFundList({ socialSecurityDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '水电气费':
          this.$api.rear.getUtilityList({ hydropowerDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '检测费':
          this.$api.rear.getTestingList({ detectDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '招待费':
          this.$api.rear.getEntertainList({ entertainDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '办公费用':
          this.$api.rear.getOfficeList({ officeDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '伙食费':
          this.$api.rear.getMealList({ officeDate: this.selectData.month }).then(rsp => {
            this.$message.success('查询成功')
            this.tableData = rsp.data
          })
          break
        case '差旅资料':
          break
        case '咨询费':
          break
        case '员工福利':
          break
        case '机械设备':
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
        // 删除
        this.deleteItem(this.currentRow)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    deleteItem (item) {
      switch (this.selectData.type) {
        case '人员工资':
          this.$api.rear.delWageItem({ wageId: item.wageId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(rsp.resultText)
            }
          })
          break
        case '社保公积金':
          this.$api.rear.delSSFundItem({ socialSecurityId: item.socialSecurityId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(rsp.resultText)
            }
          })
          break
        case '水电气费':
          this.$api.rear.delUtilityItem({ hydropowerId: item.hydropowerId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(rsp.resultText)
            }
          })
          break
        case '检测费':
          this.$api.rear.delTestingItem({ detectId: item.detectId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(rsp.resultText)
            }
          })
          break
        case '招待费':
          this.$api.rear.delEntertainItem({ entertainId: item.entertainId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(rsp.resultText)
            }
          })
          break
        case '办公费用':
          this.$api.rear.delOfficeItem({ officeId: item.officeId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(rsp.resultText)
            }
          })
          break
        case '伙食费':
          this.$api.rear.delMealItem({ officeId: item.officeId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(rsp.resultText)
            }
          })
          break
        case '差旅资料':
          break
        case '咨询费':
          break
        case '员工福利':
          break
        case '机械设备':
          break
      }
    },
    getSummaries (params) {
      const sums = []
      const { columns, data } = params
      let demo
      switch (this.selectData.type) {
        case '人员工资':
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
        case '社保公积金':
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
        case '水电气费':
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
        case '检测费':
          break
        case '招待费':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.entertainAmount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'entertainAmount') sums[index] = demo
          })
          break
        case '办公费用':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.officeAmount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'officeAmount') sums[index] = demo
          })
          break
        case '伙食费':
          demo = []
          data.forEach((columns) => {
            demo[0] = this.$utils.add(columns.hydropowerAmountTax, demo[0])
            demo[1] = this.$utils.add(columns.hydropowerAmount, demo[1])
          })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            switch (columns.property) {
              case 'hydropowerAmountTax': sums[index] = demo[0]
                break
              case 'hydropowerAmount': sums[index] = demo[1]
                break
            }
          })
          break
        case '差旅资料':
          break
        case '咨询费':
          break
        case '员工福利':
          break
        case '机械设备':
          break
      }
      // let [demo, demo1, demo2, demo3] = [0, 0, 0, 0]
      // data.forEach((columns) => {
      //   demo = this.$utils.add(columns.materialAmountTax, demo)
      //   demo1 = this.$utils.add(columns.materialAmount, demo1)
      //   demo2 = this.$utils.add(columns.tax, demo2)
      //   demo3 = this.$utils.add(columns.materialQuantity, demo3)
      // })
      // columns.forEach((columns, index) => {
      //   if (index === 0) {
      //     sums[index] = '合计'
      //   }
      //   switch (columns.property) {
      //     case 'materialAmountTax': sums[index] = demo
      //       break
      //     case 'materialAmount': sums[index] = demo1
      //       break
      //     case 'tax': sums[index] = demo2
      //       break
      //     case 'materialQuantity': sums[index] = demo3
      //       break
      //   }
      // })
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
