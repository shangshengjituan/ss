<template>
  <div class="o-container">
    <el-form class="search-form" :inline="true" :model="searchData" :rules="rules" ref="searchData">
      <el-form-item label="项目：" prop="table2ProjectId">
        <el-select v-model="searchData.table2ProjectId" placeholder="请选择项目" value="">
          <el-option
            v-for="item in projectList"
            :label="item.projectName" :key="item.id" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：" prop="table2ProjectYear">
        <el-date-picker
          v-model="searchData.table2ProjectYear"
          type="year" format="yyyy" value-format="yyyy"
          :editable="false" :clearable="false"
          placeholder="请选择年份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="季度：" prop="table2Quarter">
        <el-select v-model="searchData.table2Quarter" placeholder="请选择季度" value="">
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
      :data="tableData" border row-key="id" :indent="0"
      :span-method="cellMerge"
      header-cell-class-name="header-row">
      <el-table-column type="index" width="50" fixed/>
      <el-table-column prop="optionName" label="名称" fixed/>
      <el-table-column prop="specificOptionName" label="详细类别" />
      <el-table-column prop="table2Output" label="产值（元）" />
      <el-table-column prop="table2Target" label="责任指标" />
      <el-table-column prop="table2LiabilityCost" label="责任成本（元）" />
      <el-table-column prop="table2ActualCost" label="实际成本（元）" />
      <el-table-column label="差额（元）" >
        <template slot-scope="scope">
          {{ scope.row.table2LiabilityCost - scope.row.table2ActualCost }}
        </template>
      </el-table-column>
      <el-table-column prop="table2Remark" label="备注" />
      <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="148">
        <template slot-scope="scope">
          <el-button @click="clickUpdate(scope.row)" size="small">编辑</el-button>
          <el-button @click="clickDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改" :visible.sync="dialogVisible">
      <summary-form :form-data="dialogData" @confirm="confirmUpdate" @cancel="cancelDialog"/>
    </el-dialog>
  </div>
</template>

<script>
import SummaryForm from '../../../components/project/SummaryForm'
export default {
  name: 'cost-summary',
  components: {SummaryForm},
  data () {
    return {
      searchData: {
        table2ProjectYear: new Date().getFullYear().toString(),
        table2ProjectId: '',
        table2Quarter: ''
      },
      rules: {
        table2ProjectYear: [{ required: true, message: '不可为空', trigger: 'change' }],
        table2ProjectId: [{ required: true, message: '不可为空', trigger: 'change' }],
        table2Quarter: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      departmentId: this.$store.getters.departmentId,
      plateId: this.$store.getters.plateId,
      role: this.$store.getters.role,
      projectList: [],
      options: this.$store.getters.addType[1].children,
      list: [], // 接口数据
      currentList: [], // 格式化的接口数据
      pos: '',
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
        return this.list
      },
      set () {
        return this.list
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
      this.currentList = []
      this.pos = ''
      this.$api.project.getTable2(this.searchData)
        .then(rsp => {
          console.log('getTable2 Success')
          if (rsp.data.result === 200) {
            console.log(rsp.data.table2.table2lists)
            this.list = rsp.data.table2.table2lists || []
          } else if (rsp.data.result === 404) {
            this.$message.warning(rsp.data.resultText)
            this.list = rsp.data.table2.table2lists || []
          } else {
            this.$message.error('未知错误，查询失败！')
          }
          this.getCurrentList(this.list)
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
    // 需要生成一个与行数相同的数组记录每一行设置的合并数
    getCurrentList (data) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (i === 0) {
          this.currentList.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].optionName === data[i - 1].optionName) {
            this.currentList[this.pos] += 1
            this.currentList.push(0)
          } else {
            this.currentList.push(1)
            this.pos = i
          }
        }
      }
      console.log(this.currentList)
    },
    cellMerge ({ row, column, rowIndex, columnIndex }) {
      // console.log(this.currentList)
      // console.log(row)
      if (columnIndex === 0 || columnIndex === 1) {
        let _row = this.currentList[rowIndex]
        let _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    // 点击删除
    clickDelete (data) {
      console.log(data)
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.project.deleteTable2({
          'table2Id': data.table2Id
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
    // 点击编辑，跳出修改框
    clickUpdate (data) {
      console.log(data)
      this.dialogData = Object.assign({}, data)
      this.dialogVisible = true
    },
    cancelDialog () {
      this.getList()
      this.dialogVisible = false
    },
    confirmUpdate (data) {
      this.$api.project.updateTable2(data)
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
