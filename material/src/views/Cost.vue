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
          <el-radio-button label="车间制造费用明细">车间制造费用明细</el-radio-button>
          <el-radio-button label="陶粒板产品成本">陶粒板产品成本</el-radio-button>
          <!--<el-radio-button label="路牙、盖板成本">路牙、盖板成本</el-radio-button>-->
          <el-radio-button label="固定资产成本">固定资产成本</el-radio-button>
          <el-radio-button label="产品销售利润">产品销售利润</el-radio-button>
          <el-radio-button label="产品库存表">产品库存表</el-radio-button>
          <el-radio-button label="原材料库存表">原材料库存表</el-radio-button>
          <el-radio-button label="收付款表">收付款表</el-radio-button>
          <el-radio-button label="合同表">合同表</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="float: right;" v-if="selectData.type==='成本汇总表' || selectData.type==='固定资产成本' || selectData.type === '产品库存表' || selectData.type === '管理费用明细' || selectData.type === '车间制造费用明细'">
        <el-button-group>
          <el-button @click="handleDelete" size="small" type="warning">删除选中行</el-button>
          <!--<el-button @click="handleEditShow" type="warning">编辑选中行</el-button>-->
          <el-button @click="handleShow" size="small" type="primary" icon="el-icon-plus">新增数据</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <div v-if="selectData.type!=='成本汇总表'" >
      <el-table
        ref="tableData" :data="tableData" border style="width: 100%" header-cell-class-name="top-table" highlight-current-row
        :span-method="mergeCells"
        :show-summary="isSummary" :summary-method="getSummaries" @current-change="handleCurrentChange">
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label">
          <el-table-column v-for="it in item.children" :key="it.prop" :prop="it.prop" :label="it.label">
            <el-table-column v-for="i in it.children" :key="i.prop" :prop="i.prop" :label="i.label"/>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table v-show="tableDataOnly.length" :data="tableDataOnly" border header-cell-class-name="top-table" show-summary>
        <el-table-column type="index" label="" width="50"></el-table-column>
        <el-table-column v-for="item in tableHeadOnly" :key="item.prop" :prop="item.prop" :label="item.label">
          <el-table-column v-for="it in item.children" :key="it.prop" :prop="it.prop" :label="it.label">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table v-show="tableDataExtra.length" :data="tableDataExtra" border header-cell-class-name="top-table-extra" :show-summary="isTotal">
        <el-table-column type="index" label="" width="50"></el-table-column>
        <el-table-column prop="costSource" label="项目" width="160"></el-table-column>
        <el-table-column prop="cost" label="小计" width="160"></el-table-column>
        <!--<el-table-column v-for="item in tableHead.extra" :key="item.prop" :prop="item.prop" :label="item.label">-->
        <!--</el-table-column>-->
      </el-table>
    </div>
    <el-table v-else
      ref="tableDataRef" :data="tableData" border style="width: 100%" header-cell-class-name="top-table" highlight-current-row
      row-key="costIndex" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :show-summary="isSummary" :summary-method="getSummaries" @current-change="handleCurrentChange">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column label="分类" class-name="icon" prop="costSort"></el-table-column>
      <el-table-column label="项目" prop="costProject"></el-table-column>
      <el-table-column label="项目" prop="costAmount"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <!--<el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label" />-->
      <div slot="append">
        <div v-if="selectData.type==='成本汇总表'">
          <div ref="subtotalRef" v-for="(item, index) in tableSubtotal" :key="index" class="sum-footer">
            <div class="sum-footer-unit sum-footer-warn">小计</div>
            <div class="sum-footer-unit">{{item.costProject}}</div>
            <div class="sum-footer-unit"></div>
            <div class="sum-footer-unit">{{item.costAmount}}</div>
            <div class="sum-footer-unit"></div>
          </div>
        </div>
      </div>
    </el-table>
    <el-dialog :title="isEdit ? `编辑 ${selectData.type} 数据` : `新增 ${selectData.type} 数据`" :visible.sync="showForm">
      <cost-fixed v-if="selectData.type==='固定资产成本'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <cost-product-store v-if="selectData.type==='产品库存表'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <cost-manage-fee v-if="selectData.type==='管理费用明细'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh" />
      <cost-workshop v-if="selectData.type==='车间制造费用明细'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh" />
      <cost-summary-sheet v-if="selectData.type==='成本汇总表'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    </el-dialog>
  </div>
</template>

<script>
import thead from '@/util/costThead'
import CostFixed from '../components/Cost/CostFixed'
import CostProductStore from '../components/Cost/CostProductStore'
import CostManageFee from '../components/Cost/CostManageFee'
import CostWorkshop from '../components/Cost/CostWorkshop'
import CostSummarySheet from '../components/Cost/CostSummarySheet'
export default {
  name: 'Cost',
  components: { CostSummarySheet, CostWorkshop, CostManageFee, CostProductStore, CostFixed },
  data () {
    return {
      selectData: {
        month: this.$utils.toDateString(new Date(), 'yyyy-MM'),
        type: '成本汇总表'
      },
      tableHead: thead.summarySheet,
      tableHeadOnly: thead.ceramsitePlate,
      isSummary: true,
      showForm: false,
      isEdit: false,
      baseData: {},
      tableData: [],
      tableDataExtra: [],
      isTotal: true,
      tableDataOnly: [],
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
          case '成本汇总表':
            this.tableHead = thead.summarySheet
            this.isSummary = false
            break
          case '管理费用明细':
            this.tableHead = thead.manageFee
            this.isSummary = true
            break
          case '陶粒板产品成本':
            this.tableHead = thead.ceramsitePlate
            this.isSummary = true
            break
          case '路牙、盖板成本':
            this.tableHead = thead.roadBoard
            this.isSummary = false
            break
          case '固定资产成本':
            this.tableHead = thead.fixed
            this.isSummary = true
            break
          case '产品销售利润':
            this.tableHead = thead.saleProfit
            this.isSummary = false
            break
          case '车间制造费用明细':
            this.tableHead = thead.workshop
            this.isSummary = true
            break
          case '产品库存表':
            this.tableHead = thead.productStore
            this.isSummary = false
            break
          case '原材料库存表':
            this.tableHead = thead.materialStore
            this.isSummary = true
            break
          case '收付款表':
            this.tableHead = thead.receiptAndPay
            this.isSummary = false
            break
          case '合同表':
            this.tableHead = thead.contract
            this.isSummary = false
            break
        }
        this.tableData = []
        this.tableDataExtra = []
        this.tableDataOnly = []
        this.getList()
      },
      deep: true
    },
    tableData: {
      handler (val, old) {
      },
      deep: true
    }
  },
  methods: {
    adjustWidth () {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.tableDataRef && this.$refs.subtotalRef) {
          // const width = getComputedStyle(this.$refs.tableDataRef.$refs.headerWrapper.querySelector('table')).width
          // this.$refs.subtotalRef.forEach(item => { item.style = 'width:' + width })
          this.$refs.tableDataRef.$refs.headerWrapper.querySelectorAll('col').forEach((n, i) => {
            if (n.getAttribute('width') === '0') return
            this.$refs.subtotalRef.forEach(item => { item.children[i].style = 'width:' + n.getAttribute('width') + 'px' })
          })
        }
        if (this.$refs && this.$refs.tableData && this.$refs.subtotalRef) {
          // const width = getComputedStyle(this.$refs.tableData.$refs.headerWrapper.querySelector('table')).width
          // this.$refs.subtotalRef.forEach(item => { item.style = 'width:' + width })
          this.$refs.tableData.$refs.headerWrapper.querySelectorAll('col').forEach((n, i) => {
            if (n.getAttribute('width') === '0') return
            this.$refs.subtotalRef.forEach(item => { item.children[i].style = 'width:' + n.getAttribute('width') + 'px' })
          })
        }
      })
    },
    getList () {
      if (!this.selectData.month || !this.selectData.type) {
        this.$message.warning('请选择查询类别')
        return
      }
      switch (this.selectData.type) {
        case '成本汇总表':
          this.$api.cost.getSummarySheet({ costSummaryDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
            this.tableSubtotal = rsp.total.filter(item => !!item)
            this.adjustWidth()
            // this.$refs.tableDataRef.doLayout()
          })
          break
        case '管理费用明细':
          this.$api.cost.getManageFee({ costDetailDate: this.selectData.month, costType: '管理费用' }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
            // this.$refs.tableData.doLayout()
          })
          break
        case '陶粒板产品成本':
          this.$api.cost.getCeramsitePlate({ materialDate: this.selectData.month }).then(rsp => {
            console.log(rsp.data)
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
            this.tableDataExtra = rsp.total.filter(item => !!item)
            this.isTotal = true
            // this.adjustWidth()
          })
          break
        case '固定资产成本':
          this.$api.cost.getFixedList({ fixAssetDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.partA
            this.tableDataOnly = rsp.data
            this.tableDataExtra = rsp.total.filter(item => !!item)
            this.isTotal = true
          })
          break
        case '产品销售利润':
          this.$api.cost.getSaleProfit({ saleProfitDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
            this.tableDataExtra = rsp.total.filter(item => !!item)
            this.isTotal = false
          })
          break
        case '路牙、盖板成本':
          this.$api.cost.getTestingList({ detectDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '车间制造费用明细':
          this.$api.cost.getWorkshop({ costDetailDate: this.selectData.month, costType: '车间制造费用' }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '产品库存表':
          this.$api.cost.getProductStoreList({ productInventoryDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '原材料库存表':
          this.$api.cost.getMaterialStore({ materialDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '收付款表':
          this.$api.cost.getProductStoreList({ productInventoryDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '合同表':
          this.$api.cost.getMaterialStore({ materialDate: this.selectData.month }).then(rsp => {
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
      if (JSON.stringify(this.currentRow) === '{}') return
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        .then(() => {
          this.deleteItem(this.currentRow)
        }).catch(() => { this.$message({ type: 'info', message: '已取消删除', duration: 1000 }) })
    },
    deleteItem (item) {
      switch (this.selectData.type) {
        case '成本汇总表':
          this.$api.cost.delSummarySheet({ costSummaryId: item.costSummaryId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '管理费用明细':
          this.$api.cost.delManageFee({ costDetailId: item.costDetailId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        // case '陶粒板产品成本':
        //   this.$api.cost.delUtilityItem({ hydropowerId: item.hydropowerId }).then(rsp => {
        //     if (rsp.result === 200) {
        //       this.$message({ type: 'success', message: '删除成功', duration: 1000 })
        //       this.getList()
        //     } else { this.$message.error(rsp.resultText) }
        //   })
        //   break
        case '路牙、盖板成本':
          this.$api.cost.delTestingItem({ detectId: item.detectId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '固定资产成本':
          this.$api.cost.delFixedItem({ fixAssetId: item.fixAssetId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '车间制造费用明细':
          this.$api.cost.delWorkshop({ costDetailId: item.costDetailId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '产品库存表':
          this.$api.cost.delProductStoreItem({ productInventoryId: item.productInventoryId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        // case '原材料库存表':
        //   this.$api.cost.delTravelItem({ travelId: item.travelId }).then(rsp => {
        //     if (rsp.result === 200) {
        //       this.$message({ type: 'success', message: '删除成功', duration: 1000 })
        //       this.getList()
        //     } else { this.$message.error(rsp.resultText) }
        //   })
        //   break
      }
    },
    filterData (arr) {
      const spanOneArr = []
      let concatOne = 0
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
        } else {
          // name 修改
          if (item.name === arr[index - 1].name) { // 第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1
            spanOneArr.push(0)
          } else {
            spanOneArr.push(1)
            concatOne = index
          }
        }
      })
      return {
        one: spanOneArr
      }
    },
    mergeCells (params) {
      const { rowIndex, columnIndex } = params
      if (columnIndex === 1) {
        // this.tableData  修改
        const _row = (this.filterData(this.tableData).one)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getSummaries (params) {
      const sums = []
      const { columns, data } = params
      let demo
      switch (this.selectData.type) {
        // case '成本汇总表':
        //   break
        case '管理费用明细':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.amount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'amount') sums[index] = demo
          })
          break
        case '陶粒板产品成本':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.materialAmount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'materialAmount') sums[index] = demo
          })
          break
        // case '路牙、盖板成本':
        //   demo = 0
        //   data.forEach((columns) => { demo = this.$utils.add(columns.officeAmount, demo) })
        //   columns.forEach((columns, index) => {
        //     if (index === 0) sums[index] = '合计'
        //     if (columns.property === 'officeAmount') sums[index] = demo
        //   })
        //   break
        case '固定资产成本':
          demo = []
          data.forEach((columns) => {
            demo[0] = this.$utils.add(columns.amountTax, demo[0])
            demo[1] = this.$utils.add(columns.amount, demo[1])
            demo[2] = this.$utils.add(columns.tax, demo[2])
          })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            switch (columns.property) {
              case 'amountTax': sums[index] = demo[0]
                break
              case 'amount': sums[index] = demo[1]
                break
              case 'tax': sums[index] = demo[2]
                break
            }
          })
          break
        case '车间制造费用明细':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.amount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'amount') sums[index] = demo
          })
          break
        // case '产品库存表':
        //   break
        case '原材料库存表':
          demo = []
          data.forEach((columns) => {
            demo[0] = this.$utils.add(columns.amountPurchaseReceipt, demo[0])
            demo[1] = this.$utils.add(columns.amountPurchase, demo[1])
            demo[2] = this.$utils.add(columns.amountInventory, demo[2])
          })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            switch (columns.property) {
              case 'amountPurchaseReceipt': sums[index] = demo[0]
                break
              case 'amountPurchase': sums[index] = demo[1]
                break
              case 'amountInventory': sums[index] = demo[2]
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

<style>
  .el-dialog {
    margin-top: 5vh;
  }
  .el-table__expand-icon {
    float: right;
  }
  .el-table thead.is-group th {
    padding: 3px 0;
  }
</style>
