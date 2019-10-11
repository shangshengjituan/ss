<template>
  <div class="zhz-header">
    <!--<img src="../assets/logo.png" style="height: 40px;float: left;padding: 10px" alt="">-->
    <div style="float: left">
      <span style="font-weight: bold">江苏尚昇建设集团有限公司</span>
    </div>
    <div style="float: right">
      当前用户：<span>{{userName}}</span>
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
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
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
