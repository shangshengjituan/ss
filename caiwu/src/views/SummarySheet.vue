<template>
  <div>
    <el-form :inline="true" class="top-form">
      <el-date-picker
        v-model="searchData.range"
        type="daterange"
        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
        size="small" value-format="yyyy-MM-dd" :picker-options="pickerOptions">
      </el-date-picker>
      <el-button style="float: right" @click="handleOutput" size="small" type="primary">导出数据</el-button>
    </el-form>
    <el-table
      ref="tableData" id="tableData" :data="tableData" border style="width: 100%" header-cell-class-name="top-table" highlight-current-row>
      <el-table-column type="index"/>
      <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label" />
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
					range: '',
				},
				selectData: {},
				tableHead: thead.summary,
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
				}
			}
		},
		created () {
			// this.getSummary()
		},
		watch: {
			searchData: {
				handler (val) {
					console.log(val)
					this.selectData = Object.assign({}, {startTime: val.range[0], endTime: val.range[1]})
					this.getSummary()
				},
				deep: true
			}
		},
		methods: {
			getSummary () {
				if (this.searchData.range) {
					this.$api.getSummary(this.selectData).then(rsp => {
						this.$message({ type: 'success', message: '查询成功', duration: 1000 })
						this.tableData = rsp.data
					})
				}
			},
			handleOutput () {
				const temp = this.selectData.startTime + '至'+ this.selectData.endTime
        console.log(temp)
				const xlsxParam = { raw: true }
				const wb = XLSX.utils.table_to_book(document.querySelector('#tableData'), xlsxParam) // 表格的id名
				console.log(wb)
				/* 获取二进制字符串作为输出 */
				const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        console.log(wbout)
				try {
					FileSaver.saveAs(
						new Blob([wbout], { type: 'application/octet-stream' }),
						temp + '应收工程款汇总表.xlsx'
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
