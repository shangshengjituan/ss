<template>
  <el-card shadow="hover">
    <h4>项目使用点工统计表</h4>
    <el-divider></el-divider>
    <el-form :model="table5" :rules="rules" ref="table5" label-width="110px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table5ProjectId">
            <el-select v-model="table5.table5ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table5ProjectYear">
            <el-date-picker
              v-model="table5.table5ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table5Quarter">
            <el-select v-model="table5.table5Quarter" placeholder="请选择季度" value="">
              <el-option
                v-for="item in options"
                :label="item.label" :key="item.value" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="工作内容" prop="table5WorkContent">
            <el-input v-model="table5.table5WorkContent" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="发生点工原因" prop="table5Reason">
            <el-input v-model="table5.table5Reason" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="8">
          <el-form-item label="起始时间" prop="table5StartTime">
            <el-date-picker
              v-model="table5.table5StartTime" :clearable="false" :editable="false"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              placeholder="请选择起始日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="终止时间" prop="table5EndTime">
            <el-date-picker
              @focus="handleEndTime"
              v-model="table5.table5EndTime" :clearable="false" :editable="false"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="请选择终止日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="栋号及部位" prop="table5Position">
            <el-input v-model="table5.table5Position" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工种" prop="table5WorkTypeId">
            <el-select v-model="table5.table5WorkTypeId" placeholder="请选择工作内容明细" value="">
              <el-option
                v-for="item in workList"
                :key="item.id" :label="item.bricklayer" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="班组" prop="table5Team">
            <el-input v-model="table5.table5Team" placeholder="请输入班组" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="平均人数" prop="table5AveragePeople">
            <el-input v-model.number="table5.table5AveragePeople" type='number' clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单价" prop="table5UnitPrice">
            <el-input v-model.number="table5.table5UnitPrice" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合价" prop="table5TotalPrice">
            <span>{{totalPrice}} 元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table5.table5Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <span>{{table5.table5Editor}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table5')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'spot-work',
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table5: {
        table5ProjectId: '',
        table5ProjectYear: '',
        table5Quarter: '',
        table5WorkContent: '',
        table5Reason: '',
        table5StartTime: '',
        table5EndTime: '',
        table5Position: '',
        table5WorkTypeId: '',
        table5Team: '',
        table5AveragePeople: '',
        table5UnitPrice: '',
        table5TotalPrice: '', // 计算
        table5Remark: '',
        table5Editor: this.$store.getters.userName
      },
      rules: {
        table5ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table5ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table5Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table5WorkContent: [{ required: true, message: '不可为空', trigger: 'change' }],
        table5Reason: [{ required: true, message: '不可为空', trigger: 'change' }],
        table5StartTime: [{ required: true, message: '请选择日期', trigger: 'change' }],
        table5EndTime: [{ required: true, message: '请选择日期', trigger: 'change' }],
        table5Position: [{ required: true, message: '不可为空', trigger: 'change' }],
        table5WorkTypeId: [{ required: true, message: '请选择明细', trigger: 'change' }],
        table5Team: [{ required: true, message: '不可为空', trigger: 'change' }],
        table5AveragePeople: [{ required: true, message: '不可为空', trigger: 'change' }],
        table5UnitPrice: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: [],
      workList: [],
      pickerOptions: {}
    }
  },
  created () {
    this.getProject()
    this.getWork()
  },
  computed: {
    totalPrice () {
      return this.table5.table5AveragePeople * this.table5.table5UnitPrice
    }
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
    getWork () {
      this.$api.project.getWorkList()
        .then(rsp => {
          this.workList = rsp.data.list
          console.log(this.workList)
        })
    },
    addtable5 () {
      this.table5.table5TotalPrice = this.totalPrice
      console.log(this.table5)
      this.$api.project.addTable5(this.table5)
        .then(rsp => {
          if (rsp.data.result === 200) {
            this.$message.success('新增表单成功！')
          } else if (rsp.data.result === 500) {
            this.$message.error(rsp.data.resultText)
          } else {
            this.$message.error('新增项目失败……')
          }
          console.log(rsp.data)
        })
    },
    handleEndTime () {
      let demo = new Date(this.table5.table5StartTime).getTime()
      this.pickerOptions = {
        disabledDate (time) {
          return time.getTime() < demo
        }
      }
    },
    disabledDate (time) {
      return time.getTime() > new Date(this.table5.table5StartTime).getTime()
    },
    validateData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交确认框
          this.$confirm('提交后将无法修改或删除，确认提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.addtable5()
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
