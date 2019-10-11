<template>
  <el-form :inline="true" :model="searchData">
    <el-form-item label="类型：">
      <el-select v-model="searchData.type" placeholder="类型">
        <el-option label="全部" value="0"></el-option>
        <el-option label="预估" value="1"></el-option>
        <el-option label="实际" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="年份：">
      <!--<el-input v-model="searchData.groupYear" placeholder="年份"></el-input>-->
      <el-date-picker
        v-model="searchData.year"
        type="year"
        format="yyyy"
        value-format="yyyy"
        placeholder="请选择年份">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchList">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    searchData: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
