<template>
  <div>
    <el-form :inline="true" class="top-form">
      <el-form-item label="月份">
        <el-date-picker
          v-model="selectData.month" format="yyyy年MM月" value-format="yyyy-MM"
          type="month" placeholder="选择月" :editable="false" :clearable="false"></el-date-picker>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="selectData.type" placeholder="类型">
          <el-option v-for="item in options" :key="item.rawMaterialCategory" :label="item.rawMaterialCategory" :value="item.rawMaterialCategory" />
        </el-select>
      </el-form-item>
      <el-button-group style="float: right">
        <el-button @click="handleShow" type="success" icon="el-icon-plus">新增数据</el-button>
      </el-button-group>
    </el-form>
    <el-table
      :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="materialStatisticDate" label="日期"></el-table-column>
      <el-table-column prop="purchaseUser" label="采购/领用"></el-table-column>
      <el-table-column prop="rawMaterialCategory" label="原材料大类"></el-table-column>
      <el-table-column prop="specificProductName" label="具体品名"></el-table-column>
      <el-table-column prop="materialUnit" label="单位"></el-table-column>
      <el-table-column prop="materialQuantity" label="数量"></el-table-column>
      <el-table-column label="含税总金额">
        <el-table-column prop="materialPriceTax" label="单价"></el-table-column>
        <el-table-column prop="materialAmountTax" label="金额"></el-table-column>
      </el-table-column>
      <el-table-column label="不含税总金额">
        <el-table-column prop="materialPrice" label="单价"></el-table-column>
        <el-table-column prop="materialAmount" label="金额"></el-table-column>
        <el-table-column prop="tax" label="税额"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
      </el-table-column>
      <el-table-column prop="materialUser" label="用途"></el-table-column>
      <el-table-column prop="receiptNumber" label="发票号"></el-table-column>
      <el-table-column prop="supplier" label="供应商"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!--<el-button @click="handleShow(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>-->
          <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="isEdit ? `编辑${selectData.type}数据` : `新增${selectData.type}数据`" :visible.sync="showForm">
      <material-material :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    </el-dialog>
  </div>
</template>

<script>
import MaterialMaterial from '../components/MaterialMaterial'
export default {
  name: 'Material',
  components: { MaterialMaterial },
  data () {
    return {
      selectData: {
        month: this.$utils.toDateString(new Date(), 'yyyy-MM'),
        type: ''
      },
      options: [],
      showForm: false,
      isEdit: false,
      baseData: {},
      tableData: []
    }
  },
  created () {
    this.getMaterials()
    // this.getList()
  },
  watch: {
    selectData: {
      handler (val, old) {
        this.getList()
        // this.getMaterialType()
      },
      deep: true
    }
  },
  methods: {
    getMaterials () {
      this.$api.material.getMaterials().then(rsp => {
        this.options = rsp.data
      })
    },
    getList () {
      if (!this.selectData.month || !this.selectData.type) {
        this.$message.warning('请选择查询类别')
        return
      }
      this.$api.material.getList({
        materialStatisticDate: this.selectData.month,
        rawMaterialCategory: this.selectData.type
      }).then(rsp => {
        this.$message.success('查询成功')
        this.tableData = rsp.data
      })
    },
    handleShow (item) {
      this.showForm = true
      if (item.materialStatisticId) {
        this.isEdit = true
        this.baseData = item
      } else {
        this.isEdit = false
        this.baseData = {}
      }
      console.log(JSON.stringify(this.baseData))
    },
    handleHide () {
      this.showForm = false
      // this.baseData = {}
    },
    handleHideFresh () {
      this.handleHide()
      this.getList()
    },
    handleDelete (item) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        this.deleteItem(item)
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    deleteItem (item) {
      this.$api.material.delItem({
        materialStatisticId: item.materialStatisticId
      }).then(rsp => {
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: rsp.resultText
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
