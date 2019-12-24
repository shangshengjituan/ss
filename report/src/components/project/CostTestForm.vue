<template>
  <el-form :model="table16" :rules="rules" ref="table16" label-width="180px" label-position="right">
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
        <el-form-item label="出报告时间" prop="table16ReportTime">
          <el-date-picker
            v-model="table16.table16ReportTime"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            :clearable="false" :editable="false">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="检测结果" prop="table16DetectionResult">
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
        <el-form-item label="数量" prop="table16Quantity">
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
        <el-form-item label="编制人：">
          <span>{{this.editor}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('table16')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostTestForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table16 = Object.assign({}, newValue)
      }
    }
  },
  data () {
    return {
      table16: Object.assign({}, this.formData),
      editor: this.$store.getters.userName,
      rules: {
        table16DetectionName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table16TeamName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table16InspectionTime: [{ required: true, message: '请选择时间', trigger: 'change' }],
        table16ReportTime: [{ required: true, message: '请选择时间', trigger: 'change' }],
        table16DetectionResult: [{ required: true, message: '不可为空', trigger: 'change' }],
        table16Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table16Quantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table16GroupNumber: [{ required: true, message: '不可为空', trigger: 'change' }],
        table16Price: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table16TotalPrice: [{ required: true, message: '请输入金额', trigger: 'change' }]
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
          this.table16.table16Editor = this.editor
          console.log(JSON.stringify(this.table16))
          this.$emit('confirm', this.table16)
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
