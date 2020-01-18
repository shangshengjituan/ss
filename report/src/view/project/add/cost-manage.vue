<template>
  <el-card shadow="hover">
    <h4>项目管理费用统计</h4>
    <el-divider></el-divider>
    <el-form :model="table15" :rules="rules" ref="table15" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table15ProjectId">
            <el-select v-model="table15.table15ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table15ProjectYear">
            <el-date-picker
              v-model="table15.table15ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table15Quarter">
            <el-select v-model="table15.table15Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="购买用品名称" prop="table15SuppliesName">
            <el-input v-model="table15.table15SuppliesName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用途" prop="table15Use">
            <el-input v-model="table15.table15Use" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="固定资产编号" >
            <el-input v-model="table15.table15Numbering" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="时间" prop="table15Time">
            <el-date-picker
              v-model="table15.table15Time"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :clearable="false" :editable="false">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办人" prop="table15Manager">
            <el-input v-model="table15.table15Manager" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开票情况">
            <el-input v-model="table15.table15Billing" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位" prop="table15Unit">
            <el-input v-model="table15.table15Unit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数量" prop="table15Quantity">
            <el-input v-model.number="table15.table15Quantity" type="number" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单价" prop="table15Amount">
            <el-input v-model.number="table15.table15Amount" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="总额">
            <el-input v-model="table15.table15TotalAmount" :readonly="true"><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table15.table15Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table15.table15Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table15')"> 立即创建 </el-button>
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
      table15: {
        table15ProjectId: '',
        table15ProjectYear: '',
        table15Quarter: '',
        table15SuppliesName: '',
        table15Use: '',
        table15Numbering: '',
        table15Time: '',
        table15Manager: '',
        table15Billing: '',
        table15Unit: '',
        table15Quantity: '',
        table15Amount: '',
        table15TotalAmount: '', // 计算
        table15Remark: '',
        table15Editor: this.$store.getters.userName
      },
      rules: {
        table15ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table15ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table15Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table15SuppliesName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table15Use: [{ required: true, message: '不可为空', trigger: 'change' }],
        table15Time: [{ required: true, message: '请选择时间', trigger: 'change' }],
        table15Manager: [{ required: true, message: '不可为空', trigger: 'change' }],
        table15Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table15Quantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table15Amount: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: []
    }
  },
  created () {
    this.getProject()
  },
  watch: {
    table15: {
      handler (newValue, oldValue) {
        newValue.table15TotalAmount = Math.round((newValue.table15Quantity * newValue.table15Amount) * 100) / 100
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
    addTable15 () {
      console.log(this.table15)
      this.$api.project.addTable15(this.table15)
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
            this.addTable15()
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
