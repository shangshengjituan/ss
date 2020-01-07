<template>
<div>
  <span>当前用户：{{username}}</span>
  <el-divider></el-divider>
  <span>当前日期：{{new Date().getFullYear()}}年{{new Date().getMonth() + 1}}月{{new Date().getDate()}}日</span>
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
