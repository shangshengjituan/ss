<template>
  <div>
    <el-form :inline="true" class="top-form">
      <el-form-item label="供应商" v-if="selectData.type === '合同表'">
        <el-select v-model="selectData.supplierId" placeholder="请选择" class="width-full" filterable >
          <el-option v-for="item in providers" :key="item.supplierId" :label="item.supplier" :value="item.supplierId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="合同" v-else>
        <el-cascader v-model="selectData.contract" :options="contractTypes" :props="{ expandTrigger: 'hover' }" filterable class="width-full"></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="selectData.type" size="small">
          <el-radio-button label="合同表">合同表</el-radio-button>
          <el-radio-button label="发票表">发票表</el-radio-button>
          <el-radio-button label="实际付款表">实际付款表</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="float: right;" >
        <el-button-group>
          <el-button @click="handleDelete" size="small" type="warning">删除选中行</el-button>
          <!--<el-button @click="handleEditShow" type="warning">编辑选中行</el-button>-->
          <el-button @click="handleShow" size="small" type="primary" icon="el-icon-plus">新增数据</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <div>
      <el-table
        ref="tableData" :data="tableData" border style="width: 100%" header-cell-class-name="top-table" highlight-current-row
        :span-method="mergeCells"
        :show-summary="isSummary" :summary-method="getSummaries" @current-change="handleCurrentChange">
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="isEdit ? `编辑 ${selectData.type} 数据` : `新增 ${selectData.type} 数据`" :visible.sync="showForm">
      <invoice-invoice v-if="selectData.type==='发票表'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <invoice-contract v-if="selectData.type==='合同表'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <invoice-payment v-if="selectData.type==='实际付款表'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    </el-dialog>
  </div>
</template>

<script>
import thead from '@/util/invoiceThead'
import InvoiceInvoice from '../components/Invoice/InvoiceInvoice'
import InvoiceContract from '../components/Invoice/InvoiceContract'
import InvoicePayment from '../components/Invoice/InvoicePayment'
export default {
  name: 'Invoice',
  components: { InvoicePayment, InvoiceContract, InvoiceInvoice },
  data () {
    return {
      selectData: {
        contract: {},
        type: '发票表'
      },
      providers: [],
      contractTypes: [],
      tableHead: thead.invoice,
      // tableHeadOnly: thead.ceramsitePlate,
      isSummary: true,
      showForm: false,
      isEdit: false,
      baseData: {},
      tableData: [],
      // tableDataExtra: [],
      isTotal: true,
      // tableDataOnly: [],
      // tableSubtotal: [],
      currentRow: {}
    }
  },
  created () {
    this.getBase()
  },
  watch: {
    selectData: {
      handler (val, old) {
        switch (val.type) {
          case '合同表':
            this.tableHead = thead.contract
            this.isSummary = false
            break
          case '发票表':
            this.tableHead = thead.invoice
            this.isSummary = false
            break
          case '实际付款表':
            this.tableHead = thead.payment
            this.isSummary = false
            break
        }
        if (val.contract) {
          val.contractId = val.contract[1]
        }
        this.tableData = []
        // this.tableDataExtra = []
        // this.tableDataOnly = []
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
    getBase () {
      this.$api.material.getProviders().then(rsp => {
        this.providers = rsp.data
      })
      this.$api.invoice.getContractIds().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.supplierName,
            value: item.supplierId,
            children: []
          })
          if (item.contractAmountList) {
            item.contractAmountList.forEach(it => {
              temp[index].children.push({
                label: it.contractAmount || item.supplierName,
                value: it.contractId
              })
            })
          }
        })
        this.contractTypes = temp
      })
    },
    getList () {
      switch (this.selectData.type) {
        case '合同表':
          if (!this.selectData.supplierId || !this.selectData.type) {
            this.$message.warning('请选择查询类别')
            return
          }
          this.$api.invoice.getContracts({ supplierId: this.selectData.supplierId }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '发票表':
          if (!this.selectData.contractId || !this.selectData.type) {
            this.$message.warning('请选择查询类别')
            return
          }
          this.$api.invoice.getInvoices({ contractId: this.selectData.contractId }).then(rsp => {
            this.$message({ type: 'success', message: '查询成功', duration: 1000 })
            this.tableData = rsp.data
          })
          break
        case '实际付款表':
          if (!this.selectData.contractId || !this.selectData.type) {
            this.$message.warning('请选择查询类别')
            return
          }
          this.$api.invoice.getPayments({ contractId: this.selectData.contractId }).then(rsp => {
            console.log(rsp.data)
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
      this.getBase()
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
        case '发票表':
          this.$api.cost.delManageFee({ costDetailId: item.costDetailId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
        case '路牙、盖板成本':
          this.$api.cost.delTestingItem({ detectId: item.detectId }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功', duration: 1000 })
              this.getList()
            } else { this.$message.error(rsp.resultText) }
          })
          break
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
          if (item.supplierName === arr[index - 1].supplierName) { // 第一列需合并相同内容的判断条件
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
        case '发票表':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.amount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'amount') sums[index] = demo
          })
          break
        case '实际付款表':
          demo = 0
          data.forEach((columns) => { demo = this.$utils.add(columns.contractAmount, demo) })
          columns.forEach((columns, index) => {
            if (index === 0) sums[index] = '合计'
            if (columns.property === 'contractAmount') sums[index] = demo
          })
          break
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
  .el-table__expand-icon {
    float: right;
  }
  .el-table thead.is-group th {
    padding: 3px 0;
  }
</style>
