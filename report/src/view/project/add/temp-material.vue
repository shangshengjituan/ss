<template>
  <el-card shadow="hover">
    <h4>临时设施、场地等材料费明细统计</h4>
    <el-divider></el-divider>
    <el-form :model="table21" :rules="rules" ref="table21" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table21ProjectId">
            <el-select v-model="table21.table21ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table21ProjectYear">
            <el-date-picker
              v-model="table21.table21ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table21Quarter">
            <el-select v-model="table21.table21Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="材料名称" prop="table21MaterialName">
            <el-input v-model="table21.table21MaterialName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规格型号">
            <el-input v-model="table21.table21SpecificationModal" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位">
            <el-input v-model="table21.table21Unit" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="采购时间">
            <el-date-picker
              v-model="table21.table21PurchaseTime"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :clearable="false" :editable="false">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="实际工程量">
            <el-input v-model.number="table21.table21ActualQuantity" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际单价">
            <el-input v-model.number="table21.table21ActualPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际材料费">
            <el-input v-model.number="table21.table21MaterialPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table21.table21Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table21.table21Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table21')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'temp-material',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table21: {
        table21ProjectId: '',
        table21ProjectYear: '',
        table21Quarter: '',
        table21MaterialName: '',
        table21SpecificationModal: '',
        table21Unit: '',
        table21PurchaseTime: '',
        table21ActualQuantity: '',
        table21ActualPrice: '',
        table21MaterialPrice: '', // 计算
        table21Remark: '',
        table21Editor: this.$store.getters.userName
      },
      rules: {
        table21ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table21ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table21Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table21MaterialName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table21MaterialPrice: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: []
    }
  },
  created () {
    this.getProject()
  },
  watch: {
    table21: {
      handler (newValue, oldValue) {
        if (newValue.table21ActualPrice && newValue.table21ActualQuantity) {
          newValue.table21MaterialPrice = parseFloat((newValue.table21ActualPrice * newValue.table21ActualQuantity).toFixed(2))
        }
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
    addTable21 () {
      console.log(this.table21)
      this.$api.project.addTable21(this.table21)
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
            this.addTable21()
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
