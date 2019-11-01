<template>
  <el-card shadow="hover">
    <h4>项目分包工程生产情况统计</h4>
    <el-divider></el-divider>
    <el-form :model="table14" :rules="rules" ref="table14" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table14ProjectId">
            <el-select v-model="table14.table14ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table14ProjectYear">
            <el-date-picker
              v-model="table14.table14ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table14Quarter">
            <el-select v-model="table14.table14Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="工作内容明细" prop="table14WorkContent">
            <el-input v-model="table14.table14WorkContent" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位" prop="table14Unit">
            <el-input v-model="table14.table14Unit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际完成产值" prop="table14ActualOutputValue">
            <el-input v-model.number="table14.table14ActualOutputValue" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="实际施工日历天数" prop="table14ActualDayNumber">
            <el-input v-model="table14.table14ActualDayNumber" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际平均人数" prop="table14ActualPeopleNumber">
            <el-input v-model="table14.table14ActualPeopleNumber" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际平均出勤人数" prop="table14ActualAttendancePeople">
            <el-input v-model="table14.table14ActualAttendancePeople" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="出勤率" prop="table14AttendanceRate">
            <el-input v-model.number="table14.table14AttendanceRate" type="number" clearable><template slot="append">%</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="每人每天平均完成产值" prop="table14AverageOutputValue">
            <el-input v-model.number="table14.table14AverageOutputValue" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工期完成情况" prop="table14Duartion">
            <el-input v-model="table14.table14Duartion" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="质量完成情况" prop="table14Quality">
            <el-input v-model="table14.table14Quality" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="安全生产情况" prop="table14Safety">
            <el-input v-model="table14.table14Safety" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table14.table14Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table14.table14Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table14')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'project-product',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table14: {
        table14ProjectId: '',
        table14ProjectYear: '',
        table14Quarter: '',
        table14WorkContent: '',
        table14Unit: '',
        table14ActualOutputValue: '',
        table14ActualDayNumber: '',
        table14ActualPeopleNumber: '',
        table14ActualAttendancePeople: '',
        table14AttendanceRate: '',
        table14AverageOutputValue: '',
        table14Duartion: '',
        table14Quality: '',
        table14Safety: '',
        table14Remark: '',
        table14Editor: this.$store.getters.userName
      },
      rules: {
        table14ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table14ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table14Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table14WorkContent: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14ActualOutputValue: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table14ActualDayNumber: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14ActualPeopleNumber: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14ActualAttendancePeople: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14AttendanceRate: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14AverageOutputValue: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table14Duartion: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14Quality: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14Safety: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: []
    }
  },
  created () {
    this.getProject()
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
    addTable14 () {
      this.$api.project.addTable14(this.table14)
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
            this.addTable14()
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
