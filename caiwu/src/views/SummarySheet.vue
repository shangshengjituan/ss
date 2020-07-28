<template>
  <div>
    <el-form :inline="true" class="top-form">
      <el-form-item label="月份">
        <!--<el-date-picker-->
        <!--v-model="searchData.month" format="yyyy年MM月" value-format="yyyy-MM" size="small"-->
        <!--type="month" placeholder="选择月" :editable="false" :clearable="false"></el-date-picker>-->
      </el-form-item>
    </el-form>
    <div style="text-align: right">
      <el-button-group>
        <el-button @click="handleDelete" type="warning">删除选中行</el-button>
        <el-button @click="handleEditShow" type="warning">编辑选中行</el-button>
        <el-button @click="handleShow" type="primary" icon="el-icon-plus">新增数据</el-button>
      </el-button-group>
    </div>
    <el-table
      ref="tableData" :data="tableData" border style="width: 100%" header-cell-class-name="top-table" highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column type="index"/>
      <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label" />
    </el-table>
  </div>
</template>

<script>
	import thead from '../util/theadData'
	export default {
		name: "SummarySheet",
		data () {
			return {
				searchData: {
					range: '',
				},
				selectData: {},
				projects: [],
				parties: [],
				tableHead: thead.summary,
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
				if (!this.searchData.range || !this.searchData.type) {
					this.$message.warning('请选择查询类别')
					return
				}
				this.$api.getInvoices(this.selectData).then(rsp => {
					this.$message({ type: 'success', message: '查询成功', duration: 1000 })
					this.tableData = rsp.data
				})
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
				this.$api.deleteInvoice({ invoiceId: item.invoiceId }).then(rsp => {
					if (rsp.result === 200) {
						this.$message({ type: 'success', message: '删除成功', duration: 1000 })
						this.getList()
					} else { this.$message.error(rsp.resultText) }
				})
			}
		}
	}
</script>

<style scoped>

</style>
