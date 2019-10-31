<template>
  <el-card shadow="hover">
    <h4>收取管理费分包工程成本统计</h4>
    <el-divider></el-divider>
    <el-form :model="table10" :rules="rules" ref="table10" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table10ProjectId">
            <el-select v-model="table10.table10ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table10ProjectYear">
            <el-date-picker
              v-model="table10.table10ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table10Quarter">
            <el-select v-model="table10.table10Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="分包项目名称" prop="table10SubcontractingName">
            <el-input v-model="table10.table10SubcontractingName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分包工程合同价" prop="table10ContractPrice">
            <el-input v-model.number="table10.table10ContractPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="收管理费" prop="table10ManagementFee">
            <el-input v-model.number="table10.table10ManagementFee" type="number" clearable><template slot="append">%</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分包工程价" prop="table10EngineeringPrice">
            <el-input v-model.number="table10.table10EngineeringPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="合同价每平米造价" prop="table10ContractCost">
            <el-input v-model.number="table10.table10ContractCost" type="number" clearable><template slot="append">元/m<sup>2</sup></template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分包价每平米造价" prop="table10EngineeringCost">
            <el-input v-model.number="table10.table10EngineeringCost" type="number" clearable><template slot="append">元/m<sup>2</sup></template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table10.table10Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table10.table10Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table10')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-manage',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table10: {
        table10ProjectId: '',
        table10ProjectYear: '',
        table10Quarter: '',
        table10SubcontractingName: '',
        table10ContractPrice: '',
        table10ManagementFee: '',
        table10EngineeringPrice: '',
        table10ContractCost: '',
        table10EngineeringCost: '',
        table10Remark: '',
        table10Editor: this.$store.getters.userName
      },
      rules: {
        table10ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table10ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table10Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table10SubcontractingName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table10ContractPrice: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table10ManagementFee: [{ required: true, message: '不可为空', trigger: 'change' }],
        table10EngineeringPrice: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table10ContractCost: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table10EngineeringCost: [{ required: true, message: '请输入金额', trigger: 'change' }]
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
      }).then(rsp => {
        this.projectList = rsp.data.list
        console.log(this.projectList)
      })
    },
    addTable10 () {
      console.log(this.table10)
      this.$api.project.addTable10(this.table10)
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
            this.addTable10()
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
