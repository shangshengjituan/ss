<template>
  <el-table :data="list" row-key="id" :indent="0" show-summary border header-cell-class-name="header-row">
    <el-table-column type="index" label="序号" width="60"></el-table-column>
    <el-table-column prop="departmentName" label="单位名称"></el-table-column>
    <el-table-column prop="estimatedOperatingCosts" label="预估运营成本（元）"></el-table-column>
    <el-table-column prop="actualOperatingCost" label="实际运营成本（元）"></el-table-column>
    <el-table-column prop="differenceAmount" label="差额（元）"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TotalForm',
  props: ['tableData'],
  watch: {
    tableData: {
      handler (newValue, oldValue) {
        for (let i = 0, len = newValue.length; i < len; i++) {
          if (oldValue[i] !== newValue[i]) {
            this.list = newValue
          }
        }
      }
    }
  },
  data () {
    return {
      list: this.tableData
    }
  }
}
</script>

<style scoped>

</style>
