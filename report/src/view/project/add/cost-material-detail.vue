<template>
  <el-card shadow="hover">
    <h4>材料费明细统计</h4>
    <el-divider></el-divider>
    <el-form :model="table6" :rules="rules" ref="table6" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table6ProjectId">
            <el-select v-model="table6.table6ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table6ProjectYear">
            <el-date-picker
              v-model="table6.table6ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table6Quarter">
            <el-select v-model="table6.table6Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="材料名称" prop="table6MaterialName">
            <el-input v-model="table6.table6MaterialName" placeholder="请输入材料名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规格型号">
            <el-input v-model="table6.table6SpecificationModel" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位">
            <el-input v-model="table6.table6Unit" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="实际工程量">
            <el-input v-model.number="table6.table6ActualEngineering" type="number" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际单价">
            <el-input v-model.number="table6.table6ActualPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际材料费合价">
            <el-input v-model.number="table6.table6ActualTotalPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="合同工程量">
            <el-input v-model.number="table6.table6ContractEngineering" type="number" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="责任成本材料费单价">
            <el-input v-model.number="table6.table6LiabilityCostPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="责任成本材料费合价">
            <el-input v-model.number="table6.table6LiabilityCostTotalPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="材料费差价">
            <el-input v-model="costDifference" :readonly="true" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table6.table6Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table6.table6Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table6')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-material-detail',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table6: {
        table6ProjectId: '',
        table6ProjectYear: '',
        table6Quarter: '',
        table6MaterialName: '',
        table6SpecificationModel: '',
        table6Unit: '',
        table6ActualEngineering: '',
        table6ContractEngineering: '',
        table6ActualPrice: '',
        table6ActualTotalPrice: '',
        table6LiabilityCostPrice: '',
        table6LiabilityCostTotalPrice: '',
        table6Spread: '', // 计算
        table6Remark: '',
        table6Editor: this.$store.getters.userName
      },
      rules: {
        table6ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table6ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table6Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table6MaterialName: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: []
    }
  },
  created () {
    this.getProject()
  },
  computed: {
    costDifference () {
      return parseFloat((this.table6.table6LiabilityCostTotalPrice - this.table6.table6ActualTotalPrice).toFixed(2))
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
    addTable6 () {
      this.table6.table6Spread = this.costDifference
      console.log(this.table6)
      this.$api.project.addTable6(this.table6)
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
            this.addTable6()
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
