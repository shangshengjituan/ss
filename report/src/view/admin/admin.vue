<template>
<div>
  <span>当前用户：{{username}}</span>
  <el-divider></el-divider>
      <el-card style="width: 600px;height: 600px">
        <el-calendar>
        </el-calendar>
      </el-card>
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
