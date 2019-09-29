<template>
  <div class="o-container">
    <el-tabs type="border-card">
      <!-- 文体板块单位 -->
      <el-tab-pane label="文体板块单位">
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
      </el-tab-pane>
      <!-- 赛事活动 -->
      <el-tab-pane label="赛事活动">
        <el-form :inline="true" :model="searchData1">
          <el-form-item label="年份：">
            <el-date-picker
              v-model="searchData1.activityYear"
              type="year"
              format="yyyy"
              value-format="yyyy"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchList1"> 查询 </el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData1"
          style="width: 100%;margin-bottom: 20px;"
          border
          row-key="id"
          :indent="0">
          <el-table-column prop="activityName" label="赛事活动名称"></el-table-column>
          <el-table-column prop="activityTime" label="赛事活动时间"></el-table-column>
          <el-table-column prop="activityLocation" label="赛事活动地点"></el-table-column>
          <el-table-column prop="activityOperatingUnit" label="赛事运营单位"></el-table-column>
          <el-table-column prop="activityEstimatedCost" label="预估运营成本"></el-table-column>
          <el-table-column prop="activityActualCost" label="实际运营成本"></el-table-column>
          <el-table-column prop="activityRemark" label="备注"></el-table-column>
          <el-table-column prop="activityEditor" label="编制人"></el-table-column>
          <el-table-column prop="activityEditorDate" label="编制日期"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
      tableData: [],
      searchData1: {
        activityYear: '2019'
        // sportEstimatedOrActual: '0', // 类型
        // departmentId: 0, // session，所属部门，权限
        // plateId: '3' // session，所属板块
      },
      tableData1: []
    }
  },
  created () {
    this.$api.operation.getSport(this.searchData).then(rsp => {
      this.tableData = this.changeData(rsp.data).sportLists
    })
    this.$api.operation.getActivity(this.searchData1).then(rsp => {
      this.tableData1 = this.changeData1(rsp.data).activityList
    })
  },
  methods: {
    // getList (url, searchData, callback) {
    //   this.$axios.get(url, {
    //     params: searchData
    //   })
    //     .then(rsp => {
    //       callback(rsp.data)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    // 修改 /selectsportform 响应的数据
    changeData (data) {
      console.log(JSON.stringify(data))
      data.sportLists.forEach(function (item, index, arr) {
        item.sportEstimatedOrActual = item.sportEstimatedOrActual === '1' ? '预估' : '实际'
        item.sportQuarter = (item.sportQuarter === '0' || item.sportQuarter === '') ? '全年' : '不明'
        if (item.sportEditorDate) {
          item.sportEditorDate = item.sportEditorDate.slice(0, 10)
        } else {
          item.sportEditorDate = ''
        }
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
      return data
    },
    changeData1 (data) {
      console.log(JSON.stringify(data))
      data.activityList.forEach(function (item, index, arr) {
        if (item.activityEditorDate) {
          item.activityEditorDate = item.activityEditorDate.slice(0, 10)
        } else {
          item.activityEditorDate = ''
        }
      })
      return data
    },
    searchList () {
      this.$api.operation.getSport(this.searchData).then(rsp => {
        this.tableData = this.changeData(rsp.data).sportLists
      })
      // this.getList('/selectsportform', this.searchData, function (data) {
      //   _this.tableData = _this.changeData(data).sportLists
      // })
    },
    searchList1 () {
      this.$api.operation.getActivity(this.searchData1).then(rsp => {
        this.tableData1 = this.changeData1(rsp.data).activityList
      })
      // this.getList('/selectActivityForm', this.searchData1, function (data) {
      //   _this.tableData1 = _this.changeData1(data).activityList
      // })
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
