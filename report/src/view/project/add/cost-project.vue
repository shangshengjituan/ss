<template>
  <el-card shadow="hover">
    <h4>单价分包工程成本统计</h4>
    <el-divider></el-divider>
    <el-form :model="table12" :rules="rules" ref="table12" label-width="110px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table12ProjectId">
            <el-select v-model="table12.table12ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table12ProjectYear">
            <el-date-picker
              v-model="table12.table12ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table12Quarter">
            <el-select v-model="table12.table12Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="分包项目名称" prop="table12SubcontractingName">
            <el-input v-model="table12.table12SubcontractingName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位" prop="table12Unit">
            <el-input v-model="table12.table12Unit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同工程量" prop="table12WorkQuantity">
            <el-input v-model.number="table12.table12WorkQuantity" type="number" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="合同价" prop="table12ContractPrice">
            <el-input v-model.number="table12.table12ContractPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分包单价" prop="table12SubcontractingPrice">
            <el-input v-model.number="table12.table12SubcontractingPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分包合价">
            <el-input v-model.number="table12.table12SubcontractingTotalPrice" type="number" :readonly="true"><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="责任成本单价" prop="table12LiabilityCostPrice">
            <el-input v-model.number="table12.table12LiabilityCostPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="责任成本合价">
            <el-input v-model.number="table12.table12LiabilityCostTotalPrice" :readonly="true" type="number"><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="差额">
            <el-input v-model="table12.table12Spread" placeholder="责任成本与分包合价差额" :readonly="true"><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table12.table12Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table12.table12Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table12')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-project',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table12: {
        table12ProjectId: '',
        table12ProjectYear: '',
        table12Quarter: '',
        table12SubcontractingName: '',
        table12Unit: '',
        table12WorkQuantity: '',
        table12ContractPrice: '',
        table12SubcontractingPrice: '',
        table12SubcontractingTotalPrice: '',
        table12LiabilityCostPrice: '',
        table12LiabilityCostTotalPrice: '',
        table12Spread: '', // 计算
        table12Remark: '',
        table12Editor: this.$store.getters.userName
      },
      rules: {
        table12ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table12ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table12Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table12SubcontractingName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12WorkQuantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12ContractPrice: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12SubcontractingPrice: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12LiabilityCostPrice: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: []
    }
  },
  created () {
    this.getProject()
  },
  watch: {
    table12: {
      handler (newValue, oldValue) {
        newValue.table12SubcontractingTotalPrice = parseFloat((newValue.table12ContractPrice * newValue.table12SubcontractingPrice).toFixed(2))
        newValue.table12LiabilityCostTotalPrice = parseFloat((newValue.table12WorkQuantity * newValue.table12LiabilityCostPrice).toFixed(2))
        newValue.table12Spread = parseFloat((newValue.table12LiabilityCostTotalPrice - newValue.table12SubcontractingTotalPrice).toFixed(2))
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
    addTable12 () {
      console.log(this.table12)
      this.$api.project.addTable12(this.table12)
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
            this.addTable12()
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
