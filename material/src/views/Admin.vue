<template>
  <div>
    <div  style="text-align: right">
      <el-button-group>
        <el-button @click="handleDelete" type="warning">删除选中行</el-button>
        <!--<el-button @click="handleEditShow" type="warning">编辑选中行</el-button>-->
        <el-button @click="handleShow" type="primary" icon="el-icon-plus">新增数据</el-button>
      </el-button-group>
    </div>
    <el-table
      id="table"
      :data="tableData" border highlight-current-row style="width: 100%" header-cell-class-name="top-table"
      @current-change="handleCurrentChange">
      <el-table-column type="index" label="#" width="50" />
      <el-table-column prop="projectName" label="用户名" />
      <el-table-column prop="carLength" label="密码" />
      <el-table-column prop="frequency" label="权限" />
      <!--<el-table-column prop="remark" label="备注" />-->
    </el-table>
    <el-dialog :title="isEdit ? '编辑数据' : '新增数据'" :visible.sync="showForm">
      <admin-user :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    </el-dialog>
  </div>
</template>

<script>
// import baseData from '../util/baseData'
import AdminUser from '../components/Admin/AdminUser'
export default {
  name: 'Admin',
  components: { AdminUser },
  data () {
    return {
      showForm: false,
      isEdit: false,
      baseData: {},
      tableData: [],
      currentRow: {}
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList1 () {
      this.$api.sale.getSales({
        saleDate: this.selectData.month
      }).then(rsp => {
        this.$message({
          type: 'success',
          message: '查询成功',
          duration: 1000
        })
        this.tableData = rsp.data
      })
    },
    handleShow () {
      this.showForm = true
      this.isEdit = false
      this.baseData = {}
    },
    handleHide () {
      this.showForm = false
      this.baseData = {}
    },
    handleHideFresh () {
      this.handleHide()
      this.getList1()
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleDelete () {
      if (JSON.stringify(this.currentRow) === '{}') return
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        this.deleteItem1(this.currentRow)
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除', duration: 1000 })
      })
    },
    deleteItem (item) {
      this.$api.sale.delSale({
        saleId: item.saleId
      }).then(rsp => {
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
          this.getList()
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
