<template>
  <el-menu
    :default-active="$route.path"
    router
    active-text-color="#409EFF">
    <sidebar-item
      v-for="(item, idx) in routes"
      :subroute="item"
      :fatherpath="fatherPath"
      :barIdx="idx"
      :key="idx">
    </sidebar-item>
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem'
export default {
  name: 'Sidebar',
  components: {SidebarItem},
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
    fatherPath () {
      // 这里直接获取路由配置的 '/' 项
      console.log(this.$router.options.routes[1].path)
      return '/'
    }
  }
}
</script>

<style scoped>

</style>
