<template>
  <div class="flex-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>项目({{saleProject.length}}个)</span>
        <el-button style="float: right; padding: 3px 0" type="text">新增</el-button>
      </div>
      <el-tree :data="saleProject">
        <div slot-scope="{ data }" class="tree-item">
          <span>{{ data.label }}</span>
          <el-button style="float: right" type="text" size="mini" @click="showUpdate(data, type='项目')">修改</el-button>
        </div>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>品名规格</span>
        <el-button style="float: right; padding: 3px 0" type="text">新增</el-button>
      </div>
      <el-tree :data="saleCommodity">
        <div slot-scope="{ data }" class="tree-item">
          <span>{{ data.label }}</span>
          <el-button type="text" size="mini" @click="showUpdate(data, type='品名')">修改</el-button>
        </div>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>客户/承运商({{saleClient.length}}个)</span>
        <el-button style="float: right; padding: 3px 0" type="text">新增</el-button>
      </div>
      <el-tree :data="saleClient">
        <span slot-scope="{ data }">
          <span>{{ data.label }}</span>
          <el-button type="text" size="mini" @click="showUpdate(data, type='客户/承运商')">修改</el-button>
        </span>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>材料</span>
        <el-button style="float: right; padding: 3px 0" type="text">新增</el-button>
      </div>
      <el-tree :data="materialTypes">
        <span slot-scope="{ data }">
          <span>{{ data.label }}</span>
          <el-button type="text" size="mini" @click="showUpdate(data, type='材料')">修改</el-button>
        </span>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>材料用途</span>
        <el-button style="float: right; padding: 3px 0" type="text">新增</el-button>
      </div>
      <el-tree :data="materialUse">
        <div slot-scope="{ data }" class="tree-item">
          <span>{{ data.label }}</span>
          <el-button style="float: right" type="text" size="mini" @click="showUpdate(data, type='材料用途')">修改</el-button>
        </div>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>材料供应商信息({{materialProviders.length}}个)</span>
        <el-button style="float: right; padding: 3px 0" type="text">新增</el-button>
      </div>
      <el-tree :data="materialProviders">
        <div slot-scope="{ data }" class="tree-item">
          <span>{{ data.label }}</span>
          <el-button style="float: right" type="text" size="mini" @click="showUpdate(data, type='材料供应商信息')">修改</el-button>
        </div>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>辅材用途</span>
        <el-button style="float: right; padding: 3px 0" type="text">新增</el-button>
      </div>
      <el-tree :data="materialSubUse">
        <span slot-scope="{ data }">
          <span>{{ data.label }}</span>
          <el-button type="text" size="mini" @click="showUpdate(data, type='辅材用途')">修改</el-button>
        </span>
      </el-tree>
    </el-card>
    <!--<el-card class="box-card" shadow="hover">-->
      <!--<div slot="header" class="clearfix">-->
        <!--<span>成本汇总的分类</span>-->
        <!--<el-button style="float: right; padding: 3px 0" type="text">新增</el-button>-->
      <!--</div>-->
      <!--<el-tree :data="costSort">-->
        <!--<span slot-scope="{ data }">-->
          <!--<span>{{ data.label }}</span>-->
          <!--<el-button type="text" size="mini" @click="showUpdate(data)">修改</el-button>-->
        <!--</span>-->
      <!--</el-tree>-->
    <!--</el-card>-->
    <el-dialog :title="isEdit ? `编辑 ${selectType} 数据` : `新增 ${selectType} 数据`" :visible.sync="showForm">
      <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
        <el-form-item label="名称">
          <el-input v-model="formData.value" />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleCancel('form')">取消</el-button>
          <el-button type="primary" @click="submitForm('form')" :disabled="unClick">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Tool',
  data () {
    return {
      saleProject: [],
      saleCommodity: [],
      saleClient: [],
      materialTypes: [],
      materialProviders: [],
      materialUse: [],
      materialSubUse: [],
      costSort: [],
      costProduct: [],
      selectType: '',
      showForm: false,
      isEdit: false,
      unClick: false,
      formData: {},
      rules: {
        value: [{ required: true, message: '不可为空' }]
      }
    }
  },
  created () {
    this.getBase()
  },
  methods: {
    getBase () {
      this.$api.sale.getProjects().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.projectName,
            value: item.projectId
          })
        })
        this.saleProject = temp
      })
      this.$api.sale.getCommodities().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.commodityName,
            value: item.index,
            children: []
          })
          if (item.commoditySizeLists) {
            item.commoditySizeLists.forEach(it => {
              temp[index].children.push({
                label: it.commoditySize || item.commodityName,
                value: it.commodityId
              })
            })
          }
        })
        this.saleCommodity = temp
      })
      this.$api.sale.getClients().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.clientName,
            value: item.clientId
          })
        })
        this.saleClient = temp
      })
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
                label: it.specificProductName || item.rawMaterialCategory,
                value: it.materialId
              })
            })
          }
        })
        this.materialTypes = temp
      })
      this.$api.material.getMaterialUses().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.materialUseSort,
            value: item.materialUseSort,
            children: []
          })
          if (item.materialDetailList) {
            item.materialDetailList.forEach(it => {
              temp[index].children.push({
                label: it.materialUseDetail || item.materialUseSort,
                value: it.materialUseId
              })
            })
          }
        })
        this.materialUse = temp
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
      this.$api.material.getUseList().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.useSort,
            value: item.useSort,
            children: []
          })
          if (item.detailList) {
            item.detailList.forEach(it => {
              temp[index].children.push({
                label: it.useDetail,
                value: it.useId
              })
            })
          }
        })
        this.materialSubUse = temp
      })
      this.$api.cost.getSort().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.costSort,
            value: item.costSort,
            children: []
          })
          if (item.costSortList) {
            item.costSortList.forEach(it => {
              temp[index].children.push({
                label: it.costProject,
                value: it.costSortId
              })
            })
          }
        })
        this.costSort = temp
      })
      this.$api.cost.getProductCate().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.supplier,
            value: item.productCategoryId
          })
        })
        this.costProduct = temp
      })
    },
    showUpdate (data, type) {
      console.log('修改', data, type)
      this.selectType = type
      this.formData = data
    },
    updateBase () {
      switch (this.selectType) {
        case '项目':
          // 修改
          break
      }
    },
    addBase () {
      switch (this.selectType) {
        case '项目':
          // 新增
          break
      }
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
  .tree-item {
    width: 100%;
  }
  .clearfix span {
    font-weight: bold;
  }
</style>
