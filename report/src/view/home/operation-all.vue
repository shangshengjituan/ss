<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>运营成本汇总表</el-breadcrumb-item>
    </el-breadcrumb>
    <template v-if="type==='group'">
      <all-group></all-group>
    </template>
    <template v-else-if="type==='building'">
      <all-building></all-building>
    </template>
    <template v-else-if="type==='sport'">
      <all-sport></all-sport>
    </template>
  </div>
</template>

<script>
import AllGroup from '../../components/operation/AllGroup'
import AllBuilding from '../../components/operation/AllBuilding'
import AllSport from '../../components/operation/AllSport'
export default {
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log('Enter', to)
    next(vm => {
      vm.type = to.params.type
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log('Update', to)
    if (to.fullPath !== from.fullPath) {
      next()
      this.type = to.params.type
    }
  },
  data () {
    return {
      form: {
      },
      type: ''
    }
  },
  name: 'operation-add',
  components: {
    AllSport,
    AllBuilding,
    AllGroup
  },
  methods: {
    onSubmit (form) {
      let news = this.form
      let _this = this
      console.log(news)
      if (!this.newsContent) {
        _this.isValue = true
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          news.newsContent = _this.newsContent
          console.log(JSON.stringify(news))
          this.$axios.post('/insertNews', JSON.stringify(news))
            .then(rsp => {
              console.log('insertNews success')
              // console.log(rsp)
              _this.$alert('新闻创建成功！', '标题名称', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push({path: '/sortnews'})
                }
              })
            })
            .catch(error => { console.log(error) })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
