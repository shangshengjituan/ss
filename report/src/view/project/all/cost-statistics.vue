<template>
  <div class="o-container">
    <el-form class="search-form" :inline="true" :model="searchData" :rules="rules" ref="searchData">
      <el-form-item label="项目：" prop="table1ProjectId">
        <el-select v-model="searchData.table1ProjectId" placeholder="请选择项目" value="">
          <el-option
            v-for="item in projectList"
            :label="item.projectName" :key="item.id" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：" prop="table1ProjectYear">
        <el-date-picker
          v-model="searchData.table1ProjectYear"
          type="year" format="yyyy" value-format="yyyy"
          :editable="false" :clearable="false"
          placeholder="请选择年份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="季度：" prop="table1Quarter">
        <el-select v-model="searchData.table1Quarter" placeholder="请选择季度" value="">
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
    <div v-show="isExist" class="o-margin">
      <el-form :model="table1up" label-width="150px">
        <el-row >
          <el-col :span="8">
            <el-form-item label="项目经理：">
              {{table1up.projectManager}}
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="合同约定质量标准：">
              {{table1up.contractedQuality}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8">
            <el-form-item label="合同计划开工时间：">
              {{table1up.plannedStartDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同竣工时间：">
              {{table1up.plannedEndDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同日历天数：">
              {{table1up.plannedDays}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8">
            <el-form-item label="实际开工时间：">
              {{table1up.actualStartDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际竣工时间：">
              {{table1up.actualEndDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际日历天数：">
              {{table1up.actualDays}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8">
            <el-form-item label="中标备案合同总价：">
              {{table1up.contractTotalPrice}} 元
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="每平米造价：">
              {{ table1up.costPerSquareMeter }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工程面积：">
              {{ table1up.projectArea }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="备案合同工作内容：" class="o-special">
              {{ table1up.workContent }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="role === 'leader'" style="float: right">
          <el-button  @click="clickUpdateUp" size="mini">编辑</el-button>
          <el-button @click="clickDeleteUp" type="danger" size="mini"> 删除 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="修改" :visible.sync="dialogVisibleUp">
      <statistics-up-form :form-data="dialogDataUp" @confirm="confirmUpdateUp" @cancel="cancelDialogUp"/>
    </el-dialog>
    <el-table
      show-summary :summary-method="getSummaries"
      :data="tableData" border row-key="id" :indent="0"
      header-cell-class-name="header-row">
      <el-table-column type="index" width="50" fixed/>
      <el-table-column prop="table1OptionName" label="项目名称" fixed/>
      <el-table-column prop="table1ContractPrice" label="合同价（元）" />
      <el-table-column prop="table1LiabilityCost" label="责任成本（元）" />
      <el-table-column prop="table1ActualCost" label="实际成本（元）" />
      <el-table-column prop="table1ContractPriceM2" label="合同价每平米造价（元/m^2）" />
      <el-table-column prop="table1LiabilityCostM2" label="责任成本每平米造价（元/m^2）" />
      <el-table-column prop="table1ActualCostM2" label="实际成本每平米造价（元/m^2）" />
      <el-table-column prop="table1Remark" label="备注" />
      <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="148">
        <template slot-scope="scope">
          <el-button @click="clickUpdate(scope.row)" size="small">编辑</el-button>
          <el-button @click="clickDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改页面 -->
    <el-dialog title="修改" :visible.sync="dialogVisible">
      <statistics-form :form-data="dialogData" @confirm="confirmUpdate" @cancel="cancelDialog"/>
    </el-dialog>
  </div>
</template>

<script>
import StatisticsForm from '../../../components/project/StatisticsForm'
import StatisticsUpForm from '../../../components/project/StatisticsUpForm'
export default {
  name: 'cost-statistics',
  components: {StatisticsUpForm, StatisticsForm},
  data () {
    return {
      searchData: {
        table1ProjectYear: new Date().getFullYear().toString(),
        table1ProjectId: '',
        table1Quarter: ''
      },
      rules: {
        table1ProjectYear: [{ required: true, message: '不可为空', trigger: 'change' }],
        table1ProjectId: [{ required: true, message: '不可为空', trigger: 'change' }],
        table1Quarter: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      departmentId: this.$store.getters.departmentId,
      plateId: this.$store.getters.plateId,
      role: this.$store.getters.role,
      projectList: [],
      options: this.$store.getters.addType[1].children,
      table1up: {}, // 接口数据上部分
      list: [], // 接口数据
      isExist: false,
      dialogDataUp: {},
      dialogVisibleUp: false,
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
  watch: {
    table1up: {
      handler (newValue, oldValue) {
        Object.keys(newValue).length ? this.isExist = true : this.isExist = false
      },
      deep: true
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
      this.$api.project.getTable1(this.searchData)
        .then(rsp => {
          console.log('getTable1 Success')
          if (rsp.data.table1 && rsp.data.table1Introduction) {
            console.log(rsp.data)
            this.list = rsp.data.table1 || []
            this.table1up = rsp.data.table1Introduction || {}
          } else {
            this.list = rsp.data.table1 || []
            this.table1up = rsp.data.table1Introduction || {}
            this.$message.warning('暂无数据！')
          }
        })
        .catch(error => {
          console.log(error)
          this.$message.error(error)
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
    clickDeleteUp () {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.project.deleteTable1Up({
          'table1IntroductionId': this.table1up.table1IntroductionId
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
    clickUpdateUp () {
      this.dialogDataUp = this.table1up
      this.dialogVisibleUp = true
    },
    confirmUpdateUp (data) {
      this.$api.project.updateTable1Up(data)
        .then(rsp => {
          let data = rsp.data
          if (data.result === 200) {
            this.$message.success('修改成功！')
          } else {
            this.$message.error('修改失败：' + data.resultText)
          }
          this.getList()
          console.log(rsp)
          this.dialogVisibleUp = false
        })
    },
    cancelDialogUp () {
      this.getList()
      this.dialogVisible = false
    },
    // 点击删除
    clickDelete (data) {
      console.log(data)
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.project.deleteTable1({
          'table1Id': data.table1Id
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
    getSummaries (params) {
      const { columns, data } = params
      let sums = []
      let [demo, demo1] = [0, 0]
      data.forEach((columns) => {
        demo += columns.table1ContractPrice
        demo1 += columns.table1ActualCost
      })
      columns.forEach((columns, index) => {
        if (index === 0) {
          sums[index] = '累计'
        }
        if (columns.property === 'table1ContractPrice') {
          sums[index] = demo
        }
        if (columns.property === 'table1ActualCost') {
          sums[index] = demo1
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
    cancelDialog () {
      this.getList()
      this.dialogVisible = false
    },
    confirmUpdate (data) {
      this.$api.project.updateTable1(data)
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
/*.o-margin {*/
  /*border: 1px solid #9c9393;*/
/*}*/
.o-margin .el-row .el-form-item {
  margin: 0;
  border-left: 1px solid #9c9393;
  border-top: 1px solid #9c9393;
}
.o-margin .el-row .el-col:last-child .el-form-item {
  border-right: 1px solid #9c9393;
}

.o-margin .o-special {
  border-bottom: 1px solid #9c9393;
}

.o-margin .el-form-item .el-form-item__content {
  border-left: 1px solid #9c9393 !important;
}
</style>
