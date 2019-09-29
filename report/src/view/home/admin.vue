<template>
<div>
  <span>当前用户：{{username}}</span>
  <el-divider></el-divider>
  <el-row>
    <el-col :span="12">
      <el-card>
        <el-calendar>
        </el-calendar>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>

export default {
  name: 'admin',
  data () {
    return {
      username: this.$store.getters.userName
    }
  }
}
</script>

<style scoped>

</style>
