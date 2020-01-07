<template>
  <div class="o-container">
    <el-form class="search-form" :inline="true" :model="searchData" :rules="rules" ref="searchData">
      <el-form-item label="项目：" prop="table12ProjectId">
        <el-select v-model="searchData.table12ProjectId" placeholder="请选择项目" value="">
          <el-option
            v-for="item in projectList"
            :label="item.projectName" :key="item.id" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：" prop="table12ProjectYear">
        <el-date-picker
          v-model="searchData.table12ProjectYear"
          type="year" format="yyyy" value-format="yyyy"
          :editable="false" :clearable="false"
          placeholder="请选择年份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="季度：" prop="table12Quarter">
        <el-select v-model="searchData.table12Quarter" placeholder="请选择季度" value="">
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
      <el-table-column prop="table12SubcontractingName" label="分包项目名称" fixed/>
      <el-table-column prop="table12Unit" label="单位" />
      <el-table-column prop="table12WorkQuantity" label="合同工程量" />
      <el-table-column prop="table12ContractPrice" label="合同价（元）" />
      <el-table-column prop="table12SubcontractingPrice" label="分包单价（元））" />
      <el-table-column prop="table12SubcontractingTotalPrice" label="分包合价（元）" />
      <el-table-column prop="table12LiabilityCostPrice" label="责任成本单价（元））" />
      <el-table-column prop="table12LiabilityCostTotalPrice" label="责任成本合价（元））" />
      <el-table-column prop="table12Spread" label="责任成本与分包合价差额（元）" />
      <el-table-column prop="table12Remark" label="备注" />
      <el-table-column prop="table12Editor" label="编制人" />
      <el-table-column prop="table12EditorDate" label="编制时间" />
      <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="116">
        <template slot-scope="scope">
          <el-button @click="clickUpdate(scope.row)" size="mini">编辑</el-button>
          <el-button @click="clickDelete(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改页面 -->
    <el-dialog title="修改" :visible.sync="dialogVisible">
      <cost-project-form :form-data="dialogData" @confirm="confirmUpdate" @cancel="cancelDialog" />
    </el-dialog>
  </div>
</template>

<script>
import CostProjectForm from '../../../components/project/CostProjectForm'
export default {
  name: 'cost-project',
  components: {CostProjectForm},
  data () {
    return {
      searchData: {
        table12ProjectYear: new Date().getFullYear().toString(),
        table12ProjectId: '',
        table12Quarter: ''
      },
      rules: {
        table12ProjectYear: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12ProjectId: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12Quarter: [{ required: true, message: '不可为空', trigger: 'change' }]
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
      this.$api.project.getTable12(this.searchData)
        .then(rsp => {
          console.log('gettable12 Success')
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
        if (item.table12EditorDate) {
          item.table12EditorDate = item.table12EditorDate.slice(0, 10)
        } else {
          item.table12EditorDate = ''
        }
      })
      return list
    },
    getSummaries (params) {
      const { columns, data } = params
      let sums = []
      let [demo, demo1, demo2] = [0, 0, 0]
      data.forEach((columns) => {
        demo += columns.table12SubcontractingTotalPrice
        demo1 += columns.table12LiabilityCostTotalPrice
        demo2 += columns.table12Spread
      })
      columns.forEach((columns, index) => {
        if (index === 0) {
          sums[index] = '累计'
        }
        switch (columns.property) {
          case 'table12SubcontractingTotalPrice': sums[index] = demo
            break
          case 'table12LiabilityCostTotalPrice': sums[index] = demo1
            break
          case 'table12Spread': sums[index] = demo2
            break
        }
      })
      return sums
    },
    // 点击编辑，跳出修改框
    clickUpdate (data) {
      console.log(data)
      this.dialogData = Object.assign({}, data)
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
        this.$api.project.deleteTable12({
          'table12Id': data.table12Id
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
      this.$api.project.updateTable12(data)
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
