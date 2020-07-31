<template>
  <div>
    <el-form :inline="true" class="top-form">
      <el-form-item>
        <el-radio-group v-model="searchData.type" size="small">
          <el-radio-button label="发票情况">发票情况</el-radio-button>
          <el-radio-button label="收款情况">收款情况</el-radio-button>
          <el-radio-button label="合同价款">合同价款</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="this.searchData.type !== '合同价款'">
        <el-date-picker
          v-model="searchData.range" type="daterange" size="small" value-format="yyyy-MM-dd"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <!--<el-date-picker-->
          <!--v-model="searchData.month" format="yyyy年MM月" value-format="yyyy-MM" size="small"-->
          <!--type="month" placeholder="选择月" :editable="false" :clearable="false"></el-date-picker>-->
      </el-form-item>
    </el-form>
    <div style="text-align: right">
      <el-button-group>
        <el-button @click="handleDelete" size="small" type="warning">删除选中行</el-button>
        <el-button @click="handleEditShow" size="small" type="warning">编辑选中行</el-button>
        <el-button @click="handleShow" size="small" type="primary" icon="el-icon-plus">新增数据</el-button>
      </el-button-group>
    </div>
    <el-table
      ref="tableData" :data="tableData" border style="width: 100%" header-cell-class-name="top-table" highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column  type="index"/>
      <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label" />
    </el-table>
    <el-dialog width="80%" :title="isEdit ? `编辑 ${searchData.type} 数据` : `新增 ${searchData.type} 数据`" :visible.sync="showForm">
      <invoice-sheet v-if="searchData.type==='发票情况'" :projects="projects" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <receipt-sheet v-if="searchData.type==='收款情况'" :projects="projects" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <contract-sheet v-if="searchData.type==='合同价款'" :projects="projects" :parties="parties" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    </el-dialog>
  </div>
</template>

<script>
  import thead from '../util/theadData'
	import InvoiceSheet from "../components/InvoiceSheet";
	import ReceiptSheet from "../components/ReceiptSheet";
	import ContractSheet from "../components/ContractSheet";
	export default {
		name: "Sheet",
		components: {ContractSheet, ReceiptSheet, InvoiceSheet},
		data () {
			return {
				searchData: {
					range: '',
					type: '发票情况'
				},
        selectData: {},
        projects: [],
				parties: [],
				tableHead: thead.invoice,
				showForm: false,
				isEdit: false,
				baseData: {},
				tableData: [],
				currentRow: {}
      }
    },
		created () {
			this.getProjects()
		},
		watch: {
			searchData: {
				handler (val) {
					switch (val.type) {
						case '发票情况':
							this.tableHead = thead.invoice
							break
						case '收款情况':
							this.tableHead = thead.receipt
							break
						case '合同价款':
							this.tableHead = thead.contract
							break
					}
					this.tableData = []
					console.log(val)
					this.selectData = Object.assign({}, {startTime: val.range[0], endTime: val.range[1]})
					this.getList()
				},
				deep: true
			}
		},
		methods: {
			getProjects () {
				this.$api.getProjects().then(rsp => {
					this.projects = rsp.data
				})
				this.$api.getParties().then(rsp => {
					this.parties = rsp.data
				})
      },
			getList () {
				switch (this.searchData.type) {
					case '发票情况':
						if (this.searchData.range) {
							this.$api.getInvoices(this.selectData).then(rsp => {
								this.$message({ type: 'success', message: '查询成功', duration: 1000 })
								this.tableData = rsp.data
							})
						}
						break
					case '收款情况':
						if (this.searchData.range) {
							this.$api.getReceipts(this.selectData).then(rsp => {
								this.$message({ type: 'success', message: '查询成功', duration: 1000 })
								this.tableData = rsp.data
							})
						}
						break
					case '合同价款':
						this.$api.getContracts().then(rsp => {
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
			handleEditShow () {
				this.showForm = true
				this.isEdit = true
				this.baseData = this.currentRow
				console.log(JSON.stringify(this.baseData))
			},
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
				switch (this.searchData.type) {
					case '发票情况':
						this.$api.deleteInvoice({ invoiceId: item.invoiceId }).then(rsp => {
							if (rsp.result === 200) {
								this.$message({ type: 'success', message: '删除成功', duration: 1000 })
								this.getList()
							} else { this.$message.error(rsp.resultText) }
						})
						break
					case '收款情况':
						this.$api.deleteReceipt({ receiptId: item.receiptId }).then(rsp => {
							if (rsp.result === 200) {
								this.$message({ type: 'success', message: '删除成功', duration: 1000 })
								this.getList()
							} else { this.$message.error(rsp.resultText) }
						})
						break
					case '合同价款':
						this.$api.deleteContract({ contractId: item.contractId }).then(rsp => {
							if (rsp.result === 200) {
								this.$message({ type: 'success', message: '删除成功', duration: 1000 })
								this.getList()
							} else { this.$message.error(rsp.resultText) }
						})
						break
				}
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
  /*.el-dialog {*/
    /*width: 80%;*/
  /*}*/
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
