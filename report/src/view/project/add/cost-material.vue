<template>
  <el-card shadow="hover">
    <h4>项目调入调出材料费用统计</h4>
    <el-divider></el-divider>
    <el-form :model="table7" :rules="rules" ref="table7" label-width="180px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table7ProjectId">
            <el-select v-model="table7.table7ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table7ProjectYear">
            <el-date-picker
              v-model="table7.table7ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table7Quarter">
            <el-select v-model="table7.table7Quarter" placeholder="请选择季度" value="">
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
          <el-form-item label="类型" prop="table7Type">
            <el-select v-model="table7.table7Type" placeholder="请选择调入/调出" value="">
              <el-option label="调入" key="1" value="调入"/>
              <el-option label="调出" key="2" value="调出"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="调入/调出材料名称" prop="table7MaterialName">
            <el-input v-model="table7.table7MaterialName" placeholder="请输入材料名称" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="调出单位" prop="table7RecallUnit">
            <el-input v-model="table7.table7RecallUnit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="调入单位" prop="table7TransferUnit">
            <el-input v-model="table7.table7TransferUnit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位" prop="table7Unit">
            <el-select v-model="table7.table7Unit" filterable allow-create default-first-option placeholder="请选择/输入工程量单位" value="">
              <el-option label="吨" key="1" value="吨" />
              <el-option label="立方" key="2" value="立方" />
              <el-option label="根" key="3" value="根" />
              <el-option label="张" key="4" value="张" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工程量" prop="table7WorkQuantity">
            <el-input v-model.number="table7.table7WorkQuantity" type="number" placeholder="请输入工程量" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="type" prop="table7Price">
            <el-input v-model.number="table7.table7Price" type="number" placeholder="请输入单价" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="调入单位合价">
            <el-input v-model="totalPrice" :readonly="true" ><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table7.table7Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table7.table7Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table7')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-material',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table7: {
        table7ProjectId: '',
        table7ProjectYear: '',
        table7Quarter: '',
        table7MaterialName: '',
        table7RecallUnit: '',
        table7TransferUnit: '',
        table7Unit: '',
        table7WorkQuantity: '',
        table7Type: '',
        table7Price: '',
        table7TotalPrice: '', // 计算
        table7Remark: '',
        table7Editor: this.$store.getters.userName
      },
      rules: {
        table7ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table7ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table7Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table7MaterialName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table7RecallUnit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table7TransferUnit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table7Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table7WorkQuantity: [{ required: true, message: '请输入工程量', trigger: 'change' }],
        table7Type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        table7Price: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: []
    }
  },
  created () {
    this.getProject()
  },
  computed: {
    totalPrice () {
      return parseFloat((this.table7.table7WorkQuantity * this.table7.table7Price).toFixed(2))
    },
    type () {
      let demo = this.table7.table7Type
      if (demo === '调入') {
        return '调入单位材料折合单价'
      } else if (demo === '调出') {
        return '调出单位材料购买单价'
      } else {
        return '单价'
      }
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
    addTable7 () {
      this.table7.table7TotalPrice = this.totalPrice
      console.log(this.table7)
      this.$api.project.addTable7(this.table7)
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
            this.addTable7()
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
