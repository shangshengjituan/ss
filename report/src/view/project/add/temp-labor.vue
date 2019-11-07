<template>
  <el-card shadow="hover">
    <h4>临时设施人工费明细统计</h4>
    <el-divider></el-divider>
    <el-form :model="table20" :rules="rules" ref="table20"  label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table20ProjectId">
            <el-select v-model="table20.table20ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table20ProjectYear">
            <el-date-picker
              v-model="table20.table20ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table20Quarter">
            <el-select v-model="table20.table20Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="工作内容明细" prop="table20WorkType">
            <el-input v-model="table20.table20WorkType" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位">
            <el-input v-model="table20.table20Unit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际工程量">
            <el-input v-model.number="table20.table20ActualQuantity" type="number" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单价">
            <el-input v-model.number="table20.table20Price" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际人工费"  prop="table20ActualLaborCost">
            <el-input v-model.number="table20.table20ActualLaborCost" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="起始日期">
            <el-date-picker
              v-model="table20.table20StartDate" :clearable="false" :editable="false"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              placeholder="请选择起始日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="终止日期">
            <el-date-picker
              @focus="handleEndTime"
              v-model="table20.table20EndDate" :clearable="false" :editable="false"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="请选择终止日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table20.table20Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table20.table20Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table20')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'temp-labor',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table20: {
        table20ProjectId: '',
        table20ProjectYear: '',
        table20Quarter: '',
        table20WorkType: '',
        table20Unit: '',
        table20ActualQuantity: '',
        table20Price: '',
        table20ActualLaborCost: '',
        table20StartDate: '',
        table20EndDate: '',
        table20Remark: '',
        table20Editor: this.$store.getters.userName
      },
      rules: {
        table20ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table20ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table20Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table20WorkType: [{ required: true, message: '不可为空', trigger: 'change' }],
        table20ActualLaborCost: [{ required: true, message: '不可为空', trigger: 'change' }]
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
    addTable20 () {
      console.log(this.table20)
      this.$api.project.addTable20(this.table20)
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
      let demo = new Date(this.table20.table20StartDate).getTime()
      this.pickerOptions = {
        disabledDate (time) {
          return time.getTime() < demo
        }
      }
    },
    disabledDate (time) {
      return time.getTime() > new Date(this.table20.table20StartDate).getTime()
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
            this.addTable20()
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
