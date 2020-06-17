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
        <el-option label="销售收入" value="1"></el-option>
        <el-option label="运费" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-button-group style="float: right">
      <el-button @click="handleShow" type="success" icon="el-icon-plus">新增数据</el-button>
    </el-button-group>
  </el-form>
  <div v-if="type === '1'">
    <el-table
      :data="tableData1" border highlight-current-row style="width: 100%" header-cell-class-name="top-table">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="sale_date" label="日期"></el-table-column>
      <el-table-column prop="project_id" label="项目名称"></el-table-column>
      <el-table-column prop="commodity_id" label="品名"></el-table-column>
      <el-table-column prop="commodity_id" label="规格"></el-table-column>
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
          <el-button @click="handleShow(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="isEdit ? '编辑数据' : '新增数据'" :visible.sync="showForm1">
      <sale-sale :base-data="baseData" :isEdit="isEdit" @cancel="handleHide1" @primary="handleHideFresh1"/>
    </el-dialog>
  </div>
  <div v-if="type === '2'">
    <el-table
      :data="tableData2" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="freight_date" label="日期"></el-table-column>
      <el-table-column prop="income_expenditure" label="收入/支出"></el-table-column>
      <el-table-column prop="freight_type" label="费用类别"></el-table-column>
      <el-table-column prop="project_id" label="项目名称"></el-table-column>
      <el-table-column prop="car_length" label="车型"></el-table-column>
      <el-table-column prop="frequency" label="趟次"></el-table-column>
      <el-table-column prop="basic_mileage" label="基本公里数"></el-table-column>
      <el-table-column prop="actual_mileage" label="实际公里数"></el-table-column>
      <el-table-column label="含税金额">
        <el-table-column prop="freight_price_tax" label="单价"></el-table-column>
        <el-table-column prop="freight_amount_tax" label="金额"></el-table-column>
      </el-table-column>
      <el-table-column label="不含税金额">
        <el-table-column prop="freight_price" label="单价"></el-table-column>
        <el-table-column prop="freight_amount" label="金额"></el-table-column>
        <el-table-column prop="tax" label="税额"></el-table-column>
        <el-table-column prop="tax_rate" label="税率"></el-table-column>
      </el-table-column>
      <el-table-column prop="receipt_number" label="发票号"></el-table-column>
      <el-table-column prop="client_id" label="客户/承运商"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleShow(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="isEdit ? '编辑数据' : '新增数据'" :visible.sync="showForm2">
      <sale-freight :base-data="baseData" :isEdit="isEdit" @cancel="handleHide2" @primary="handleHideFresh2"/>
    </el-dialog>
  </div>
</div>
</template>

<script>
import SaleSale from '../components/SaleSale'
import SaleFreight from '../components/SaleFreight'
export default {
  name: 'Sale',
  components: { SaleFreight, SaleSale },
  data () {
    return {
      month: this.$utils.toDateString(new Date(), 'yyyy-MM'),
      type: '1',
      showForm1: false,
      isEdit: false,
      baseData: {},
      tableData1: [],
      tableData2: [],
      showForm2: false
    }
  },
  created () {
    // this.getList1()
    // this.getList2()
  },
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
      if (this.type === '1') {
        this.showForm1 = true
      }
      if (this.type === '2') {
        this.showForm2 = true
      }
      if (item.sale_id || item.freight_id) {
        this.isEdit = true
        this.baseData = item
      } else {
        this.isEdit = false
        this.baseData = {}
      }
      console.log(JSON.stringify(this.baseData))
      // this.showForm1 = true
    },
    handleHide1 () {
      this.showForm1 = false
      // this.baseData = {}
    },
    handleHideFresh1 () {
      this.handleHide1()
      this.getList1()
    },
    handleHide2 () {
      this.showForm2 = false
      // this.baseData = {}
    },
    handleHideFresh2 () {
      this.handleHide2()
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

<style>
  .top-form {
    padding: 10px;
    margin: 10px 0;
    background: #F5F7FA;
  }
  .top-form .el-form-item {
    margin: 0 15px 0 0;
  }
  .el-table .top-table {
    background-color: #F5F7FA;
  }
  .el-dialog {
    width: 80%;
  }
</style>
