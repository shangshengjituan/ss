<template>
  <el-card shadow="hover">
    <h4>单价分包工程成本明细统计</h4>
    <el-divider></el-divider>
    <el-form :model="table13" :rules="rules" ref="table13" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table13ProjectId">
            <el-select v-model="table13.table13ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table13ProjectYear">
            <el-date-picker
              v-model="table13.table13ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table13Quarter">
            <el-select v-model="table13.table13Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="分包项目名称" prop="table13SubcontractingName">
            <el-input v-model="table13.table13SubcontractingName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位" prop="table13Unit">
            <el-input v-model="table13.table13Unit" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="合同工程量" prop="table13ContractQuantity">
            <el-input v-model.number="table13.table13ContractQuantity" type="number" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际工程量" prop="table13ActualQuantity">
            <el-input v-model.number="table13.table13ActualQuantity" type="number" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="完成形象进度情况" prop="table13Schedule">
            <el-input v-model="table13.table13Schedule" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="分包单价" prop="table13SubcontractingPrice">
            <el-input v-model.number="table13.table13SubcontractingPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分包合价">
            <el-input v-model.number="table13.table13SubcontractingTotalPrice" type="number" :readonly="true"><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="责任成本单价" prop="table13LiabilityCostPrice">
            <el-input v-model.number="table13.table13LiabilityCostPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="责任成本合价">
            <el-input v-model.number="table13.table13LiabilityCostTotalPrice" :readonly="true" type="number"><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table13.table13Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table13.table13Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table13')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-project-detail',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table13: {
        table13ProjectId: '',
        table13ProjectYear: '',
        table13Quarter: '',
        table13SubcontractingName: '',
        table13Unit: '',
        table13ContractQuantity: '',
        table13ActualQuantity: '',
        table13Schedule: '',
        table13SubcontractingPrice: '',
        table13SubcontractingTotalPrice: '',
        table13LiabilityCostPrice: '',
        table13LiabilityCostTotalPrice: '',
        table13Spread: '', // 计算
        table13Remark: '',
        table13Editor: this.$store.getters.userName
      },
      rules: {
        table13ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table13ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table13Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table13SubcontractingName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13ContractQuantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13ActualQuantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13Schedule: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13SubcontractingPrice: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13LiabilityCostPrice: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: []
    }
  },
  created () {
    this.getProject()
  },
  watch: {
    table13: {
      handler (newValue, oldValue) {
        newValue.table13SubcontractingTotalPrice = newValue.table13ActualQuantity * newValue.table13SubcontractingPrice
        newValue.table13LiabilityCostTotalPrice = newValue.table13ContractQuantity * newValue.table13LiabilityCostPrice
        newValue.table13Spread = newValue.table13LiabilityCostTotalPrice - newValue.table13SubcontractingTotalPrice
      },
      deep: true
    }
  },
  methods: {
    getProject () {
      this.$api.project.getProjectList({
        departmentId: this.departmentId,
        plateId: this.plateId
      }).then(rsp => {
        this.projectList = rsp.data.list
        console.log(this.projectList)
      })
    },
    addTable13 () {
      console.log(this.table13)
      this.$api.project.addTable13(this.table13)
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
            this.addTable13()
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
