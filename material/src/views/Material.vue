<template>
  <div>
    <el-form :inline="true" class="top-form">
      <el-form-item label="月份">
        <el-date-picker
          v-model="month" format="yyyy年MM月" value-format="yyyy-MM"
          type="month" placeholder="选择月" :editable="false" :clearable="false"></el-date-picker>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="type" placeholder="类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button-group style="float: right">
        <el-button @click="handleShow" type="success" icon="el-icon-plus">新增数据</el-button>
      </el-button-group>
    </el-form>
    <el-table
      :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="material_statistic_date" label="日期"></el-table-column>
      <el-table-column prop="purchase_user_id" label="采购/领用"></el-table-column>
      <el-table-column prop="material_id" label="原材料大类"></el-table-column>
      <el-table-column prop="material_id" label="具体品名"></el-table-column>
      <el-table-column prop="material_unit" label="单位"></el-table-column>
      <el-table-column prop="material_quantity" label="数量"></el-table-column>
      <el-table-column label="含税总金额">
        <el-table-column prop="material_price_tax" label="单价"></el-table-column>
        <el-table-column prop="material_amount_tax" label="金额"></el-table-column>
      </el-table-column>
      <el-table-column label="不含税总金额">
        <el-table-column prop="material_price" label="单价"></el-table-column>
        <el-table-column prop="material_amount" label="金额"></el-table-column>
        <el-table-column prop="tax" label="税额"></el-table-column>
        <el-table-column prop="tax_rate" label="税率"></el-table-column>
      </el-table-column>
      <el-table-column prop="material_user" label="用途"></el-table-column>
      <el-table-column prop="receipt_number" label="发票号"></el-table-column>
      <el-table-column prop="supplier_id" label="供应商"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleShow(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="isEdit ? '编辑数据' : '新增数据'" :visible.sync="showForm">
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
      month: this.$utils.toDateString(new Date(), 'yyyy-MM'),
      type: 1,
      options: [{
        label: '水泥',
        value: 1
      }, {
        label: '黄沙',
        value: 2
      }],
      showForm: false,
      isEdit: false,
      baseData: {},
      tableData: []
    }
  },
  created () {
    // this.getList1()
    // this.getList2()
  },
  watch: {},
  methods: {
    getList1 () {
      this.$api.sale.getSales().then(rsp => {
        console.log(rsp)
        this.tableData1 = rsp.saleLists
      })
    },
    getList2 () {
      this.$api.sale.getSales().then(rsp => {
        console.log(rsp)
        this.tableData2 = rsp.freightLists
      })
    },
    handleShow (item) {
      this.showForm = true
      if (item.material_statistic_id) {
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
      this.handleHide1()
      this.getList1()
    },
    handleDelete (item) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        this.$message({ type: 'success', message: '删除成功!' })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    }
  }
}
</script>

<style scoped>

</style>
