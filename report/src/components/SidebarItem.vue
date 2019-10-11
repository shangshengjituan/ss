<template>
  <!--subroute.meta.title会报错，于是先判断subroute.meta是否存在-->
  <div v-if="subroute.meta">
    <!-- 当前 subroute 有子节点 -->
    <el-submenu
      v-if="subroute.children && subroute.meta"
      :index="genPath(fatherpath, subroute.path)">
      <!-- 创建菜单分组 -->
      <template slot="title">
        <span slot="title">{{subroute.meta.title}}</span>
      </template>

      <!-- 递归调用自身，直到 subroute 不含子节点 -->
      <sidebar-item
        v-for="(submenu, subidx) in subroute.children"
        :subroute="submenu"
        :barIdx="subidx"
        :key="barIdx + '-' + subidx"
        :fatherpath="genPath(fatherpath, subroute.path)">
      </sidebar-item>
    </el-submenu>
    <!-- 当前节点不含子节点 -->
    <el-menu-item
      v-else
      :index="genPath(fatherpath, subroute.path)"
    >{{subroute.meta.title}}
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    subroute: {
      type: Object
    },
    barIdx: {
      type: [String, Number]
    },
    fatherpath: {
      type: String
    }
  },
  data () {
    return {
      subRoute: ''
    }
  },
  methods: {
    genPath () {
      let arr = [...arguments]
      // console.log(arr)
      let path = arr.map(v => {
        while (v[0] === '/') {
          v = v.substring(1)
        }
        return v
      }).join('/')
      path = path[0] === '/' ? path : '/' + path
      // console.log(path)
      return path
    }
  }
}
</script>

<style scoped>

</style>
