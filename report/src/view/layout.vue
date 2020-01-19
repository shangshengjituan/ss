<template>
  <el-container class="container">
    <el-header>
      <header-nav></header-nav>
    </el-header>
    <el-container style="height: calc(100% - 60px)">
      <el-aside width="280px">
        <el-scrollbar class="scrollbar-wrapper">
          <aside-nav />
          <!--<sidebar :routes="routes" />-->
        </el-scrollbar>
      </el-aside>
      <el-main>
        <el-tabs v-model="activeIndex" type="border-card" closable @tab-click='tabClick' @tab-remove='tabRemove'>
          <el-tab-pane
            :key="item.name"
            v-for="(item) in openTab"
            :label="item.title"
            :name="item.route"
          >
          </el-tab-pane>
        </el-tabs>
        <div class="content-wrap">
          <router-view/>
        </div>
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
    console.log(this.$route)
    return {
      routes: this.$store.getters.routers
    }
  },
  mounted () {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    if (this.$route.path !== '/' && this.$route.path !== '/admin') {
      console.log('1')
      this.$store.commit('add_tabs', { route: '/admin', name: 'Admin', title: '首页' })
      this.$store.commit('add_tabs', { route: this.$route.path, name: this.$route.name, title: this.$route.meta.title })
      this.$store.commit('set_active_index', this.$route.path)
    } else {
      console.log('2')
      this.$store.commit('add_tabs', { route: '/admin', name: 'Admin', title: '首页' })
      this.$store.commit('set_active_index', '/admin')
      this.$router.push('/admin')
    }
  },
  computed: {
    openTab () {
      return this.$store.state.openTab
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex
      },
      set (val) {
        this.$store.commit('set_active_index', val)
      }
    }
  },
  watch: {
    '$route' (to, from) {
      // 判断路由是否已经打开
      // 已经打开的 ，将其置为active
      // 未打开的，将其放入队列里
      let flag = false
      for (let item of this.openTab) {
        if (item.name === to.name) {
          this.$store.commit('set_active_index', to.path)
          flag = true
          break
        }
      }

      if (!flag) {
        this.$store.commit('add_tabs', {route: to.path, name: to.name, title: to.meta.title})
        this.$store.commit('set_active_index', to.path)
      }
    }
  },
  methods: {
    // tab标签点击时，切换相应的路由
    tabClick (tab) {
      console.log('tab', tab)
      console.log('active', this.activeIndex)
      this.$router.push({path: this.activeIndex})
    },
    // 移除tab标签
    tabRemove (targetName) {
      console.log('tabRemove', targetName)
      // 首页不删
      if (targetName === '/' || targetName === '/admin') {
        return
      }
      this.$store.commit('delete_tabs', targetName)
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          console.log('=============', this.openTab[this.openTab.length - 1].route)
          this.$store.commit('set_active_index', this.openTab[this.openTab.length - 1].route)
          this.$router.push({path: this.activeIndex})
        } else {
          this.$router.push({path: '/'})
        }
      }
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
  .el-admin {
    background: #F2F2F2;
  }
  .scrollbar-wrapper {
    height: 100%;
  }
  .content-wrap {
    overflow: hidden;
    border: 1px solid #DCDFF7;
    border-top: none;
    padding: 0 10px 10px 10px;
  }
  .el-tabs.el-tabs--border-card {
    box-shadow: none;
    border-bottom: none;
  }
</style>
