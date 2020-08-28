<template>
  <div class="flex-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>项目({{saleProject.length}}个)</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleShow(data={},type='项目')">新增</el-button>
      </div>
      <el-tree :data="saleProject">
        <div slot-scope="{ node, data }" class="tree-item">
          <span>{{ data.label }}</span>
          <el-button style="float: right" type="text" size="mini" @click="handleDelete(data, type='项目')">删除</el-button>
          <el-button style="float: right" type="text" size="mini" @click="handleShow(node, type='项目')">修改</el-button>
        </div>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>品名规格</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleShow(data={},type='品名规格')">新增</el-button>
      </div>
      <el-tree :data="saleCommodity">
        <div slot-scope="{ node, data }" class="tree-item">
          <span>{{ data.label }}</span>
          <!--<el-button v-show="node.childNodes.length === 0" style="float: right" type="text" size="mini" @click="handleDelete(data, type='品名')">删除</el-button>-->
          <el-button v-show="node.childNodes.length === 0" style="float: right" type="text" size="mini" @click="handleShow(node, type='品名')">修改</el-button>
        </div>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>客户/承运商({{saleClient.length}}个)</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleShow(data={},type='客户/承运商')">新增</el-button>
      </div>
      <el-tree :data="saleClient">
        <div slot-scope="{ node, data }" class="tree-item">
          <span>{{ data.label }}</span>
          <el-button style="float: right" type="text" size="mini" @click="handleDelete(data, type='客户/承运商')">删除</el-button>
          <el-button style="float: right" type="text" size="mini" @click="handleShow(node, type='客户/承运商')">修改</el-button>
        </div>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>材料</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleShow(data={},type='材料')">新增</el-button>
      </div>
      <el-tree :data="materialTypes">
        <div slot-scope="{ node, data }" class="tree-item">
          <span>{{ data.label }}</span>
          <!--<el-button v-show="node.childNodes.length === 0" style="float: right" type="text" size="mini" @click="handleDelete(data, type='材料')">删除</el-button>-->
          <el-button v-show="node.childNodes.length === 0" style="float: right" type="text" size="mini" @click="handleShow(node, type='材料')">修改</el-button>
        </div>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>材料用途</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleShow(data={},type='材料用途')">新增</el-button>
      </div>
      <el-tree :data="materialUse">
        <div slot-scope="{ node, data }" class="tree-item">
          <span>{{ data.label }}</span>
          <el-button v-show="node.childNodes.length === 0" style="float: right" type="text" size="mini" @click="handleDelete(data, type='材料用途')">删除</el-button>
          <el-button v-show="node.childNodes.length === 0" style="float: right" type="text" size="mini" @click="handleShow(node, type='材料用途')">修改</el-button>
        </div>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>材料供应商信息({{materialProviders.length}}个)</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleShow(data={},type='材料供应商信息')">新增</el-button>
      </div>
      <el-tree :data="materialProviders">
        <div slot-scope="{ data }" class="tree-item">
          <span>{{ data.label }}</span>
          <!--<el-button style="float: right" type="text" size="mini" @click="handleDelete(data, type='材料供应商信息')">删除</el-button>-->
          <el-button style="float: right" type="text" size="mini" @click="handleShow(node, type='材料供应商信息')">修改</el-button>
        </div>
      </el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>辅材用途</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleShow(data={},type='辅材用途')">新增</el-button>
      </div>
      <el-tree :data="materialSubUse">
        <div slot-scope="{ node, data }" class="tree-item">
          <span>{{ data.label }}</span>
          <!--<el-button v-show="node.childNodes.length === 0" style="float: right" type="text" size="mini" @click="handleDelete(data, type='辅材用途')">删除</el-button>-->
          <el-button v-show="node.childNodes.length === 0" style="float: right" type="text" size="mini" @click="handleShow(node, type='辅材用途')">修改</el-button>
        </div>
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
          <!--<el-button type="text" size="mini" @click="handleShow(data)">修改</el-button>-->
        <!--</span>-->
      <!--</el-tree>-->
    <!--</el-card>-->
    <el-dialog :title="isEdit ? `编辑 ${selectType} 数据` : `新增 ${selectType} 数据`" :visible.sync="showForm">
      <material-use v-if="selectType==='材料用途'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <sale-commodity v-if="selectType==='客户/承运商'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <sale-project v-if="selectType==='项目'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    </el-dialog>
  </div>
</template>

<script>
import MaterialUse from '../components/Tool/MaterialUse'
import SaleCommodity from '../components/Tool/SaleCommodity'
import SaleProject from '../components/Tool/SaleProject'
export default {
  name: 'Tool',
  components: { SaleProject, SaleCommodity, MaterialUse },
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
      baseData: {},
      isEdit: false,
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
    handleShow (data, type) {
      console.log(data)
      this.selectType = type
      this.showForm = true
      this.isEdit = !!Object.keys(data).length
      if (data.parent && data.parent.data) {
        this.baseData = {
          label: data.parent.data.label,
          value: data.data.label,
          id: data.data.value
        }
      } else if (!data.parent && data.data) {
        this.baseData = {
          value: data.data.label,
          id: data.data.value
        }
      } else {
        this.baseData = data
      }
      console.log(JSON.stringify(this.baseData))
    },
    handleDelete (data, type) {
      this.$confirm('确定删除该条数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNode(data, type)
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除', duration: 1000 })
      })
    },
    deleteNode (data, type) {
      switch (type) {
        case '项目':
          this.$api.sale.delProject({ projectId: data.value }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getBase()
            } else {
              this.$message({ type: 'error', message: rsp.resultText })
            }
          })
          break
        case '客户/承运商':
          this.$api.sale.delClient({ clientId: data.value }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getBase()
            } else {
              this.$message({ type: 'error', message: rsp.resultText })
            }
          })
          break
        case '材料用途':
          this.$api.material.delMaterialUse({ materialUseId: data.value }).then(rsp => {
            if (rsp.result === 200) {
              this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
              this.getBase()
            } else {
              this.$message({ type: 'error', message: rsp.resultText })
            }
          })
          break
      }
    },
    handleHide () {
      this.showForm = false
    },
    handleHideFresh () {
      this.handleHide()
      this.getBase()
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
  .box-card .el-button {
    float: right;
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
