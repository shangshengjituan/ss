<template>
  <div class="o-container">
    <el-form :inline="true" :model="searchData">
      <el-form-item label="类型：">
        <el-select v-model="searchData.buildingEstimatedOrActual" placeholder="类型">
          <el-option label="全部" value="0"></el-option>
          <el-option label="预估" value="1"></el-option>
          <el-option label="实际" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：">
        <!--<el-input v-model="searchData.buildingYear" placeholder="年份"></el-input>-->
        <el-date-picker
          v-model="searchData.buildingYear"
          type="year"
          format="yyyy"
          value-format="yyyy"
          placeholder="请选择年份">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList"> 查询 </el-button>
      </el-form-item>
    </el-form>
    <!--      :span-method="objectSpanMethod"-->
    <!--      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"-->
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      border
      row-key="id"
      :indent="0"
      :tree-props="{children: 'quarterCostList'}">
      <el-table-column prop="departmentName" label="部门" width="160"></el-table-column>
      <el-table-column prop="buildingEstimatedOrActual" label="类型" width="60"></el-table-column>
      <!--<el-table-column prop="buildingYear" label="年份"></el-table-column>-->
      <el-table-column prop="buildingQuarter" label="季度" width="80"></el-table-column>
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
      <el-table-column prop="buildingEditorDate" label="编制时间" width="120"></el-table-column>
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
          rsp.data.buildingLists.forEach(function (item, index, arr) {
            item.buildingEstimatedOrActual = item.buildingEstimatedOrActual === '1' ? '预估' : '实际'
            item.buildingQuarter = (item.buildingQuarter === '0' || item.buildingQuarter === '') ? '全年' : '不明'
            if (item.buildingEditorDate) {
              item.buildingEditorDate = item.buildingEditorDate.slice(0, 10)
            } else {
              item.buildingEditorDate = ''
            }
            // item.buildingEditorDate = item.buildingEditorDate.slice(1, 11)
            if (item.quarterCostList) {
              item.quarterCostList.forEach(function (item, index, arr) {
                item.buildingEstimatedOrActual = item.buildingEstimatedOrActual === '1' ? '预估' : '实际'
                item.buildingEditorDate = item.buildingEditorDate.slice(0, 10)
                switch (item.buildingQuarter) {
                  case '1': item.buildingQuarter = '第一季度'
                    break
                  case '2': item.buildingQuarter = '第二季度'
                    break
                  case '3': item.buildingQuarter = '第三季度'
                    break
                  case '4': item.buildingQuarter = '第四季度'
                    break
                  default: item.buildingQuarter = '不明'
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

<style>
  .o-container .el-form,
  .o-container .el-table {
    padding: 10px;
    margin-bottom: 10px;
  }
  .o-container .el-form-item {
    margin: 10px;
  }
  .o-container .el-form {
    background: #F2F2F2;
    margin: 20px 0;
  }
  .o-container .el-table__expand-icon {
    float: right;
  }
  .o-container .expanded {
    background: #000;
  }
</style>
