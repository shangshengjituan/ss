<template>
  <el-form :model="table4" :rules="rules" ref="table4" label-width="180px" label-position="right" >
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工作内容明细：" prop="table4WorkTypeId">
          <span>{{table4.jobDetail}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位" prop="table4Unit">
          <el-select
            filterable allow-create default-first-option
            v-model="table4.table4Unit" placeholder="请选择单位" value="">
            <el-option value="m^2">m<sup>2</sup></el-option>
            <el-option value="m^3">m<sup>3</sup></el-option>
            <el-option value="个">个</el-option>
            <el-option value="t">t</el-option>
            <el-option value="根">根</el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="实际完成产值" prop="table4ActualValue">
          <el-input v-model.number="table4.table4ActualValue" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际施工日历天数" prop="table4ActualDay">
          <el-input v-model="table4.table4ActualDay" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际平均人数" prop="table4ActualAveragePeople">
          <el-input v-model="table4.table4ActualAveragePeople" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="实际平均出勤人数" prop="table4ActualAverageAttendance">
          <el-input v-model="table4.table4ActualAverageAttendance" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="出勤率" prop="table4AttendanceRate">
          <el-input v-model.number="table4.table4AttendanceRate" type="number" clearable><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="每人每天平均完成产值" prop="table4OutputValuePerPersonPerDay">
          <el-input v-model.number="table4.table4OutputValuePerPersonPerDay" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工期完成情况" prop="table4ProjectCompletion">
          <el-input v-model="table4.table4ProjectCompletion" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="质量完成情况" prop="table4QualityCompletion">
          <el-input v-model="table4.table4QualityCompletion" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="安全生产情况" prop="table4SafetyProductionSituation">
          <el-input v-model="table4.table4SafetyProductionSituation" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table4.table4Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table4')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostLaborDetailForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table4 = newValue
      }
    }
  },
  data () {
    return {
      table4: this.formData,
      editor: this.$store.getters.userName,
      rules: {
        table4ActualValue: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table4ActualDay: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4ActualAveragePeople: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4ActualAverageAttendance: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4AttendanceRate: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4OutputValuePerPersonPerDay: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table4ProjectCompletion: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4QualityCompletion: [{ required: true, message: '不可为空', trigger: 'change' }],
        table4SafetyProductionSituation: [{ required: true, message: '不可为空', trigger: 'change' }]
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
          // 将验证后的table4数据增减字段为buildingData后提交
          this.table4.table4Editor = this.editor
          console.log(JSON.stringify(this.formData))
          console.log(JSON.stringify(this.table4))
          this.$emit('confirm', this.table4)
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
