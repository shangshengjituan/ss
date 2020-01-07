<template>
  <div class="o-container">
    <el-form class="search-form" :inline="true" :model="searchData" :rules="rules" ref="searchData">
      <el-form-item label="项目：" prop="table6ProjectId">
        <el-select v-model="searchData.table6ProjectId" placeholder="请选择项目" value="">
          <el-option
            v-for="item in projectList"
            :label="item.projectName" :key="item.id" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：" prop="table6ProjectYear">
        <el-date-picker
          v-model="searchData.table6ProjectYear"
          type="year" format="yyyy" value-format="yyyy"
          :editable="false" :clearable="false"
          placeholder="请选择年份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="季度：" prop="table6Quarter">
        <el-select v-model="searchData.table6Quarter" placeholder="请选择季度" value="">
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
      <el-table-column prop="table6MaterialName" label="材料名称" fixed/>
      <el-table-column prop="table6SpecificationModel" label="规格型号" />
      <el-table-column prop="table6Unit" label="单位" />
      <el-table-column prop="table6ActualEngineering" label="实际工程量" />
      <el-table-column prop="table6ContractEngineering" label="合同工程量" />
      <el-table-column prop="table6ActualPrice" label="实际单价（元）" />
      <el-table-column prop="table6ActualTotalPrice" label="实际材料费合价（元）" />
      <el-table-column prop="table6LiabilityCostPrice" label="责任成本材料费单价（元）" />
      <el-table-column prop="table6LiabilityCostTotalPrice" label="责任成本材料费合价（元）" />
      <el-table-column prop="table6Spread" label="材料费差价（元）" />
      <el-table-column prop="table6Remark" label="备注" />
      <el-table-column prop="table6Editor" label="编制人" />
      <el-table-column prop="table6EditorDate" label="编制时间" />
      <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="116">
        <template slot-scope="scope">
          <el-button @click="clickUpdate(scope.row)" size="mini">编辑</el-button>
          <el-button @click="clickDelete(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改页面 -->
    <el-dialog title="修改" :visible.sync="dialogVisible">
      <cost-material-detail-form :form-data="dialogData" @confirm="confirmUpdate" @cancel="cancelDialog" />
    </el-dialog>
  </div>
</template>

<script>
import CostMaterialDetailForm from '../../../components/project/CostMaterialDetailForm'
export default {
  name: 'cost-material-detail',
  components: {CostMaterialDetailForm},
  data () {
    return {
      searchData: {
        table6ProjectYear: new Date().getFullYear().toString(),
        table6ProjectId: '',
        table6Quarter: ''
      },
      rules: {
        table6ProjectYear: [{ required: true, message: '不可为空', trigger: 'change' }],
        table6ProjectId: [{ required: true, message: '不可为空', trigger: 'change' }],
        table6Quarter: [{ required: true, message: '不可为空', trigger: 'change' }]
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
      this.$api.project.getTable6(this.searchData)
        .then(rsp => {
          console.log('gettable6 Success')
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
        if (item.table6EditorDate) {
          item.table6EditorDate = item.table6EditorDate.slice(0, 10)
        } else {
          item.table6EditorDate = ''
        }
      })
      return list
    },
    getSummaries (params) {
      const { columns, data } = params
      let sums = []
      let [demo, demo1, demo2] = [0, 0, 0]
      data.forEach((columns) => {
        demo += columns.table6ActualTotalPrice
        demo1 += columns.table6LiabilityCostTotalPrice
        demo2 += columns.table6Spread
      })
      columns.forEach((columns, index) => {
        if (index === 0) {
          sums[index] = '累计'
        }
        switch (columns.property) {
          case 'table6ActualTotalPrice': sums[index] = demo
            break
          case 'table6LiabilityCostTotalPrice': sums[index] = demo1
            break
          case 'table6Spread': sums[index] = demo2
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
        this.$api.project.deleteTable6({
          'table6Id': data.table6Id
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
      this.$api.project.updateTable6(data)
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
