<template>
  <div class="o-container">
    <el-form class="search-form" :inline="true" :model="searchData" :rules="rules" ref="searchData">
      <el-form-item label="项目：" prop="table20ProjectId">
        <el-select v-model="searchData.table20ProjectId" placeholder="请选择项目" value="">
          <el-option
            v-for="item in projectList"
            :label="item.projectName" :key="item.id" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：" prop="table20ProjectYear">
        <el-date-picker
          v-model="searchData.table20ProjectYear"
          type="year" format="yyyy" value-format="yyyy"
          :editable="false" :clearable="false"
          placeholder="请选择年份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="季度：" prop="table20Quarter">
        <el-select v-model="searchData.table20Quarter" placeholder="请选择季度" value="">
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
      <el-table-column prop="table20WorkType" label="工作内容明细" fixed/>
      <el-table-column prop="table20Unit" label="单位" />
      <el-table-column prop="table20ActualQuantity" label="实际工程量" />
      <el-table-column prop="table20Price" label="单价（元）" />
      <el-table-column prop="table20ActualLaborCost" label="实际人工费（元）" />
      <el-table-column prop="table20StartDate" label="开始日期" />
      <el-table-column prop="table20EndDate" label="结束日期" />
      <el-table-column prop="table20Remark" label="备注" />
      <el-table-column prop="table20Editor" label="编制人" />
      <el-table-column prop="table20EditorDate" label="编制时间" />
      <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="148">
        <template slot-scope="scope">
          <el-button @click="clickUpdate(scope.row)" size="small">编辑</el-button>
          <el-button @click="clickDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改页面 -->
    <el-dialog title="修改" :visible.sync="dialogVisible">
      <temp-labor-form :form-data="dialogData" @confirm="confirmUpdate" @cancel="cancelDialog"/>
    </el-dialog>
  </div>
</template>

<script>
import TempLaborForm from '../../../components/project/TempLaborForm'
export default {
  name: 'temp-labor',
  components: {TempLaborForm},
  data () {
    return {
      searchData: {
        table20ProjectYear: new Date().getFullYear().toString(),
        table20ProjectId: '',
        table20Quarter: ''
      },
      rules: {
        table20ProjectYear: [{ required: true, message: '不可为空', trigger: 'change' }],
        table20ProjectId: [{ required: true, message: '不可为空', trigger: 'change' }],
        table20Quarter: [{ required: true, message: '不可为空', trigger: 'change' }]
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
      this.$api.project.getTable20(this.searchData)
        .then(rsp => {
          console.log('gettable20 Success')
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
        if (item.table20EditorDate) {
          item.table20EditorDate = item.table20EditorDate.slice(0, 10)
        } else {
          item.table20EditorDate = ''
        }
      })
      return list
    },
    getSummaries (params) {
      const { columns, data } = params
      let sums = []
      let demo = 0
      data.forEach((columns) => {
        demo += columns.table20ActualLaborCost
      })
      columns.forEach((columns, index) => {
        if (index === 0) {
          sums[index] = '累计'
        }
        if (columns.property === 'table20ActualLaborCost') {
          sums[index] = demo
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
        this.$api.project.deleteTable20({
          'table20Id': data.table20Id
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
      this.$api.project.updateTable20(data)
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
