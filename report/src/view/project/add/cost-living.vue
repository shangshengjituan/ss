<template>
  <el-card shadow="hover">
    <h4>水电费所用情况统计</h4>
    <el-divider></el-divider>
    <el-form :model="table8" :rules="rules" ref="table8" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table8ProjectId">
            <el-select v-model="table8.table8ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table8ProjectYear">
            <el-date-picker
              v-model="table8.table8ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table8Quarter">
            <el-select v-model="table8.table8Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="用户单位名称" prop="table8UserUnitName">
            <el-input v-model="table8.table8UserUnitName" placeholder="请输入材料名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型" prop="table8Type">
            <el-select v-model="table8.table8Type" placeholder="请选择水费/电费" value="">
              <el-option label="水费" key="1" value="水费"/>
              <el-option label="电费" key="2" value="电费"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位">
            <el-input v-model="table8.table8Unit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用量">
            <el-input v-model.number="table8.table8Dosage" type="number" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户工作类别">
            <el-input v-model="table8.table8UserWorkCategory" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="水/电费单价">
            <el-input v-model.number="table8.table8Price" type="number" clearable ><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="水/电费合价" prop="table8TotalPrice">
            <el-input v-model.number="table8.table8TotalPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table8.table8Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table8.table8Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table8')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-living',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table8: {
        table8ProjectId: '',
        table8ProjectYear: '',
        table8Quarter: '',
        table8UserUnitName: '',
        table8Unit: '',
        table8Dosage: '',
        table8UserWorkCategory: '',
        table8Type: '',
        table8Price: '',
        table8TotalPrice: '',
        table8Remark: '',
        table8Editor: this.$store.getters.userName
      },
      rules: {
        table8ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table8ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table8Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table8Type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        table8UserUnitName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table8TotalPrice: [{ required: true, message: '请输入金额', trigger: 'change' }]
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
    addTable8 () {
      console.log(this.table8)
      this.$api.project.addTable8(this.table8)
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
            this.addTable8()
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
