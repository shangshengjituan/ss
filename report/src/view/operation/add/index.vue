<template>
  <div>
    <!--<el-breadcrumb separator="/">-->
      <!--<el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>运营成本统计表</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>
  .el-breadcrumb {
    margin-bottom: 20px;
  }
</style>
