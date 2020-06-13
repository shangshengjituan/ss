<template>
  <div class="container">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">销售收支明细</el-menu-item>
      <el-menu-item index="2">成本汇总报表</el-menu-item>
      <el-menu-item index="3">行政后勤台账</el-menu-item>
      <el-menu-item index="4">材料统计台账</el-menu-item>
    </el-menu>
    <sale v-if="activeIndex === '1'" />
    <cost v-if="activeIndex === '2'"/>
    <rear v-if="activeIndex === '3'"/>
    <material v-if="activeIndex === '4'"/>
  </div>
</template>

<script>
// @ is an alias to /src

import Sale from './Sale'
import Rear from './Rear'
import Cost from './Cost'
import Material from './Material'
export default {
  name: 'Home',
  components: { Material, Cost, Rear, Sale },
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
    width: 90%;
    margin: 10px auto;
  }
  .width-full {
    width: 100% !important;
  }
</style>
