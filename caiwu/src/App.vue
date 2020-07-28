<template>
  <div id="app">
    <div class="container">
      <el-backtop></el-backtop>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">情况</el-menu-item>
        <el-menu-item index="2">汇总</el-menu-item>
        <el-menu-item index="3">常用工具</el-menu-item>
      </el-menu>
      <sheet v-if="activeIndex === '1'"/>
      <summary-sheet v-if="activeIndex === '2'"/>
      <!--<summary v-if="activeIndex === '2'"/>-->
      <tool v-if="activeIndex === '3'"/>
    </div>
  </div>
</template>

<script>

import Sheet from "./views/Sheet";
import SummarySheet from "./views/SummarySheet";
import Tool from "./views/Tool";
export default {
  name: 'App',
	components: {Tool, SummarySheet, Sheet},
	data () {
		return {
			activeIndex: '1'
		}
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
