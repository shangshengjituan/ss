<template>
  <el-card shadow="hover">
    <h4>项目管理人员工资统计</h4>
    <el-divider></el-divider>
    <el-form :model="table17" :rules="rules" ref="table17"  label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table17ProjectId">
            <el-select v-model="table17.table17ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table17ProjectYear">
            <el-date-picker
              v-model="table17.table17ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table17Quarter">
            <el-select v-model="table17.table17Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="姓名">
            <el-input v-model="table17.table17Name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="岗位与职务">
            <el-input v-model="table17.table17PostPosition" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="进项目时间">
            <el-date-picker
              v-model="table17.table17EnterTime" :clearable="false" :editable="false"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              placeholder="请选择起始日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出项目时间">
            <el-date-picker
              @focus="handleEndTime"
              v-model="table17.table17OutTime" :clearable="false" :editable="false"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="请选择终止日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工资标准">
            <el-input v-model.number="table17.table17FeeStandard" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件津贴">
            <el-input v-model.number="table17.table17Allowance" type="number" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table17.table17Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table17.table17Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table17')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'staff-wage',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table17: {
        table17ProjectId: '',
        table17ProjectYear: '',
        table17Quarter: '',
        table17Name: '',
        table17PostPosition: '',
        table17EnterTime: '',
        table17OutTime: '',
        table17FeeStandard: '',
        table17Allowance: '',
        table17Remark: '',
        table17Editor: this.$store.getters.userName
      },
      rules: {
        table17ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table17ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table17Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: [],
      pickerOptions: {}
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
    addTable17 () {
      console.log(this.table17)
      this.$api.project.addTable17(this.table17)
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
    handleEndTime () {
      let demo = new Date(this.table17.table17EnterTime).getTime()
      this.pickerOptions = {
        disabledDate (time) {
          return time.getTime() < demo
        }
      }
    },
    disabledDate (time) {
      return time.getTime() > new Date(this.table17.table17OutTime).getTime()
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
            this.addTable17()
          }).catch(err => {
            console.log(err)
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
