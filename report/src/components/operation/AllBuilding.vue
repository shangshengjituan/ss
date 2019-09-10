<template>
  <div>
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item label="类型：">
        <el-select v-model="searchData.buildingEstimatedOrActual" placeholder="类型">
          <el-option label="全部" value="0"></el-option>
          <el-option label="预估" value="1"></el-option>
          <el-option label="实际" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：">
        <el-input v-model="searchData.buildingYear" placeholder="年份"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">查询</el-button>
      </el-form-item>
    </el-form>
    <!--      :span-method="objectSpanMethod"-->
    <!--      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"-->
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      default-expand-all>
      <el-table-column prop="departmentName" label="部门" width="150"></el-table-column>
      <el-table-column prop="buildingEstimatedOrActual" label="类型"></el-table-column>
      <!--<el-table-column prop="buildingYear" label="年份"></el-table-column>-->
      <el-table-column prop="buildingQuarter" label="季度"></el-table-column>
      <el-table-column prop="buildingSalary" label="工资"></el-table-column>
      <el-table-column prop="buildingAdministrative" label="行政费用"></el-table-column>
      <el-table-column prop="buildingFixedAssets" label="固定资产投资"></el-table-column>
      <el-table-column prop="buildingTraining" label="培训费"></el-table-column>
      <el-table-column prop="buildingTechnology" label="科技创新费"></el-table-column>
      <el-table-column prop="buildingEntertain" label="招待费"></el-table-column>
      <el-table-column prop="buildingOperating" label="经营费"></el-table-column>
      <el-table-column prop="buildingFinance" label="财务费用"></el-table-column>
      <el-table-column prop="buildingTaxes" label="各类税费"></el-table-column>
      <el-table-column prop="buildingOther" label="其他费用"></el-table-column>
      <el-table-column prop="buildingTotal" label="费用合计"></el-table-column>
      <el-table-column prop="buildingRemark" label="备注"></el-table-column>
      <el-table-column prop="buildingEditor" label="编制人"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AllBuilding',
  data () {
    return {
      searchData: {
        buildingYear: '2019',
        buildingEstimatedOrActual: '0',
        departmentId: 0, // session
        plateId: 2 // session
      },
      tableData: []
    }
  },
  created () {
    let _this = this
    this.getList(this.searchData, function (data) {
      _this.tableData = data.buildingLists
    })
  },
  methods: {
    getList (searchData, callback) {
      this.$axios.get('/selectbuildingform', {
        params: {
          'buildingYear': searchData.buildingYear,
          'buildingEstimatedOrActual': searchData.buildingEstimatedOrActual,
          'departmentId': searchData.departmentId,
          'plateId': searchData.plateId
        }
      })
        .then(rsp => {
          console.log(JSON.stringify(rsp.data))
          console.log(rsp.data)
          callback(rsp.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    searchList () {
      let _this = this
      this.getList(this.searchData, function (data) {
        _this.tableData = data.buildingLists
      })
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .el-form-item {
    margin-bottom: 0;
  }
</style>
