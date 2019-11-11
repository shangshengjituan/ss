<template>
  <el-card shadow="hover">
    <h4>项目各工种每平方米单价统计</h4>
    <el-divider></el-divider>
    <el-form :model="table23" :rules="rules" ref="table23" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table23ProjectId">
            <el-select v-model="table23.table23ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table23ProjectYear">
            <el-date-picker
              v-model="table23.table23ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table23Quarter">
            <el-select v-model="table23.table23Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="工种" prop="table23WorkType">
            <el-input v-model="table23.table23WorkType" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位">
            <el-input v-model="table23.table23Unit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="施工部位" >
            <el-input v-model="table23.table23ConstructionSite" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="建筑面积/接触面积">
            <el-input v-model="table23.table23ConstructionArea" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人工费">
            <el-input v-model.number="table23.table23LaborFee" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="每平米单价">
            <el-input v-model.number="table23.table23UnitPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table23.table23Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table23.table23Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table23')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-work-type',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table23: {
        table23ProjectId: '',
        table23ProjectYear: '',
        table23Quarter: '',
        table23WorkType: '',
        table23Unit: '',
        table23ConstructionSite: '',
        table23ConstructionArea: '',
        table23LaborFee: '',
        table23UnitPrice: '',
        table23Remark: '',
        table23Editor: this.$store.getters.userName
      },
      rules: {
        table23ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table23ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table23Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table23WorkType: [{ required: true, message: '不可为空', trigger: 'change' }]
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
    addTable23 () {
      console.log(this.table23)
      this.$api.project.addTable23(this.table23)
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
            this.addTable23()
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
