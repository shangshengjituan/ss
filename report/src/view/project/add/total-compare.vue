<template>
  <el-card shadow="hover">
    <h4>项目自行完成总产值与相应的责任成本、实际成本人、材、机对比统计</h4>
    <el-divider></el-divider>
    <el-form :model="table22" :rules="rules" ref="table22" label-width="110px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table22ProjectId">
            <el-select v-model="table22.table22ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table22ProjectYear">
            <el-date-picker
              v-model="table22.table22ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table22Quarter">
            <el-select v-model="table22.table22Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="工种">
            <el-input v-model="table22.table22WorkType" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="责任成本人工费占总产值百分比">
            <el-input v-model="table22.table22LiabilityLabor" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际成本人工费占总产值百分比">
            <el-input v-model="table22.table22ActualLabor" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="责任成本材料费占总产值百分比">
            <el-input v-model="table22.table22LiabilityMaterial" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际成本材料费占总产值百分比">
            <el-input v-model="table22.table22ActualMaterial" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="责任成本机械费占总产值百分比">
            <el-input v-model="table22.table22LiabilityMechanical" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际成本机械费占总产值百分比">
            <el-input v-model="table22.table22ActualMechanical" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table22.table22Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table22.table22Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table22')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'total-compare',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table22: {
        table22ProjectId: '',
        table22ProjectYear: '',
        table22Quarter: '',
        table22WorkType: '',
        table22LiabilityLabor: '',
        table22ActualLabor: '',
        table22LiabilityMaterial: '',
        table22ActualMaterial: '',
        table22LiabilityMechanical: '',
        table22ActualMechanical: '',
        table22Remark: '',
        table22Editor: this.$store.getters.userName
      },
      rules: {
        table22ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table22ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table22Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: [],
      workList: []
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
    addTable22 () {
      this.$api.project.addTable22(this.table22)
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
            this.addTable22()
          }).catch(() => {
            console.log('cancel submit.')
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
  .el-form-item {
    position: relative;
  }
  .el-form-item__label {
    text-align: right;
    /* vertical-align: middle; */
    /* float: left; */
    font-size: 14px;
    color: #606266;
    /* line-height: 40px; */
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50px;
    transform: translate(-50%, -50%);
  }
</style>
