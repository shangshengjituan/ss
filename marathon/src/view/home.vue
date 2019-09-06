<template>
  <div id="app">
    <el-container>
      <el-header style="border-bottom: 1px solid #DCDFE6">
        <header-nav></header-nav>
      </el-header>
      <el-container class="zhz-container">
        <el-aside width="200px">
          <aside-nav></aside-nav>
        </el-aside>
        <el-main>
          <!--<WangEditor></WangEditor>-->
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

export default {
  name: 'home',
  components: {
    HeaderNav,
    AsideNav,
    FooterMsg
  },
  created () {
    /* this.$axios.get('/selectAll', {
      params: {
        page: 1,
        size: 10
      }
    })
      .then(rsp => { console.log(rsp) })
      .catch(error => { console.log(error) }) */
    /* // 这里的请求参数不需要处理，按照之前的书写方式即可。
    this.$axios.post('/25-3', {
      id: '13030300',
      showapi_appid: '231235',
      showapi_test_draft: false,
      showapi_timestamp: '20180228110925',
      showapi_sign: '437f31128631e33542ad23a65678e709'
    })
      .then(rsp => {
        console.log('success:')
        console.log(rsp)
      }) */
  }
}
</script>

<style scoped>
.zhz-container {
  min-heigh: 1000px;
}
</style>
