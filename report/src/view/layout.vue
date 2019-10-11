<template>
  <div id="app">
    <el-container>
      <el-header>
        <header-nav></header-nav>
      </el-header>
      <el-container class="zhz-container">
        <el-aside width="200px">
          <sidebar :routes="routes"></sidebar>
          <!--<aside-nav></aside-nav>-->
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <el-footer>
        <footer-msg></footer-msg>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav'
import AsideNav from '../components/AsideNav'
import FooterMsg from '../components/FooterMsg'
import Sidebar from '../components/Sidebar'

export default {
  name: 'layout',
  components: {
    Sidebar,
    HeaderNav,
    AsideNav,
    FooterMsg
  },
  data () {
    console.log(this.$store.getters.routers)
    return {
      routes: this.$store.getters.routers
    }
  }
}
</script>

<style scoped>
  .el-header {
    border-bottom: 1px solid #DCDFE6;
    background: #409EFF;
    padding: 0;
  }
.zhz-container {
  min-height: 1000px;
}
</style>
