<template>
  <div class="o-container">
    <el-form class="search-form" :inline="true" :model="searchData" :rules="rules" ref="searchData">
      <el-form-item label="项目：" prop="table7ProjectId">
        <el-select v-model="searchData.table7ProjectId" placeholder="请选择项目" value="">
          <el-option
            v-for="item in projectList"
            :label="item.projectName" :key="item.id" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：" prop="table7ProjectYear">
        <el-date-picker
          v-model="searchData.table7ProjectYear"
          type="year" format="yyyy" value-format="yyyy"
          :editable="false" :clearable="false"
          placeholder="请选择年份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="季度：" prop="table7Quarter">
        <el-select v-model="searchData.table7Quarter" placeholder="请选择季度" value="">
          <el-option
            v-for="item in options"
            :label="item.label" :key="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" prop="table7Type">
        <el-select v-model="searchData.table7Type" value="">
          <el-option value="全部" key="0" label="全部"/>
          <el-option value="调入" key="1" label="调入"/>
          <el-option value="调出" key="2" label="调出"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validateData('searchData')"> 查询 </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData" border row-key="id" :indent="0"
      header-cell-class-name="header-row">
      <el-table-column prop="table7MaterialName" label="材料名称" />
      <el-table-column prop="table7Type" label="类型" width="68">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.table7Type === '调入' ? 'primary' : 'info'"
            disable-transitions>{{ scope.row.table7Type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="table7RecallUnit" label="调出单位" />
      <el-table-column prop="table7TransferUnit" label="调入单位" />
      <el-table-column prop="table7Unit" label="单位" />
      <el-table-column prop="table7WorkQuantity" label="工程量" />
      <el-table-column prop="table7Price" label="单价（元）" />
      <el-table-column prop="table7TotalPrice" label="合价（元）" />
      <el-table-column prop="table7Remark" label="备注" />
      <el-table-column prop="table7Editor" label="编制人" />
      <el-table-column prop="table7EditorDate" label="编制时间" />
      <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="148">
        <template slot-scope="scope">
          <el-button @click="clickUpdate(scope.row)" size="small">编辑</el-button>
          <el-button @click="clickDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改页面 -->
    <el-dialog title="修改" :visible.sync="dialogVisible">
      <cost-material-form :form-data="dialogData" @confirm="confirmUpdate" @cancel="cancelDialog" />
    </el-dialog>
  </div>
</template>

<script>
import CostMaterialForm from '../../../components/project/CostMaterialForm'
export default {
  name: 'cost-material',
  components: {CostMaterialForm},
  data () {
    return {
      searchData: {
        table7ProjectYear: new Date().getFullYear().toString(),
        table7ProjectId: '',
        table7Quarter: '',
        table7Type: '全部'
      },
      rules: {
        table7ProjectYear: [{ required: true, message: '不可为空', trigger: 'change' }],
        table7ProjectId: [{ required: true, message: '不可为空', trigger: 'change' }],
        table7Quarter: [{ required: true, message: '不可为空', trigger: 'change' }]
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
      this.$api.project.getTable7(this.searchData)
        .then(rsp => {
          console.log('gettable7 Success')
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
        if (item.table7EditorDate) {
          item.table7EditorDate = item.table7EditorDate.slice(0, 10)
        } else {
          item.table7EditorDate = ''
        }
      })
      return list
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
        this.$api.project.deleteTable7({
          'table7Id': data.table7Id
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
      this.$api.project.updateTable7(data)
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
