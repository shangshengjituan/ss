<template>
  <el-card shadow="hover">
    <h4>收取管理费分包工程产值统计</h4>
    <el-divider></el-divider>
    <el-form :model="table11" :rules="rules" ref="table11" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table11ProjectId">
            <el-select v-model="table11.table11ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table11ProjectYear">
            <el-date-picker
              v-model="table11.table11ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table11Quarter">
            <el-select v-model="table11.table11Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="分包工程名称">
            <el-input v-model="table11.table11Header" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分部分项名称" prop="table11PartialItemName">
            <el-input v-model="table11.table11PartialItemName" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位" prop="table11Unit">
            <el-input v-model="table11.table11Unit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="完成工程量">
            <el-input v-model.number="table11.table11WorkQuantity" type="number" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="完成产值" prop="table11OutputValue">
            <el-input v-model.number="table11.table11OutputValue" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="栋号">
            <el-input v-model="table11.table11BuildingNumber" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="层数">
            <el-input v-model="table11.table11Floor" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部位">
            <el-input v-model="table11.table11Part" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="形象进度完成情况" prop="table11Schedule">
            <el-input v-model="table11.table11Schedule" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table11.table11Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table11.table11Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table11')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-manage-value',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table11: {
        table11ProjectId: '',
        table11ProjectYear: '',
        table11Quarter: '',
        table11Header: '',
        table11PartialItemName: '',
        table11Unit: '',
        table11WorkQuantity: '',
        table11OutputValue: '',
        table11BuildingNumber: '',
        table11Floor: '',
        table11Part: '',
        table11Schedule: '',
        table11Remark: '',
        table11Editor: this.$store.getters.userName
      },
      rules: {
        table11ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table11ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table11Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table11PartialItemName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table11Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table11OutputValue: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table11Schedule: [{ required: true, message: '不可为空', trigger: 'change' }]
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
    addTable11 () {
      console.log(this.table11)
      this.$api.project.addTable11(this.table11)
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
          if (this.table11.table11WorkQuantity === '') {
            this.table11.table11WorkQuantity = 0
          }
          // 提交确认框
          this.$confirm('确认提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.addTable11()
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
