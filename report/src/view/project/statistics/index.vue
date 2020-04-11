<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="新增" name="add">
      <add-cost-statistics />
    </el-tab-pane>
    <el-tab-pane label="汇总" name="all">
      <all-cost-statistics />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AddCostStatistics from '../add/cost-statistics'
import AllCostStatistics from '../all/cost-statistics'
export default {
  name: 'index',
  components: { AddCostStatistics, AllCostStatistics },
  data () {
    return {
      activeName: 'add'
    }
  },
  methods: {
    // handleClick (tab, event) {
    //   console.log(tab, event)
    // }
  }
}
</script>

<style scoped>

</style>
