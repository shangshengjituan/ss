<template>
  <el-form :model="table18" :rules="rules" ref="table18" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="事由" prop="table18Cause">
          <el-input v-model="table18.table18Cause" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="时间">
          <el-date-picker
            v-model="table18.table18Time"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            :clearable="false" :editable="false">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="经办人">
          <el-input v-model="table18.table18Principal" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="开票情况">
          <el-input v-model="table18.table18Billing" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额" prop="table18Amount">
          <el-input v-model.number="table18.table18Amount" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table18.table18Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table18')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostRunForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table18 = newValue
      }
    },
    table18: {
      handler (newValue, oldValue) {
        newValue.table18TotalAmount = newValue.table18Quantity * newValue.table18Amount
      },
      deep: true
    }
  },
  data () {
    return {
      table18: this.formData,
      editor: this.$store.getters.userName,
      rules: {
        table18Cause: [{ required: true, message: '不可为空', trigger: 'change' }],
        table18Amount: [{ required: true, message: '请输入金额', trigger: 'change' }]
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
          this.table18.table18Editor = this.editor
          console.log(JSON.stringify(this.table18))
          this.$emit('confirm', this.table18)
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
