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
          <!--<el-radio-button label="路牙、盖板成本">路牙、盖板成本</el-radio-button>-->
          <el-radio-button label="固定资产投入">固定资产投入</el-radio-button>
          <el-radio-button label="车间制造费用明细">车间制造费用明细</el-radio-button>
          <el-radio-button label="产品库存表">产品库存表</el-radio-button>
          <el-radio-button label="原材料库存表">原材料库存表</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div style="text-align: right" v-if="selectData.type==='成本汇总表' || selectData.type==='固定资产投入' || selectData.type === '产品库存表' || selectData.type === '管理费用明细' || selectData.type === '车间制造费用明细'">
      <el-button-group>
        <el-button @click="handleDelete" type="warning">删除选中行</el-button>
        <!--<el-button @click="handleEditShow" type="warning">编辑选中行</el-button>-->
        <el-button @click="handleShow" type="primary" icon="el-icon-plus">新增数据</el-button>
      </el-button-group>
    </div>
    <el-table
      ref="tableData" v-if="selectData.type!=='成本汇总表'" :data="tableData" border style="width: 100%" header-cell-class-name="top-table" highlight-current-row
      :show-summary="isSummary" :summary-method="getSummaries" @current-change="handleCurrentChange">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label">
        <el-table-column v-for="it in item.children" :key="it.prop" :prop="it.prop" :label="it.label">
          <el-table-column v-for="i in it.children" :key="i.prop" :prop="i.prop" :label="i.label"/>
        </el-table-column>
      </el-table-column>
    </el-table>
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
      <cost-fixed v-if="selectData.type==='固定资产投入'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <cost-product-store v-if="selectData.type==='产品库存表'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <cost-manage-fee v-if="selectData.type==='管理费用明细'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh" />
      <cost-workshop v-if="selectData.type==='车间制造费用明细'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh" />
      <cost-summary-sheet v-if="selectData.type==='成本汇总表'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    </el-dialog>
  </div>
</template>

<script>
import thead from '@/util/costThead'
import CostFixed from '../components/CostFixed'
import CostProductStore from '../components/CostProductStore'
import CostManageFee from '../components/CostManageFee'
import CostWorkshop from '../components/CostWorkshop'
import CostSummarySheet from '../components/CostSummarySheet'
export default {
  name: 'Cost',
  components: { CostSummarySheet, CostWorkshop, CostManageFee, CostProductStore, CostFixed },
  data () {
    return {
      selectData: {
        month: this.$utils.toDateString(new Date(), 'yyyy-MM'),
        type: '成本汇总表'
      },
      tableHead: thead.fixed,
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
          case '成本汇总表':
            this.tableHead = thead.summarySheet
            this.isSummary = false
            break
          case '管理费用明细':
            this.tableHead = thead.manageFee
            this.isSummary = true
            break
          case '陶粒板产品成本表':
            this.tableHead = thead.ceramsitePlate
            this.isSummary = true
            break
          case '路牙、盖板成本':
            this.tableHead = thead.roadBoard
            this.isSummary = false
            break
          case '固定资产投入':
            this.tableHead = thead.fixed
            this.isSummary = true
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
        }
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
        case '陶粒板产品成本表':
          this.$api.cost.getCeramsitePlate({ materialDate: this.selectData.month }).then(rsp => {
            console.log(rsp.data)
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '路牙、盖板成本':
          this.$api.cost.getTestingList({ detectDate: this.selectData.month }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '固定资产投入':
          this.$api.cost.getFixedList({ fixAssetDate: this.selectData.month }).then(rsp => {
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
        // case '陶粒板产品成本表':
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
        case '固定资产投入':
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
        case '陶粒板产品成本表':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.materialAmount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'materialAmount') sums[index] = demo
          })
          break
        case '路牙、盖板成本':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.officeAmount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'officeAmount') sums[index] = demo
          })
          break
        case '固定资产投入':
          demo = []
          data.forEach((columns) => {
            demo[0] = this.$utils.add(columns.currentPayment, demo[0])
            demo[1] = this.$utils.add(columns.amountReceipt, demo[1])
            demo[2] = this.$utils.add(columns.taxReceipt, demo[2])
          })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            switch (columns.property) {
              case 'currentPayment': sums[index] = demo[0]
                break
              case 'amountReceipt': sums[index] = demo[1]
                break
              case 'taxReceipt': sums[index] = demo[2]
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
</style>
