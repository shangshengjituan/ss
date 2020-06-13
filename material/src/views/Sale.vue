<template>
<div>
  <el-form :inline="true">
    <el-form-item label="月份">
      <el-date-picker
        v-model="month" format="yyyy年MM月" value-format="yyyy-MM"
        type="month" placeholder="选择月" :editable="false" :clearable="false"></el-date-picker>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="type" placeholder="类型">
        <el-option label="销售收入" value="1"></el-option>
        <el-option label="运费" value="2"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div v-if="type === '1'">
    <el-button-group style="float: right">
      <el-button @click="handleShow1" type="primary" icon="el-icon-plus">新增数据</el-button>
    </el-button-group>
    <el-table
      :data="tableData1" border highlight-current-row style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="sale_date" label="日期"></el-table-column>
      <el-table-column prop="project_id" label="项目名称"></el-table-column>
      <el-table-column prop="freight_id" label="品名"></el-table-column>
      <el-table-column prop="freight_id" label="规格"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="sale_quantity" label="数量"></el-table-column>
      <el-table-column prop="sale_area" label="面积（㎡）"></el-table-column>
      <el-table-column prop="sale_price" label="销售单价"></el-table-column>
      <el-table-column prop="sale_amount_tax" label="金额（含税）"></el-table-column>
      <el-table-column prop="sale_amount" label="金额（不含税）"></el-table-column>
      <el-table-column prop="tax" label="税额"></el-table-column>
      <el-table-column prop="hit_money" label="是否回款"></el-table-column>
      <el-table-column prop="receipt_number" label="已开发票号"></el-table-column>
      <el-table-column prop="client_id" label="客户"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleShow1(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="isEdit1 ? '编辑数据' : '新增数据'" :visible.sync="showForm1">
      <form-sale :base-data="baseData1" :isEdit="isEdit1" @cancel="handleHide1" @primary="handleHideFresh"/>
    </el-dialog>
  </div>
  <div v-if="type === '2'">
    <el-table
      :data="tableData2" border style="width: 100%">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="地址">
        <el-table-column prop="province" label="省份" width="120"></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="300"></el-table-column>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleModify(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import FormSale from '../components/FormSale'
export default {
  name: 'Sale',
  components: { FormSale },
  data () {
    return {
      month: this.$utils.toDateString(new Date(), 'yyyy-MM'),
      type: '1',
      showForm1: false,
      isEdit1: false,
      baseData1: [],
      tableData1: {}
    }
  },
  created () {
    // this.getList1()
  },
  methods: {
    getList1 () {
      this.$api.sale.getSales().then(rsp => {
        console.log(rsp)
        this.tableData1 = rsp.saleLists
      })
    },
    handleShow1 (item) {
      if (item) {
        this.title1 = '修改数据'
        this.baseData1 = item
      } else {
        this.title1 = '新增数据'
        this.baseData1 = {}
      }
      this.showForm1 = true
    },
    handleHide1 () {
      this.showForm1 = false
      this.baseData1 = {}
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
