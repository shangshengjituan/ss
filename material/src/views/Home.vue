<template>
  <div class="container">
    <el-backtop></el-backtop>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">销售收支明细</el-menu-item>
      <el-menu-item index="2">材料统计台账</el-menu-item>
      <el-menu-item index="3">行政后勤台账</el-menu-item>
      <el-menu-item index="4">成本汇总报表</el-menu-item>
      <el-menu-item index="6">常用工具</el-menu-item>
      <el-menu-item index="5">人员管理</el-menu-item>
    </el-menu>
    <sale v-if="activeIndex === '1'" />
    <material v-if="activeIndex === '2'"/>
    <rear v-if="activeIndex === '3'"/>
    <cost v-if="activeIndex === '4'"/>
    <toolbar v-if="activeIndex === '6'"/>
    <admin v-if="activeIndex === '5'"/>
  </div>
</template>

<script>
// @ is an alias to /src

import Sale from './Sale'
import Rear from './Rear'
import Cost from './Cost'
import Material from './Material'
import Toolbar from './Tool'
import Admin from './Admin'
export default {
  name: 'Home',
  components: { Admin, Toolbar, Material, Cost, Rear, Sale },
  data () {
    return {
      activeIndex: '1'
    }
  },
  created () {
  },
  methods: {
    handleSelect (key, keyPath) {
      this.activeIndex = keyPath[0]
    }
  }
}
</script>
<style>
  .container {
    width: calc(100% - 20px);
    margin: 10px 10px 60px;
  }
  .width-full {
    width: 100% !important;
  }
</style>
