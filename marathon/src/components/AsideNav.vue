<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <span>用户管理</span>
          </template>
          <el-menu-item index="1-1"><router-link to="/">类别管理</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="/">新闻管理</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="/addtrack">增加跑圈</router-link></el-menu-item>
          <el-menu-item index="1-4"><router-link to="/">回收站管理</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>新闻中心</span>
          </template>
          <el-menu-item index="2-1"><router-link to="/puttype">类别管理</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/sortnews">新闻管理</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="/addnews">增加新闻</router-link></el-menu-item>
          <el-menu-item index="2-4"><router-link to="/losenews">回收站管理</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
          <span slot="title" @click="clickSome">报名系统</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <span>其他设置</span>
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
a {
  color: #303133;
  text-decoration: none;
}
.is-active {
  background: #ecf5ff;
}
.is-active .router-link-active {
  color: #409EFF;
  text-decoration: none;
}
</style>
