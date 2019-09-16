<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        :default-active="$route.path"
        router
        active-text-color="#409EFF"
        class="el-menu-vertical-demo">
        <el-menu-item index="/admin">
          <span slot="title" >首页</span>
        </el-menu-item>
        <el-submenu index="1">
        <template slot="title">
          <span>运营成本统计</span>
        </template>
        <el-submenu index="1-1">
          <template slot="title">运营成本统计</template>
          <!--<router-link :to="{name:'AddOperation',params:{type:'group'}}">集团模块</router-link>-->
          <el-menu-item index="/addoperation/group">集团模块</el-menu-item>
          <el-menu-item index="/addoperation/building">建筑模块</el-menu-item>
          <el-menu-item index="/addoperation/sport">文体模块</el-menu-item>
        </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">运营成本汇总</template>
            <el-menu-item index="/alloperation/group">集团模块</el-menu-item>
            <el-menu-item index="/alloperation/building">建筑模块</el-menu-item>
            <el-menu-item index="/alloperation/sport">文体模块</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>侧栏数据一</span>
          </template>
          <el-menu-item index="2-1"><router-link to="/puttype">类别管理</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/sortnews">新闻管理</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="/addnews">增加新闻</router-link></el-menu-item>
          <el-menu-item index="2-4"><router-link to="/losenews">回收站管理</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
          <span slot="title" @click="clickSome">侧栏数据一</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <span>侧栏数据一</span>
          </template>
          <el-menu-item index="4-1"><router-link to="/">首页轮播图</router-link></el-menu-item>
          <el-menu-item index="4-2"><router-link to="/">建议反馈</router-link></el-menu-item>
          <el-menu-item index="4-3"><router-link to="/">关于我们</router-link></el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AsideNav',
  methods: {
    clickSome () {
      this.Bus.$emit('getSome', '早上好，管理员！')
    }
  }
}
</script>

<style scoped>

</style>
