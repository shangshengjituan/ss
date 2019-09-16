<template>
  <div class="o-container">
    <el-form :inline="true" :model="searchData">
      <el-form-item label="类型：">
        <el-select v-model="searchData.sportEstimatedOrActual" placeholder="类型">
          <el-option label="全部" value="0"></el-option>
          <el-option label="预估" value="1"></el-option>
          <el-option label="实际" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：">
        <el-date-picker
          v-model="searchData.sportYear"
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
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      border
      row-key="id"
      :indent="0"
      :tree-props="{children: 'sportQuarterList'}">
      <el-table-column prop="departmentName" label="部门" width="160"></el-table-column>
      <el-table-column prop="sportEstimatedOrActual" label="类型" width="60"></el-table-column>
      <!--<el-table-column prop="sportYear" label="年份"></el-table-column>-->
      <el-table-column prop="sportQuarter" label="季度" width="80"></el-table-column>
      <el-table-column prop="sportSalary" label="工资"></el-table-column>
      <el-table-column prop="sportTraining" label="培训费"></el-table-column>
      <el-table-column prop="sportEntertain" label="招待费"></el-table-column>
      <el-table-column prop="sportOperating" label="经营费"></el-table-column>
      <el-table-column prop="sportRent" label="房租费"></el-table-column>
      <el-table-column prop="sportHydropower" label="水电费"></el-table-column>
      <el-table-column prop="sportMeal" label="伙食费"></el-table-column>
      <el-table-column prop="sportAdministrative" label="行政费用"></el-table-column>
      <el-table-column prop="sportFinance" label="财务费用"></el-table-column>
      <el-table-column prop="sportTaxes" label="各类税费"></el-table-column>
      <el-table-column prop="sportPropaganda" label="宣传费用"></el-table-column>
      <el-table-column prop="sportOther" label="其他费用"></el-table-column>
      <el-table-column prop="sportTotal" label="费用合计"></el-table-column>
      <el-table-column prop="sportRemark" label="备注"></el-table-column>
      <el-table-column prop="sportEditor" label="编制人"></el-table-column>
      <el-table-column prop="sportEditorDate" label="编制时间" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AllSport',
  data () {
    return {
      searchData: {
        sportYear: '2019',
        sportEstimatedOrActual: '0', // 类型
        departmentId: 0, // session，所属部门，权限
        plateId: '3' // session，所属板块
      },
      tableData: []
    }
  },
  created () {
    let _this = this
    this.getList(this.searchData, function (data) {
      _this.tableData = data.sportLists
    })
  },
  methods: {
    getList (searchData, callback) {
      this.$axios.get('/selectsportform', {
        params: {
          'sportYear': searchData.sportYear,
          'sportEstimatedOrActual': searchData.sportEstimatedOrActual,
          'departmentId': searchData.departmentId,
          'plateId': searchData.plateId
        }
      })
        .then(rsp => {
          console.log(JSON.stringify(rsp.data))
          console.log(rsp.data)
          rsp.data.sportLists.forEach(function (item, index, arr) {
            item.sportEstimatedOrActual = item.sportEstimatedOrActual === '1' ? '预估' : '实际'
            item.sportQuarter = (item.sportQuarter === '0' || item.sportQuarter === '') ? '全年' : '不明'
            if (item.sportEditorDate) {
              item.sportEditorDate = item.sportEditorDate.slice(0, 10)
            } else {
              item.sportEditorDate = ''
            }
            // item.sportEditorDate = item.sportEditorDate.slice(1, 11)
            if (item.sportQuarterList) {
              item.sportQuarterList.forEach(function (item, index, arr) {
                item.sportEstimatedOrActual = item.sportEstimatedOrActual === '1' ? '预估' : '实际'
                item.sportEditorDate = item.sportEditorDate.slice(0, 10)
                switch (item.sportQuarter) {
                  case '1': item.sportQuarter = '第一季度'
                    break
                  case '2': item.sportQuarter = '第二季度'
                    break
                  case '3': item.sportQuarter = '第三季度'
                    break
                  case '4': item.sportQuarter = '第四季度'
                    break
                  default: item.sportQuarter = '不明'
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
        _this.tableData = data.sportLists
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
