<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <!--<el-table-column property="departmentId" label="部门"></el-table-column>
      <el-table-column property="buildingYear" label="年份"></el-table-column>
      <el-table-column property="buildingQuarter" label="季度"></el-table-column>
      <el-table-column property="buildingEstimatedOrActual" label="类型"></el-table-column>
      <el-table-column property="buildingSalary" label="工资"></el-table-column>
      <el-table-column property="buildingAdministrative" label="行政费用"></el-table-column>
      <el-table-column property="buildingFixedAssets" label="固定资产投资"></el-table-column>
      <el-table-column property="buildingTraining" label="培训费"></el-table-column>
      <el-table-column property="buildingTechnology" label="科技创新费"></el-table-column>
      <el-table-column property="buildingEntertain" label="招待费"></el-table-column>
      <el-table-column property="buildingOperating" label="经营费"></el-table-column>
      <el-table-column property="buildingFinance" label="财务费用"></el-table-column>
      <el-table-column property="buildingTaxes" label="各类税费"></el-table-column>
      <el-table-column property="buildingOther" label="其他费用"></el-table-column>
      <el-table-column property="buildingTotal" label="费用合计"></el-table-column>
      <el-table-column property="buildingRemark" label="备注"></el-table-column>
      <el-table-column property="buildingEditor" label="编制人"></el-table-column>-->
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AllBuilding',
  data () {
    return {
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>

</style>
