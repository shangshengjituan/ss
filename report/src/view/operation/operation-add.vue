<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>运营成本统计表</el-breadcrumb-item>
    </el-breadcrumb>
    <template v-if="type==='group'">
      <add-group></add-group>
    </template>
    <template v-else-if="type==='building'">
      <add-building></add-building>
    </template>
    <template v-else-if="type==='sport'">
      <add-sport></add-sport>
    </template>
  </div>
</template>

<script>

import AddGroup from '../../components/operation/AddGroup'
import AddBuilding from '../../components/operation/AddBuilding'
import AddSport from '../../components/operation/AddSport'
export default {
  beforeRouteEnter (to, from, next) {
    // 不！能！获取组件实例 `this`
    console.log('Enter', to)
    next(vm => {
      vm.type = to.params.type
      // console.log(JSON.stringify(sessionStorage))
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('Update', to)
    if (to.fullPath !== from.fullPath) {
      next()
      this.type = to.params.type
    }
  },
  data () {
    return {
      type: ''
    }
  },
  name: 'operation-add',
  components: {
    AddSport,
    AddBuilding,
    AddGroup
  }
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
