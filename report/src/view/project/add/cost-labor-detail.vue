<template>
  <el-card shadow="hover">
    <h4>项目人工费明细统计</h4>
    <el-divider></el-divider>
    <el-form :model="table4" :rules="rules" ref="table4" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table4ProjectId">
            <!--<el-input v-model="table4.table3ProjectId" :readonly="true"></el-input>-->
            <el-select v-model="table4.table4ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table4ProjectYear">
            <el-date-picker
              v-model="table4.table4ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table4Quarter">
            <el-select v-model="table4.table4Quarter" placeholder="请选择季度" value="">
              <el-option
                v-for="item in options"
                :label="item.label" :key="item.value" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工作内容明细" prop="table4WorkTypeId">
            <el-select v-model="table4.table4WorkTypeId" placeholder="请选择工作内容明细" value="">
              <el-option
                v-for="item in workList"
                :key="item.id" :label="item.bricklayer" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="班组" prop="table4Team">
            <el-input v-model="table4.table4Team" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位" prop="table4Unit">
            <el-select
              filterable allow-create default-first-option
              v-model="table4.table4Unit" placeholder="请选择单位" value="">
              <el-option value="m^2">m<sup>2</sup></el-option>
              <el-option value="m^3">m<sup>3</sup></el-option>
              <el-option value="个">个</el-option>
              <el-option value="t">t</el-option>
              <el-option value="根">根</el-option>
            </el-select>
            <!--<el-input v-model="table4.table3Unit" placeholder="m^2 个" clearable />-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="实际完成产值" prop="table4ActualValue">
            <el-input v-model.number="table4.table4ActualValue" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际施工日历天数" prop="table4ActualDay">
            <el-input v-model="table4.table4ActualDay" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际平均人数" prop="table4ActualAveragePeople">
            <el-input v-model="table4.table4ActualAveragePeople" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="实际平均出勤人数" prop="table4ActualAverageAttendance">
            <el-input v-model="table4.table4ActualAverageAttendance" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出勤率" prop="table4AttendanceRate">
            <el-input v-model.number="table4.table4AttendanceRate" type="number" clearable><template slot="append">%</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="每人每天平均完成产值" prop="table4OutputValuePerPersonPerDay">
            <el-input v-model.number="table4.table4OutputValuePerPersonPerDay" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工期完成情况" prop="table4ProjectCompletion">
            <el-input v-model="table4.table4ProjectCompletion" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="质量完成情况" prop="table4QualityCompletion">
            <el-input v-model="table4.table4QualityCompletion" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="安全生产情况" prop="table4SafetyProductionSituation">
            <el-input v-model="table4.table4SafetyProductionSituation" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table4.table4Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table4.table4Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table4')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-labor-detail',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table4: {
        table4ProjectId: '',
        table4ProjectYear: '',
        table4Quarter: '',
        table4WorkTypeId: '',
        table4Team: '',
        table4Unit: '',
        table4ActualValue: '',
        table4ActualDay: '',
        table4ActualAveragePeople: '',
        table4ActualAverageAttendance: '',
        table4AttendanceRate: '',
        table4OutputValuePerPersonPerDay: '',
        table4ProjectCompletion: '',
        table4QualityCompletion: '',
        table4SafetyProductionSituation: '',
        table4Remark: '',
        table4Editor: this.$store.getters.userName
      },
      rules: {
        table4ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table4ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table4WorkTypeId: [{ required: true, message: '请选择明细', trigger: 'change' }],
        table4Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table4Team: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4ActualValue: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table4ActualDay: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4ActualAveragePeople: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4ActualAverageAttendance: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4AttendanceRate: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4OutputValuePerPersonPerDay: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table4ProjectCompletion: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4QualityCompletion: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4SafetyProductionSituation: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: [],
      workList: []
    }
  },
  created () {
    this.getProject()
    this.getWork()
  },
  methods: {
    getProject () {
      this.$api.project.getProjectList({
        departmentId: this.departmentId,
        plateId: this.plateId
      })
        .then(rsp => {
          this.projectList = rsp.data.list
          console.log(this.projectList)
        })
    },
    getWork () {
      this.$api.project.getWorkList()
        .then(rsp => {
          this.workList = rsp.data.list
          console.log(this.workList)
        })
    },
    addTable4 () {
      this.$api.project.addTable4(this.table4)
        .then(rsp => {
          if (rsp.data.result === 200) {
            this.$message.success('新增表单成功！')
            this.reload() // 刷新
          } else if (rsp.data.result === 500) {
            this.$message.error(rsp.data.resultText)
          } else {
            this.$message.error('新增项目失败……')
          }
          console.log(rsp.data)
        })
    },
    validateData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交确认框
          this.$confirm('确认提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.addTable4()
          }).catch(() => {
            console.log('cancel submit.')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
