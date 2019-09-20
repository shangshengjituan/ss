<template>
  <div class="o-container">
    <el-form :inline="true" :model="searchData">
      <el-form-item label="类型：">
        <el-select v-model="searchData.groupEstimatedOrActual" placeholder="类型">
          <el-option label="全部" value="0"></el-option>
          <el-option label="预估" value="1"></el-option>
          <el-option label="实际" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：">
        <el-input v-model="searchData.groupYear" placeholder="年份"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      row-key="id"
      :indent="0"
      :tree-props="{children: 'groupQuarterList'}">
      <el-table-column prop="departmentName" label="部门" width="160"></el-table-column>
      <el-table-column prop="groupEstimatedOrActual" label="类型" width="60"></el-table-column>
      <el-table-column prop="groupQuarter" label="季度" width="80"></el-table-column>
      <el-table-column prop="groupSalary" label="工资"></el-table-column>
      <el-table-column prop="groupAdministrative" label="行政费用"></el-table-column>
      <el-table-column prop="groupFixedAssets" label="固定资产投资"></el-table-column>
      <el-table-column prop="groupTraining" label="培训费"></el-table-column>
      <el-table-column prop="groupTechnology" label="科技创新费"></el-table-column>
      <el-table-column prop="groupEntertain" label="招待费"></el-table-column>
      <el-table-column prop="groupOperating" label="经营费"></el-table-column>
      <el-table-column prop="groupFinance" label="财务费用"></el-table-column>
      <el-table-column prop="groupTaxes" label="各类税费"></el-table-column>
      <el-table-column prop="groupAudit" label="审计费"></el-table-column>
      <el-table-column prop="groupLawyer" label="律师费用"></el-table-column>
      <el-table-column prop="groupCertificate" label="证书费用"></el-table-column>
      <el-table-column prop="groupMeal" label="伙食费用"></el-table-column>
      <el-table-column prop="groupRent" label="房租费用"></el-table-column>
      <el-table-column prop="groupOther" label="其他费用"></el-table-column>
      <el-table-column prop="groupTotal" label="费用合计"></el-table-column>
      <el-table-column prop="groupRemark" label="备注"></el-table-column>
      <el-table-column prop="groupEditor" label="编制人"></el-table-column>
      <el-table-column prop="groupEditorDate" label="编制时间" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AllGroup',
  data () {
    return {
      searchData: {
        groupYear: '2019',
        groupEstimatedOrActual: '0',
        departmentId: 0, // session
        plateId: 1 // session
      },
      tableData: []
    }
  },
  created () {
    let _this = this
    // this.$api.operation.allgroup(this.searchData).then(res => {
    //   _this.tableData = res.groupLists
    // })
    this.getList(this.searchData, function (data) {
      _this.tableData = data.groupLists
    })
  },
  methods: {
    getList (searchData, callback) {
      this.$axios.get('/selectgroupform', {
        params: {
          'groupYear': searchData.groupYear,
          'groupEstimatedOrActual': searchData.groupEstimatedOrActual,
          'departmentId': searchData.departmentId,
          'plateId': searchData.plateId
        }
      })
        .then(rsp => {
          console.log(JSON.stringify(rsp.data))
          console.log(rsp.data)
          rsp.data.groupLists.forEach(function (item, index, arr) {
            item.groupEstimatedOrActual = item.groupEstimatedOrActual === '1' ? '预估' : '实际'
            item.groupQuarter = (item.groupQuarter === '0' || item.groupQuarter === '') ? '全年' : '不明'
            if (item.groupEditorDate) {
              item.groupEditorDate = item.groupEditorDate.slice(0, 10)
            } else {
              item.groupEditorDate = ''
            }
            // item.groupEditorDate = item.groupEditorDate.slice(1, 11)
            if (item.groupQuarterList) {
              item.groupQuarterList.forEach(function (item, index, arr) {
                item.groupEstimatedOrActual = item.groupEstimatedOrActual === '1' ? '预估' : '实际'
                item.groupEditorDate = item.groupEditorDate.slice(0, 10)
                switch (item.groupQuarter) {
                  case '1': item.groupQuarter = '第一季度'
                    break
                  case '2': item.groupQuarter = '第二季度'
                    break
                  case '3': item.groupQuarter = '第三季度'
                    break
                  case '4': item.groupQuarter = '第四季度'
                    break
                  default: item.groupQuarter = '不明'
                    break
                }
              })
            }
          })
          callback(rsp.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    searchList () {
      let _this = this
      this.getList(this.searchData, function (data) {
        _this.tableData = data.groupLists
      })
    },
    objectSpanMethod ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .el-form,
  .el-table {
    padding: 10px;
    margin-bottom: 10px;
  }
  .el-form-item {
    margin: 10px;
  }
  .el-form {
    background: #F2F2F2;
    margin: 20px 0;
  }
</style>
