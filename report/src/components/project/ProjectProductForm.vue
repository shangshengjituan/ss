<template>
  <el-form :model="table14" :rules="rules" ref="table14" label-width="180px" label-position="right" >
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工作内容明细" prop="table14WorkContent">
          <el-input v-model="table14.table14WorkContent" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位" prop="table14Unit">
          <el-input v-model="table14.table14Unit" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际完成产值" prop="table14ActualOutputValue">
          <el-input v-model.number="table14.table14ActualOutputValue" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="实际施工日历天数" prop="table14ActualDayNumber">
          <el-input v-model="table14.table14ActualDayNumber" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际平均人数" prop="table14ActualPeopleNumber">
          <el-input v-model="table14.table14ActualPeopleNumber" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际平均出勤人数" prop="table14ActualAttendancePeople">
          <el-input v-model="table14.table14ActualAttendancePeople" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="出勤率" prop="table14AttendanceRate">
          <el-input v-model.number="table14.table14AttendanceRate" type="number" clearable><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="每人每天平均完成产值" prop="table14AverageOutputValue">
          <el-input v-model.number="table14.table14AverageOutputValue" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工期完成情况" prop="table14Duartion">
          <el-input v-model="table14.table14Duartion" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="质量完成情况" prop="table14Quality">
          <el-input v-model="table14.table14Quality" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="安全生产情况" prop="table14Safety">
          <el-input v-model="table14.table14Safety" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table14.table14Remark" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="编制人：">
          <span>{{this.editor}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('table14')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ProjectProductForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table14 = Object.assign({}, newValue)
      }
    }
  },
  data () {
    return {
      table14: Object.assign({}, this.formData),
      editor: this.$store.getters.userName,
      rules: {
        table14WorkContent: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14ActualOutputValue: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table14ActualDayNumber: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14ActualPeopleNumber: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14ActualAttendancePeople: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14AttendanceRate: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14AverageOutputValue: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table14Duartion: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14Quality: [{ required: true, message: '不可为空', trigger: 'change' }],
        table14Safety: [{ required: true, message: '不可为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.table14.table14Editor = this.editor
          console.log(JSON.stringify(this.table14))
          this.$emit('confirm', this.table14)
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
