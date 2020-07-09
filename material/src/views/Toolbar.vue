<template>
  <div class="flex-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>材料供应商信息({{materialProviders.length}}个)</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <el-tree :data="materialProviders" @node-click="handleNodeClick"></el-tree>
      <!--<p v-for="(item, index) in materialProviders" :key="item.supplierId" class="item">-->
        <!--{{ index+1}}、{{item.supplier }}-->
      <!--</p>-->
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>材料</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <el-tree :data="materialTypes" @node-click="handleNodeClick"></el-tree>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      materialTypes: [],
      materialProviders: []
    }
  },
  created () {
    this.getMaterialBase()
  },
  methods: {
    getMaterialBase () {
      this.$api.material.getMaterialType().then(rsp => {
        const temp = []
        rsp.materialType.forEach((item, index) => {
          temp.push({
            label: item.rawMaterialCategory,
            value: item.index,
            children: []
          })
          if (item.specificProductNameList) {
            item.specificProductNameList.forEach(it => {
              temp[index].children.push({
                label: it.specificProductName,
                value: it.materialId
              })
            })
          }
        })
        this.materialTypes = temp
        // this.materialTypes = rsp.materialType
      })
      this.$api.material.getProviders().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.supplier,
            value: item.supplierId
          })
        })
        this.materialProviders = temp
      })
    },
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>
  .flex-container {
    display: flex;
    flex-flow: row wrap;
    padding: 10px;
  }
.box-card {
  width: 400px;
  margin: 0 10px 10px 0;
  /*flex: 1;*/
}
  .el-card__body {
    padding: 10px;
  }
  .item {
    margin: 0 0 5px;
    /*width: auto;*/
  }
  .indent {
    text-indent: 16px;
  }
  .el-collapse {
    border: 0;
    color: #303133;
  }
  .col-title {
    height: 32px;
    line-height: 32px;
  }
  .el-collapse-item__header {
    font-size: initial;
  }
  .el-collapse-item__content {
    padding-bottom: 5px;
  }
</style>
