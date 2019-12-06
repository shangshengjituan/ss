<template>
  <div class="o-container">
    <el-form class="search-form" :inline="true" :model="searchData" :rules="rules" ref="searchData">
      <el-form-item label="项目：" prop="table10ProjectId">
        <el-select v-model="searchData.table10ProjectId" placeholder="请选择项目" value="">
          <el-option
            v-for="item in projectList"
            :label="item.projectName" :key="item.id" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：" prop="table10ProjectYear">
        <el-date-picker
          v-model="searchData.table10ProjectYear"
          type="year" format="yyyy" value-format="yyyy"
          :editable="false" :clearable="false"
          placeholder="请选择年份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="季度：" prop="table10Quarter">
        <el-select v-model="searchData.table10Quarter" placeholder="请选择季度" value="">
          <el-option
            v-for="item in options"
            :label="item.label" :key="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validateData('searchData')"> 查询 </el-button>
      </el-form-item>
    </el-form>
    <el-table
      show-summary :summary-method="getSummaries"
      :data="tableData" border row-key="id" :indent="0"
      header-cell-class-name="header-row">
      <el-table-column type="index" width="50" fixed/>
      <el-table-column prop="table10SubcontractingName" label="分包项目名称" fixed/>
      <el-table-column prop="table10ContractPrice" label="分包工程合同价（元）" />
      <el-table-column prop="table10ManagementFee" label="收管理费%" />
      <el-table-column prop="table10EngineeringPrice" label="分包工程价（元）" />
      <el-table-column prop="table10ContractCost" label="合同价每平米造价（元/㎡）" />
      <el-table-column prop="table10EngineeringCost" label="分包价每平米造价（元/㎡）" />
      <el-table-column prop="table10Remark" label="备注" />
      <el-table-column prop="table10Editor" label="编制人" />
      <el-table-column prop="table10EditorDate" label="编制时间" />
      <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="148">
        <template slot-scope="scope">
          <el-button @click="clickUpdate(scope.row)" size="small">编辑</el-button>
          <el-button @click="clickDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改页面 -->
    <el-dialog title="修改" :visible.sync="dialogVisible">
      <cost-manage-cost-form :form-data="dialogData" @confirm="confirmUpdate" @cancel="cancelDialog" />
    </el-dialog>
  </div>
</template>

<script>
import CostManageCostForm from '../../../components/project/CostManageCostForm'
export default {
  name: 'cost-manage-cost',
  components: {CostManageCostForm},
  data () {
    return {
      searchData: {
        table10ProjectYear: new Date().getFullYear().toString(),
        table10ProjectId: '',
        table10Quarter: ''
      },
      rules: {
        table10ProjectYear: [{ required: true, message: '不可为空', trigger: 'change' }],
        table10ProjectId: [{ required: true, message: '不可为空', trigger: 'change' }],
        table10Quarter: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      departmentId: this.$store.getters.departmentId,
      plateId: this.$store.getters.plateId,
      role: this.$store.getters.role,
      projectList: [],
      options: this.$store.getters.addType[1].children,
      list: [], // 接口数据
      dialogData: {}, // 修改框的表单值
      dialogVisible: false // 修改框是否显示
    }
  },
  created () {
    this.getProject()
  },
  computed: {
    tableData: {
      get () {
        return this.formatList(this.list)
      },
      set () {
        return this.formatList(this.list)
      }
    }
  },
  methods: {
    getProject () {
      this.$api.project.getProjectList({
        departmentId: this.departmentId,
        plateId: this.plateId
      })
        .then(rsp => {
          console.log(rsp.data)
          this.projectList = rsp.data.list
        })
    },
    getList () {
      this.$api.project.getTable10(this.searchData)
        .then(rsp => {
          console.log('gettable10 Success')
          if (rsp.data.result === 200) {
            this.list = rsp.data.list
          } else if (rsp.data.result === 404) {
            this.$message.warning(rsp.data.resultText)
            this.list = rsp.data.list
          } else {
            this.$message.error('未知错误，查询失败！')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    validateData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    formatList (list) {
      if (!list) {
        return []
      }
      list.forEach(function (item, index, arr) {
        if (item.table10EditorDate) {
          item.table10EditorDate = item.table10EditorDate.slice(0, 10)
        } else {
          item.table10EditorDate = ''
        }
      })
      return list
    },
    getSummaries (params) {
      const { columns, data } = params
      let sums = []
      let [demo, demo1] = [0, 0]
      data.forEach((columns) => {
        demo += columns.table10ContractPrice
        demo1 += columns.table10EngineeringPrice
      })
      columns.forEach((columns, index) => {
        if (index === 0) {
          sums[index] = '累计'
        }
        switch (columns.property) {
          case 'table10ContractPrice': sums[index] = demo
            break
          case 'table10EngineeringPrice': sums[index] = demo1
            break
        }
      })
      return sums
    },
    // 点击编辑，跳出修改框
    clickUpdate (data) {
      console.log(data)
      this.dialogData = data
      this.dialogVisible = true
    },
    // 点击删除
    clickDelete (data) {
      console.log(data)
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.project.deleteTable10({
          'table10Id': data.table10Id
        }).then(rsp => {
          if (rsp.data.result === 200) {
            this.$message.success('删除成功')
          } else {
            this.$message.error('未知错误，删除失败')
          }
          this.getList()
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message.info('已取消删除。')
      })
    },
    cancelDialog () {
      this.getList()
      this.dialogVisible = false
    },
    confirmUpdate (data) {
      this.$api.project.updateTable10(data)
        .then(rsp => {
          let data = rsp.data
          if (data.result === 200) {
            this.$message.success('修改成功！')
          } else {
            this.$message.error('修改失败：' + data.resultText)
          }
          this.getList()
          console.log(rsp)
          this.dialogVisible = false
        })
    }
  }
}
</script>

<style scoped>

</style>
