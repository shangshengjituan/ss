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
      <el-form-item>
        <el-select v-model="searchData.projectId" size="small" clearable filterable placeholder="选择项目">
          <el-option
            v-for="item in projects" :key="item.projectId"
            :label="item.projectName" :value="item.projectId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="this.searchData.type === '合同价款'">
        <el-select v-model="searchData.engineeringId" size="small" placeholder="选择工程性质">
          <el-option
            v-for="item in types" :key="item.engineeringId"
            :label="item.engineeringNature" :value="item.engineeringId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button style="float: right" @click="handleOutput" size="small" type="primary">导出数据</el-button>
    </el-form>
    <div style="text-align: right">
      <el-button-group>
        <el-button @click="handleDelete" size="small" type="warning">删除选中行</el-button>
        <el-button @click="handleEditShow" size="small" type="warning">编辑选中行</el-button>
        <el-button @click="handleShow" size="small" type="primary" icon="el-icon-plus">新增数据</el-button>
      </el-button-group>
    </div>
    <el-table
      ref="tableData" id="tableData" :data="tableData" border style="width: 100%" header-cell-class-name="top-table" highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column  type="index"/>
      <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label" />
    </el-table>
    <el-dialog width="80%" :title="isEdit ? `编辑 ${searchData.type} 数据` : `新增 ${searchData.type} 数据`" :visible.sync="showForm">
      <invoice-sheet v-if="searchData.type==='发票情况'" :projects="projectsNotAll" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <receipt-sheet v-if="searchData.type==='收款情况'" :projects="projectsNotAll" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <contract-sheet v-if="searchData.type==='合同价款'" :types="typesNotAll" :projects="projectsNotAll" :parties="parties" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    </el-dialog>
  </div>
</template>

<script>
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'
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
					type: '发票情况',
					engineeringId: 0
				},
        selectData: {},
        projectsNotAll: [],
				projectsAndAll: [],
				projects: [],
				parties: [],
				typesNotAll: [],
        typesAddAll: [],
        types: [],
				tableHead: thead.invoice,
				showForm: false,
				isEdit: false,
				baseData: {},
				tableData: [],
				pickerOptions: {
					shortcuts: [{
						text: '最近一月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '今年',
						onClick(picker) {
							const now = new Date();
							const start = now.getFullYear()+ '-01-01';
							picker.$emit('pick', [new Date(start), now]);
						}
					}, {
						text: '去年',
						onClick(picker) {
							const now = new Date();
							const end = now.getFullYear()-1+ '-12-31';
							const start = now.getFullYear()-1+ '-01-01';
							picker.$emit('pick', [new Date(start), new Date(end)]);
						}
					}]
				},
				currentRow: {}
      }
    },
		created () {
			this.getProjects()
			// this.projects = this.projectsNotAll
		},
		watch: {
			searchData: {
				handler (val) {
					switch (val.type) {
						case '发票情况':
							this.tableHead = thead.invoice
              this.projects = this.projectsNotAll
							break
						case '收款情况':
							this.tableHead = thead.receipt
							this.projects = this.projectsNotAll
							break
						case '合同价款':
							this.tableHead = thead.contract
							this.projects = this.projectsAndAll
							break
					}
					this.tableData = []
					console.log(val)
					this.selectData.projectId = val.projectId || 0
					this.selectData.engineeringId = val.engineeringId || 0
          this.getList()
				},
				deep: true
			}
		},
		methods: {
			getProjects () {
				this.$api.getProjects().then(rsp => {
					this.projectsNotAll = rsp.data
					this.projects = this.projectsNotAll
				})
				this.$api.getParties().then(rsp => {
					this.parties = rsp.data
				})
				this.$api.getProjectsAndAll().then(rsp => {
					this.projectsAndAll = rsp.data
				})
				this.$api.getEngineer().then(rsp => {
					this.typesNotAll = rsp.data
				})
				this.$api.getEngineerAddAll().then(rsp => {
					this.typesAddAll = rsp.data
					this.types = this.typesAddAll
				})
      },
			getList () {
				switch (this.searchData.type) {
					case '发票情况':
						if (this.searchData.projectId) {
							this.$api.getInvoices({projectId: this.selectData.projectId}).then(rsp => {
								this.$message({ type: 'success', message: '查询成功', duration: 1000 })
								this.tableData = rsp.data.map(item => {
									Object.assign(item, {
										invoiceAmountDemo: this.$utils.commafy(item.invoiceAmount, {digits: 2}),
										taxDemo: this.$utils.commafy(item.tax, {digits: 2}),
										totalAmountDemo: this.$utils.commafy(item.totalAmount, {digits: 2})
									})
									return item
								})
							})
						}
						break
					case '收款情况':
						if (this.searchData.projectId) {
							this.$api.getReceipts({projectId: this.selectData.projectId}).then(rsp => {
								this.$message({ type: 'success', message: '查询成功', duration: 1000 })
								this.tableData = rsp.data.map(item => {
									Object.assign(item, {
										receiptAmountDemo: this.$utils.commafy(item.receiptAmount, {digits: 2}),
										taxDemo: this.$utils.commafy(item.tax, {digits: 2}),
										totalAmountDemo: this.$utils.commafy(item.totalAmount, {digits: 2})
									})
                  return item
                })
							})
						}
						break
					case '合同价款':
						this.$api.getContracts(this.selectData).then(rsp => {
							this.$message({ type: 'success', message: '查询成功', duration: 1000 })
							this.tableData = rsp.data.map(item => {
								Object.assign(item, {
									contractPriceDemo: this.$utils.commafy(item.contractPrice, {digits: 2}),
									settlementPriceDemo: this.$utils.commafy(item.settlementPrice, {digits: 2}),
								})
								return item
							})
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
				if (JSON.stringify(this.currentRow) === '{}') return false
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
				if (this.selectData.projectId|| this.selectData.projectId === 0) {
					this.getList()
				}
			},
			handleCurrentChange (val) {
				console.log(JSON.stringify(val))
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
								if (this.selectData.projectId|| this.selectData.projectId === 0) {
									this.getList()
								}
							} else { this.$message.error(rsp.resultText) }
						})
						break
					case '收款情况':
						this.$api.deleteReceipt({ receiptId: item.receiptId }).then(rsp => {
							if (rsp.result === 200) {
								this.$message({ type: 'success', message: '删除成功', duration: 1000 })
								if (this.selectData.projectId|| this.selectData.projectId === 0) {
									this.getList()
								}
							} else { this.$message.error(rsp.resultText) }
						})
						break
					case '合同价款':
						this.$api.deleteContract({ contractId: item.contractId }).then(rsp => {
							if (rsp.result === 200) {
								this.$message({ type: 'success', message: '删除成功', duration: 1000 })
								if (this.selectData.projectId|| this.selectData.projectId === 0) {
									this.getList()
								}
							} else { this.$message.error(rsp.resultText) }
						})
						break
				}
			},
			handleOutput () {
				// const temp = this.selectData.startTime + '至'+ this.selectData.endTime
				// console.log(temp)
				const xlsxParam = { raw: true }
				const wb = XLSX.utils.table_to_book(document.querySelector('#tableData'), xlsxParam) // 表格的id名
				console.log(wb)
				/* 获取二进制字符串作为输出 */
				const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
				console.log(wbout)
				try {
					FileSaver.saveAs(
						new Blob([wbout], { type: 'application/octet-stream' }),
						this.searchData.type + '.xlsx'
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
