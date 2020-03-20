<template>
  <div>
    <el-menu
      :default-active="$route.path"
      router
      class="el-menu-dark"
      background-color="#343E4B"
      text-color="#bfcbd9"
      active-text-color="#bfcbd9">
      <el-menu-item index="/admin">
        <template slot="title">
          <span><i class="el-icon-menu"></i>首页</span>
        </template>
        <!--<span slot="title" >首页</span>-->
      </el-menu-item>
      <el-submenu index="/operation">
        <template slot="title">
          <span><i class="el-icon-news"></i>运营成本</span>
        </template>
        <el-submenu index="/operation/add" v-show="plateId !== '4'">
          <template slot="title">运营成本统计</template>
          <el-menu-item v-show="plateId === '1'" index="/operation/add/group">集团模块</el-menu-item>
          <el-menu-item v-show="plateId === '2'" index="/operation/add/building">建筑模块</el-menu-item>
          <el-menu-item v-show="plateId === '3'" index="/operation/add/sport">文体模块</el-menu-item>
          <el-menu-item v-show="plateId === '5'" index="/operation/add/technology">科技模块</el-menu-item>
        </el-submenu>
        <el-submenu index="/operation/all">
          <template slot="title">运营成本汇总</template>
          <el-menu-item v-show="plateId === '1' || plateId === '4'" index="/operation/all/group">集团模块</el-menu-item>
          <el-menu-item v-show="plateId === '2' || plateId === '4'" index="/operation/all/building">建筑模块</el-menu-item>
          <el-menu-item v-show="plateId === '3' || plateId === '4'" index="/operation/all/sport">文体模块</el-menu-item>
          <el-menu-item v-show="plateId === '5' || plateId === '4'" index="/operation/all/technology">科技模块</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="/project" v-show="plateId === '2' || plateId === '4'">
        <template slot="title">
          <span><i class="el-icon-document"></i>项目明细</span>
        </template>
        <el-menu-item index="/project/tool">表单工具</el-menu-item>
        <el-submenu index="/project/add" v-show="plateId === '2' && role === 'leader'">
          <template slot="title">新增表单</template>
          <el-menu-item index="/project/add/labor">人工费统计</el-menu-item>
          <el-menu-item index="/project/add/labordetail">人工费明细统计</el-menu-item>
          <el-menu-item index="/project/add/spotwork">使用点工统计</el-menu-item>
          <el-menu-item index="/project/add/materialdetail">材料费明细统计</el-menu-item>
          <el-menu-item index="/project/add/material">调入调出材料费用统计</el-menu-item>
          <el-menu-item index="/project/add/living">水电费使用情况统计</el-menu-item>
          <el-menu-item index="/project/add/machine">机械设备费用统计</el-menu-item>
          <el-menu-item index="/project/add/managecost">收取管理费分包工程成本统计</el-menu-item>
          <el-menu-item index="/project/add/managevalue">收取管理费分包工程产值统计</el-menu-item>
          <el-menu-item index="/project/add/projectcost">单价分包工程成本统计</el-menu-item>
          <el-menu-item index="/project/add/projectdetail">单价分包工程成本明细统计</el-menu-item>
          <el-menu-item index="/project/add/projectproduct">项目分包工程生产情况统计</el-menu-item>
          <el-menu-item index="/project/add/manage">管理费用统计</el-menu-item>
          <el-menu-item index="/project/add/test">检测实验费用统计</el-menu-item>
          <el-menu-item index="/project/add/wage">管理人员工资统计</el-menu-item>
          <el-menu-item index="/project/add/run">经营费用统计</el-menu-item>
          <el-menu-item index="/project/add/temp">临时设施成本统计</el-menu-item>
          <el-menu-item index="/project/add/templabor">临时设施人工费明细统计</el-menu-item>
          <el-menu-item index="/project/add/tempmaterial">临时设施、场地等材料费明细统计</el-menu-item>
          <el-menu-item index="/project/add/totalcompare">总产值与相应成本对比统计</el-menu-item>
          <el-menu-item index="/project/add/worktype">各工种每平方米单价统计</el-menu-item>
          <el-menu-item index="/project/add/summary">项目成本统计二</el-menu-item>
          <el-menu-item index="/project/add/statistics">项目成本统计一</el-menu-item>
        </el-submenu>
        <el-submenu index="/project/all">
          <template slot="title">表单汇总</template>
          <el-menu-item index="/project/all/statistics">项目成本统计汇总一</el-menu-item>
          <el-menu-item index="/project/all/summary">项目成本统计汇总二</el-menu-item>
          <el-menu-item index="/project/all/labor">人工费汇总</el-menu-item>
          <el-menu-item index="/project/all/labordetail">人工费明细汇总</el-menu-item>
          <el-menu-item index="/project/all/spotwork">使用点工汇总</el-menu-item>
          <el-menu-item index="/project/all/materialdetail">材料费明细汇总</el-menu-item>
          <el-menu-item index="/project/all/material">调入调出材料费用汇总</el-menu-item>
          <el-menu-item index="/project/all/living">水电费使用情况汇总</el-menu-item>
          <el-menu-item index="/project/all/machine">机械设备费用明细汇总</el-menu-item>
          <el-menu-item index="/project/all/managecost">收取管理费分包工程成本汇总</el-menu-item>
          <el-menu-item index="/project/all/managevalue">收取管理费分包工程产值汇总</el-menu-item>
          <el-menu-item index="/project/all/projectcost">单价分包工程成本汇总</el-menu-item>
          <el-menu-item index="/project/all/projectdetail">单价分包工程成本明细汇总</el-menu-item>
          <el-menu-item index="/project/all/projectproduct">项目分包工程生产情况统计</el-menu-item>
          <el-menu-item index="/project/all/manage">管理费用汇总</el-menu-item>
          <el-menu-item index="/project/all/test">检测实验费用汇总</el-menu-item>
          <el-menu-item index="/project/all/wage">管理人员工资汇总</el-menu-item>
          <el-menu-item index="/project/all/run">经营费用汇总</el-menu-item>
          <el-menu-item index="/project/all/temp">临时设施成本汇总</el-menu-item>
          <el-menu-item index="/project/all/templabor">临时设施人工费明细汇总</el-menu-item>
          <el-menu-item index="/project/all/tempmaterial">临时设施、场地等材料费明细汇总</el-menu-item>
          <el-menu-item index="/project/all/totalcompare">总产值与相应成本对比统计汇总</el-menu-item>
          <el-menu-item index="/project/all/worktype">各工种每平方米单价汇总</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AsideNav',
  data () {
    return {
      plateId: this.$store.getters.plateId,
      role: this.$store.getters.role, // leader
      routers: this.$store.getters.routers
    }
  }
}
</script>

<style scoped>

</style>
