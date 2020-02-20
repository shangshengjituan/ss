<template>
  <!--<el-card shadow="hover">-->
    <div>
    <h4>项目检测实验费用统计</h4>
    <el-divider></el-divider>
    <el-form :model="table16" :rules="rules" ref="table16" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table16ProjectId">
            <el-select v-model="table16.table16ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table16ProjectYear">
            <el-date-picker
              v-model="table16.table16ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table16Quarter">
            <el-select v-model="table16.table16Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="检测名称" prop="table16DetectionName">
            <el-input v-model="table16.table16DetectionName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="送检单位名称" prop="table16TeamName">
            <el-input v-model="table16.table16TeamName" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="送检时间" prop="table16InspectionTime">
            <el-date-picker
              v-model="table16.table16InspectionTime"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :clearable="false" :editable="false">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出报告时间">
            <el-date-picker
              v-model="table16.table16ReportTime"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :clearable="false" :editable="false">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检测结果">
            <el-input v-model="table16.table16DetectionResult" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位" prop="table16Unit">
            <el-input v-model="table16.table16Unit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数量">
            <el-input v-model.number="table16.table16Quantity" type="number" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="送检组数" prop="table16GroupNumber">
            <el-input v-model="table16.table16GroupNumber" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单价" prop="table16Price">
            <el-input v-model.number="table16.table16Price" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合价" prop="table16TotalPrice">
            <el-input v-model.number="table16.table16TotalPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table16.table16Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table16.table16Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table16')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
    </div>
  <!--</el-card>-->
</template>

<script>
export default {
  name: 'cost-test',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table16: {
        table16ProjectId: '',
        table16ProjectYear: '',
        table16Quarter: '',
        table16DetectionName: '',
        table16TeamName: '',
        table16InspectionTime: '',
        table16ReportTime: '',
        table16DetectionResult: '',
        table16Unit: '',
        table16Quantity: '',
        table16GroupNumber: '',
        table16Price: '',
        table16TotalPrice: '',
        table16Remark: '',
        table16Editor: this.$store.getters.userName
      },
      rules: {
        table16ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table16ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table16Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table16DetectionName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table16TeamName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table16InspectionTime: [{ required: true, message: '请选择时间', trigger: 'change' }],
        table16Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table16GroupNumber: [{ required: true, message: '不可为空', trigger: 'change' }],
        table16Price: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table16TotalPrice: [{ required: true, message: '请输入金额', trigger: 'change' }]
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
    addTable16 () {
      console.log(this.table16)
      this.$api.project.addTable16(this.table16)
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
            this.addTable16()
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
