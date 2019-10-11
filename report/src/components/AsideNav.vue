<template>
  <div>
    <el-menu
      :default-active="$route.path"
      router
      active-text-color="#409EFF"
      class="el-menu-vertical-demo">
      <el-menu-item index="/admin">
        <template slot="title">
          <span>首页</span>
        </template>
        <!--<span slot="title" >首页</span>-->
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <span>运营成本统计</span>
        </template>
        <el-submenu index="1-1">
          <template slot="title">运营成本统计</template>
          <!--<router-link :to="{name:'AddOperation',params:{type:'group'}}">集团模块</router-link>-->
          <el-menu-item index="/operation/add/group">集团模块</el-menu-item>
          <el-menu-item index="/operation/add/building">建筑模块</el-menu-item>
          <el-menu-item index="/operation/add/sport">文体模块</el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">运营成本汇总</template>
          <el-menu-item index="/operation/all/group">集团模块</el-menu-item>
          <el-menu-item index="/operation/all/building">建筑模块</el-menu-item>
          <el-menu-item index="/operation/all/sport">文体模块</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    <el-menu
      v-for="(r,index) in routers"
      v-if="r.children"
      :key="index"
      :default-active="$route.path"
      router
      active-text-color="#409EFF"
      class="el-menu-vertical-demo">
      <el-menu-item index="/admin">
        <template slot="title">
          <span>首页</span>
        </template>
        <!--<span slot="title" >首页</span>-->
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <span>运营成本统计</span>
        </template>
        <el-submenu index="1-1">
          <template slot="title">运营成本统计</template>
          <!--<router-link :to="{name:'AddOperation',params:{type:'group'}}">集团模块</router-link>-->
          <el-menu-item index="/operation/add/group">集团模块</el-menu-item>
          <el-menu-item index="/operation/add/building">建筑模块</el-menu-item>
          <el-menu-item index="/operation/add/sport">文体模块</el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">运营成本汇总</template>
          <el-menu-item index="/operation/all/group">集团模块</el-menu-item>
          <el-menu-item index="/operation/all/building">建筑模块</el-menu-item>
          <el-menu-item index="/operation/all/sport">文体模块</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AsideNav',
  data () {
    return {
      routers: this.$store.getters.routers
    }
  }
}
</script>

<style scoped>

</style>
