<template>
  <div>
    <el-form :inline="true" class="top-form">
      <el-select v-model="searchData.projectId" size="small" filterable placeholder="选择项目" @change="changeOption">
        <el-option
          v-for="item in projects" :key="item.projectId"
          :label="item.projectName" :value="item.projectId">
        </el-option>
      </el-select>
      <el-select v-model="searchData.engineeringId" size="small" clearable filterable placeholder="选择工程性质" @change="changeOption">
        <el-option
          v-for="item in types" :key="item.engineeringId"
          :label="item.engineeringNature" :value="item.engineeringId">
        </el-option>
      </el-select>
      <!--<el-date-picker-->
        <!--v-model="searchData.range"-->
        <!--type="daterange"-->
        <!--range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"-->
        <!--size="small" value-format="yyyy-MM-dd" :picker-options="pickerOptions">-->
      <!--</el-date-picker>-->
      <el-button style="float: right" @click="handleOutput" size="small" type="primary">导出数据</el-button>
    </el-form>
    <el-table
      ref="tableData" id="tableData" :data="tableData" show-summary :summary-method="getSummaries"
      border style="width: 100%" header-cell-class-name="top-table" highlight-current-row>
      <el-table-column type="index"/>
      <el-table-column prop="projectName" label="项目"/>
      <el-table-column prop="projectNumber" label="项目号" />
      <el-table-column prop="partyAName" label="甲方单位名称" />
      <el-table-column prop="engineeringNature" label="工程性质" />
      <el-table-column prop="contractPriceDemo" label="合同价" />
      <el-table-column prop="settlementPriceDemo" label="上报结算价" />
      <el-table-column prop="cumulativeOutputValue" label="累计产值" />
      <el-table-column prop="invoiceTotalDemo" label="开票合计" />
      <el-table-column prop="receiptTotalDemo" label="已收款合计" />
    </el-table>
  </div>
</template>

<script>
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'
	import thead from '../util/theadData'
	export default {
		name: "SummarySheet",
		data () {
			return {
				searchData: {
					// range: '',
					projectId: ''
				},
				selectData: {
					projectId: 0,
					engineeringId: 0
        },
				tableHead: thead.summary,
				tableData: [],
				projects: [],
				types: [],
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
				}
			}
		},
		created () {
			this.getProjects()
      this.getSummary()
		},
		methods: {
			getProjects () {
				this.$api.getProjectsAndAll().then(rsp => {
					this.projects = rsp.data
          this.searchData.projectId = 0
				})
				this.$api.getEngineer().then(rsp => {
					this.types = rsp.data
					// this.searchData.engineeringId = 0
				})
			},
			getSummary () {
				// if (this.searchData.range) {
					this.$api.getSummary(this.selectData).then(rsp => {
						this.$message({ type: 'success', message: '查询成功', duration: 1000 })
						this.tableData = rsp.data.map(item => {
							Object.assign(item, {
								contractPriceDemo: this.$utils.commafy(item.contractPrice, {digits: 2}),
								invoiceTotalDemo: this.$utils.commafy(item.invoiceTotal, {digits: 2}),
								receiptTotalDemo: this.$utils.commafy(item.receiptTotal, {digits: 2}),
								settlementPriceDemo: this.$utils.commafy(item.settlementPrice, {digits: 2})
							})
							return item
						})
					})
				// }
			},
			changeOption() {
        this.selectData.projectId = this.searchData.projectId
				this.selectData.engineeringId = this.searchData.engineeringId || 0
        this.getSummary()
      },
			getSummaries (param) {
				const { columns, data } = param;
        if (columns.length === 0) return false
				let sums = [], demo = [0,0,0,0,0];
				data.forEach((columns) => {
					demo[0] = this.$utils.add(columns.contractPrice, demo[0])
					demo[1] = this.$utils.add(columns.settlementPrice, demo[1])
					demo[2] = this.$utils.add(columns.invoiceTotal, demo[2])
					demo[3] = this.$utils.add(columns.receiptTotal, demo[3])
					demo[4] = this.$utils.add(columns.cumulativeOutputValue, demo[4])
				})
        console.log(demo)
				columns.forEach((columns, index) => {
					if (index === 0) sums[index] = '合计'
					switch (columns.property) {
						case 'contractPriceDemo':
							sums[index] = this.$utils.commafy(demo[0], {digits: 2})
							break
						case 'settlementPriceDemo':
							sums[index] = this.$utils.commafy(demo[1], {digits: 2})
							break
						case 'invoiceTotalDemo':
							sums[index] = this.$utils.commafy(demo[2], {digits: 2})
							break
						case 'receiptTotalDemo':
							sums[index] = this.$utils.commafy(demo[3], {digits: 2})
							break
						case 'cumulativeOutputValue':
							sums[index] = this.$utils.commafy(demo[4], {digits: 2})
							break
					}
				})
        return sums
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
						'应收工程款汇总表.xlsx'
					)
				} catch (e) {
					if (typeof console !== 'undefined') console.log(e, wbout)
				}
				return wbout
			}
		}
	}
</script>

<style scoped>

</style>
