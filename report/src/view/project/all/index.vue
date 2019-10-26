<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>表单统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>

</style>
