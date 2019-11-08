<template>
  <el-container class="container">
    <el-header>
      <header-nav></header-nav>
    </el-header>
    <el-container style="height: calc(100% - 60px)">
      <el-aside width="250px">
        <el-scrollbar class="scrollbar-wrapper">
          <sidebar :routes="routes" />
        </el-scrollbar>
        <!--<aside-nav></aside-nav>-->
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <!--<el-footer>-->
    <!--<footer-msg></footer-msg>-->
    <!--</el-footer>-->
  </el-container>
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
    // console.log(this.$store.getters.routers)
    return {
      routes: this.$store.getters.routers
    }
  }
}
</script>

<style scoped>
  .el-header {
    /*border-bottom: 1px solid #DCDFE6;*/
    background: #64AAFA;
    padding: 0;
  }
  .container {
    height: 100%;
  }
  .el-aside {
    background: #343E4B;
  }
  .el-main {
    background: #F2F2F2;
  }
  .scrollbar-wrapper {
    height: 100%;
  }
</style>
