<template>
  <div class="zhz-header">
    <!--<img src="../assets/logo.png" style="height: 40px;float: left;padding: 10px" alt="">-->
    <div style="float: left">
      <span style="font-weight: bold">江苏尚昇建设集团有限公司</span>
    </div>
    <div style="float: right">
      当前用户：
      <el-dropdown style="color: #ffffff;">
        <span class="el-dropdown-link">{{userName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-switch-button"><span  @click="logout">退出</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  data () {
    return {
      userName: this.$store.getters.userName
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(rsp => {
        console.log(rsp)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
.zhz-header {
  padding: 0 20px;
  overflow: hidden;
  color: #ffffff;
  line-height: 60px;
}
</style>
