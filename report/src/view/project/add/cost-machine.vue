<template>
  <el-card shadow="hover">
    <h4>机械设备费用统计</h4>
    <el-divider></el-divider>
    <el-form :model="table9" :rules="rules" ref="table9" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table9ProjectId">
            <el-select v-model="table9.table9ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table9ProjectYear">
            <el-date-picker
              v-model="table9.table9ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table9Quarter">
            <el-select v-model="table9.table9Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="名称" prop="table9MechanicalName">
            <el-input v-model="table9.table9MechanicalName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="起始时间" prop="table9StartDate">
            <el-date-picker
              v-model="table9.table9StartDate" :clearable="false" :editable="false"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              placeholder="请选择起始日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="终止时间" prop="table9EndDate">
            <el-date-picker
              @focus="handleEndTime"
              v-model="table9.table9EndDate" :clearable="false" :editable="false"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="请选择终止日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="实际机械人工费" prop="table9LaborFee">
            <el-input v-model.number="table9.table9LaborFee" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际机械租赁单价" prop="table9Price">
            <el-input v-model.number="table9.table9Price" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际机械费小计" prop="table9TotalPrice">
            <el-input v-model.number="table9.table9TotalPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="责任成本机械费" prop="table9MachineryFee">
            <el-input v-model.number="table9.table9MachineryFee" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="自购机械费" prop="table9SelfPurchaseFee">
            <el-input v-model.number="table9.table9SelfPurchaseFee" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="机械费差价">
            <el-input v-model="costDifference" :readonly="true" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table9.table9Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table9.table9Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table9')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-machine',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table9: {
        table9ProjectId: '',
        table9ProjectYear: '',
        table9Quarter: '',
        table9MechanicalName: '',
        table9LaborFee: '',
        table9StartDate: '',
        table9EndDate: '',
        table9Price: '',
        table9TotalPrice: '',
        table9MachineryFee: '',
        table9SelfPurchaseFee: '',
        table9SpreadFee: '', // 计算
        table9Remark: '',
        table9Editor: this.$store.getters.userName
      },
      rules: {
        table9ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table9ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table9Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table9MechanicalName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table9LaborFee: [{ required: true, message: '不可为空', trigger: 'change' }],
        table9StartDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
        table9EndDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
        table9Price: [{ required: true, message: '不可为空', trigger: 'change' }],
        table9TotalPrice: [{ required: true, message: '不可为空', trigger: 'change' }],
        table9MachineryFee: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: [],
      pickerOptions: {}
    }
  },
  created () {
    this.getProject()
  },
  computed: {
    costDifference () {
      return this.table9.table9MachineryFee - this.table9.table9TotalPrice
    }
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
    addTable9 () {
      this.table9.table9SpreadFee = this.costDifference
      console.log(this.table9)
      this.$api.project.addTable9(this.table9)
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
      let demo = new Date(this.table9.table9StartDate).getTime()
      this.pickerOptions = {
        disabledDate (time) {
          return time.getTime() < demo
        }
      }
    },
    disabledDate (time) {
      return time.getTime() > new Date(this.table9.table9StartDate).getTime()
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
            this.addTable9()
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
