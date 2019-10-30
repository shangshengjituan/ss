<template>
  <div class="o-container">
    <el-form class="search-form" :inline="true" :model="searchData" :rules="rules" :hide-required-asterisk="true" ref="searchData">
      <el-form-item label="项目：" prop="table8ProjectId">
        <el-select v-model="searchData.table8ProjectId" placeholder="请选择项目" value="">
          <el-option
            v-for="item in projectList"
            :label="item.projectName" :key="item.id" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：" prop="table8ProjectYear">
        <el-date-picker
          v-model="searchData.table8ProjectYear"
          type="year" format="yyyy" value-format="yyyy"
          :editable="false" :clearable="false"
          placeholder="请选择年份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="季度：" prop="table8Quarter">
        <el-select v-model="searchData.table8Quarter" placeholder="请选择季度" value="">
          <el-option
            v-for="item in options"
            :label="item.label" :key="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" prop="table8Type">
        <el-select v-model="searchData.table8Type" value="">
          <el-option value="全部" key="0" label="全部"/>
          <el-option value="水费" key="1" label="水费"/>
          <el-option value="电费" key="2" label="电费"/>
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
      <el-table-column prop="table8UserUnitName" label="用户单位名称" />
      <el-table-column prop="table8Type" label="类型" width="68">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.table8Type === '水费' ? 'primary' : 'warning'"
            disable-transitions>{{ scope.row.table8Type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="table8Unit" label="单位" />
      <el-table-column prop="table8Dosage" label="用量" />
      <el-table-column prop="table8UserWorkCategory" label="用户工作类型" />
      <el-table-column prop="table8Price" label="水/电费单价（元）" />
      <el-table-column prop="table8TotalPrice" label="水/电费合价（元）" />
      <el-table-column prop="table8Remark" label="备注" />
      <el-table-column prop="table8Editor" label="编制人" />
      <el-table-column prop="table8EditorDate" label="编制时间" />
      <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="148">
        <template slot-scope="scope">
          <el-button @click="clickUpdate(scope.row)" size="small">编辑</el-button>
          <el-button @click="clickDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改页面 -->
    <el-dialog title="修改" :visible.sync="dialogVisible">
      <cost-living-form :form-data="dialogData" @confirm="confirmUpdate" @cancel="cancelDialog"/>
    </el-dialog>
  </div>
</template>

<script>
import CostLivingForm from '../../../components/project/CostLivingForm'
export default {
  name: 'cost-living',
  components: {CostLivingForm},
  data () {
    return {
      searchData: {
        table8ProjectYear: new Date().getFullYear().toString(),
        table8ProjectId: '',
        table8Quarter: '',
        table8Type: '全部'
      },
      rules: {
        table8ProjectYear: [{ required: true, message: '不可为空', trigger: 'change' }],
        table8ProjectId: [{ required: true, message: '不可为空', trigger: 'change' }],
        table8Quarter: [{ required: true, message: '不可为空', trigger: 'change' }]
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
      this.$api.project.getTable8(this.searchData)
        .then(rsp => {
          console.log('gettable8 Success')
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
        if (item.table8EditorDate) {
          item.table8EditorDate = item.table8EditorDate.slice(0, 10)
        } else {
          item.table8EditorDate = ''
        }
        if (item.table8Price === 0.0) {
          item.table8Price = ''
        }
      })
      return list
    },
    getSummaries (params) {
      const { columns, data } = params
      let sums = []
      let demo = 0
      data.forEach((columns) => {
        demo += columns.table8TotalPrice
      })
      columns.forEach((columns, index) => {
        if (index === 0) {
          sums[index] = '累计'
        }
        if (columns.property === 'table8TotalPrice') {
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
        this.$api.project.deleteTable8({
          'table8Id': data.table8Id
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
      this.$api.project.updateTable8(data)
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
