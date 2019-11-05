<template>
  <el-card shadow="hover">
    <h4>项目经营费用统计</h4>
    <el-divider></el-divider>
    <el-form :model="table18" :rules="rules" ref="table18" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table18ProjectId">
            <el-select v-model="table18.table18ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table18ProjectYear">
            <el-date-picker
              v-model="table18.table18ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table18Quarter">
            <el-select v-model="table18.table18Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="事由" prop="table18Cause">
            <el-input v-model="table18.table18Cause" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="时间">
            <el-date-picker
              v-model="table18.table18Time"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :clearable="false" :editable="false">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办人">
            <el-input v-model="table18.table18Principal" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="开票情况">
            <el-input v-model="table18.table18Billing" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="金额" prop="table18Amount">
            <el-input v-model.number="table18.table18Amount" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table18.table18Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table18.table18Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table18')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-run',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table18: {
        table18ProjectId: '',
        table18ProjectYear: '',
        table18Quarter: '',
        table18Cause: '',
        table18Time: '',
        table18Principal: '',
        table18Billing: '',
        table18Amount: '',
        table18Remark: '',
        table18Editor: this.$store.getters.userName
      },
      rules: {
        table18ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table18ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table18Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table18Cause: [{ required: true, message: '不可为空', trigger: 'change' }],
        table18Amount: [{ required: true, message: '请输入金额', trigger: 'change' }]
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
    addTable18 () {
      console.log(this.table18)
      this.$api.project.addTable18(this.table18)
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
            this.addTable18()
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
