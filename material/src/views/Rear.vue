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
      ref="tableDataRef"
      :data="tableData" border style="width: 100%" header-cell-class-name="top-table" highlight-current-row
      :show-summary="isSummary" :summary-method="getSummaries" @current-change="handleCurrentChange">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label" show-overflow-tooltip>
        <el-table-column v-for="it in item.children" :key="it.prop" :prop="it.prop" :label="it.label" show-overflow-tooltip>
          <el-table-column v-for="i in it.children" :key="i.prop" :prop="i.prop" :label="i.label" show-overflow-tooltip/>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <div slot="append">
        <div v-if="selectData.type==='人员工资'">
          <div ref="subtotalRef" v-for="(item, index) in tableSubtotal" :key="index" class="sum-footer">
            <div class="sum-footer-unit sum-footer-warn">小计</div>
            <div class="sum-footer-unit">{{item.staffType}}</div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit">{{item.amountsPayable}}</div>
            <div class="sum-footer-unit">{{item.socialInsurance}}</div>
            <div class="sum-footer-unit">{{item.largeInsurance}}</div>
            <div class="sum-footer-unit">{{item.providentFund}}</div>
            <div class="sum-footer-unit">{{item.foodExpenses}}</div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit">{{item.totalDeductions}}</div>
            <div class="sum-footer-unit">{{item.amountPayable}}</div>
            <div class="sum-footer-unit">{{item.amountActual}}</div>
            <div class="sum-footer-unit">{{item.wageBalance}}</div>
            <div class="sum-footer-unit"></div>
          </div>
        </div>
        <div v-if="selectData.type==='招待费'">
          <div ref="subtotalRef" v-for="(item, index) in tableSubtotal" :key="index" class="sum-footer">
            <div class="sum-footer-unit sum-footer-warn">小计</div>
            <div class="sum-footer-unit">{{item.category}}</div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit">{{item.entertainAmount}}</div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
          </div>
        </div>
        <div v-if="selectData.type==='办公费用'">
          <div ref="subtotalRef" v-for="(item, index) in tableSubtotal" :key="index" class="sum-footer">
            <div class="sum-footer-unit sum-footer-warn">小计</div>
            <div class="sum-footer-unit">{{item.category}}</div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit">{{item.officeAmount}}</div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit"></div>
          </div>
        </div>
      </div>
    </el-table>
    <el-dialog :title="isEdit ? `编辑${selectData.type}数据` : `新增${selectData.type}数据`" :visible.sync="showForm">
      <rear-wage v-if="selectData.type==='人员工资'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-s-s-fund v-if="selectData.type==='社保公积金'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-utility-fee v-if="selectData.type==='水电气费'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-testing-fee v-if="selectData.type==='检测费'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-entertain v-if="selectData.type==='招待费'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-office v-if="selectData.type==='办公费用'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-meal v-if="selectData.type==='伙食费'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-travel v-if="selectData.type==='差旅资料'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-consulting-fee v-if="selectData.type==='咨询费'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-welfare v-if="selectData.type==='员工福利'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <rear-equipment v-if="selectData.type==='机械设备'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
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
import RearTravel from '../components/RearTravel'
import RearConsultingFee from '../components/RearConsultingFee'
import RearWelfare from '../components/RearWelfare'
import RearEquipment from '../components/RearEquipment'
export default {
  name: 'Rear',
  components: { RearEquipment, RearWelfare, RearConsultingFee, RearTravel, RearMeal, RearOffice, RearEntertain, RearTestingFee, RearUtilityFee, RearSSFund, RearWage },
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
      tableSubtotal: [],
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
            this.tableHead = thead.travel
            this.isSummary = false
            break
          case '咨询费':
            this.tableHead = thead.consultingFee
            this.isSummary = false
            break
          case '员工福利':
            this.tableHead = thead.staffWelfare
            this.isSummary = true
            break
          case '机械设备':
            this.tableHead = thead.machinery
            this.isSummary = true
            break
        }
        this.getList()
        // this.$ref.tableDataRef.doLayout()
      },
      deep: true
    }
  },
  methods: {
    adjustWidth () {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.tableDataRef && this.$refs.subtotalRef) {
          const width = getComputedStyle(this.$refs.tableDataRef.$refs.headerWrapper.querySelector('table')).width
          this.$refs.subtotalRef.forEach(item => { item.style = 'width:' + width })
          Array.from(this.$refs.tableDataRef.$refs.headerWrapper.querySelectorAll('col')).forEach((n, i) => {
            if (n.getAttribute('width') === '0') return
            this.$refs.subtotalRef.forEach(item => { item.children[i].style = 'width:' + n.getAttribute('width') + 'px' })
          })
        }
      })
    },
    getList () {
      if (!this.selectData.month || !this.selectData.type) {
        this.$message({ type: 'warning', message: '请选择查询类别', duration: 1000 })
        return
      }
      switch (this.selectData.type) {
        case '人员工资':
          this.$api.rear.getWageList({ wageDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
            this.tableSubtotal = rsp.total.filter(item => !!item)
            this.adjustWidth()
          })
          break
        case '社保公积金':
          this.$api.rear.getSSFundList({ socialSecurityDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '水电气费':
          this.$api.rear.getUtilityList({ hydropowerDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '检测费':
          this.$api.rear.getTestingList({ detectDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '招待费':
          this.$api.rear.getEntertainList({ entertainDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
            this.tableSubtotal = rsp.total.filter(item => !!item)
            this.adjustWidth()
          })
          break
        case '办公费用':
          this.$api.rear.getOfficeList({ officeDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
            this.tableSubtotal = rsp.total.filter(item => !!item)
            this.adjustWidth()
          })
          break
        case '伙食费':
          this.$api.rear.getMealList({ foodDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '差旅资料':
          this.$api.rear.getTravelList({ travelDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '咨询费':
          this.$api.rear.getConsultingList({ advisoryDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '员工福利':
          this.$api.rear.getWelfareList({ welfareDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '机械设备':
          this.$api.rear.getMachineryList({ equipmentDate: this.selectData.month }).then(rsp => {
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
      }).catch(() => { this.$message({ type: 'info', message: '已取消删除', duration: 1000 }) })
    },
    deleteItem (item) {
      switch (this.selectData.type) {
        case '人员工资':
          this.$api.rear.delWageItem({ wageId: item.wageId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '社保公积金':
          this.$api.rear.delSSFundItem({ socialSecurityId: item.socialSecurityId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '水电气费':
          this.$api.rear.delUtilityItem({ hydropowerId: item.hydropowerId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '检测费':
          this.$api.rear.delTestingItem({ detectId: item.detectId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '招待费':
          this.$api.rear.delEntertainItem({ entertainId: item.entertainId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '办公费用':
          this.$api.rear.delOfficeItem({ officeId: item.officeId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '伙食费':
          this.$api.rear.delMealItem({ foodId: item.foodId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '差旅资料':
          this.$api.rear.delTravelItem({ travelId: item.travelId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '咨询费':
          this.$api.rear.delConsultingItem({ advisoryId: item.advisoryId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '员工福利':
          this.$api.rear.delWelfareItem({ welfareId: item.welfareId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else {
              this.$message.error(rsp.resultText)
            }
          })
          break
        case '机械设备':
          this.$api.rear.delMachineryItem({ equipmentId: item.equipmentId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getList()
            } else {
              this.$message.error(rsp.resultText)
            }
          })
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
        // case '检测费':
        //   break
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
        // case '差旅资料':
        //   break
        // case '咨询费':
        //   break
        case '员工福利':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.welfareAmount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'welfareAmount') sums[index] = demo
          })
          break
        case '机械设备':
          demo = []
          data.forEach((columns) => {
            demo[0] = this.$utils.add(columns.currentPayment, demo[0])
            demo[1] = this.$utils.add(columns.equipmentAmount, demo[1])
            demo[2] = this.$utils.add(columns.tax, demo[2])
          })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            switch (columns.property) {
              case 'currentPayment': sums[index] = demo[0]
                break
              case 'equipmentAmount': sums[index] = demo[1]
                break
              case 'tax': sums[index] = demo[2]
                break
            }
          })
          break
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
.el-table .sum-footer:nth-child(2) {
  border-top: 1px solid #EBEEF5;
}
  .sum-footer {
    /*overflow:scroll;*/
    /*width: inherit;*/
    display:flex;
    display:-webkit-flex;
    line-height:40px;
    color:#606266;
    /*overflow: hidden;*/
  }
  .sum-footer-unit {
    flex-grow:1;
    -webkit-flex-grow:1;
    text-indent:10px;
    font-size:14px;
    font-weight: bold;
    background: #FFEFD5;
  }
  .sum-footer-warn {
    background: #FFEFD5;
    font-weight: bold;
  }
</style>
