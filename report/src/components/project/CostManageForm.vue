<template>
  <el-form :model="table15" :rules="rules" ref="table15" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="购买用品名称" prop="table15SuppliesName">
          <el-input v-model="table15.table15SuppliesName" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="用途" prop="table15Use">
          <el-input v-model="table15.table15Use" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="固定资产编号" >
          <el-input v-model="table15.table15Numbering" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="时间" prop="table15Time">
          <el-date-picker
            v-model="table15.table15Time"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            :clearable="false" :editable="false">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="经办人" prop="table15Manager">
          <el-input v-model="table15.table15Manager" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="开票情况">
          <el-input v-model="table15.table15Billing" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单位" prop="table15Unit">
          <el-input v-model="table15.table15Unit" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数量" prop="table15Quantity">
          <el-input v-model.number="table15.table15Quantity" type="number" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单价" prop="table15Amount">
          <el-input v-model.number="table15.table15Amount" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="总额">
          <el-input v-model="table15.table15TotalAmount" :readonly="true"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table15.table15Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table15')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostManageForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table15 = Object.assign({}, newValue)
      }
    },
    table15: {
      handler (newValue, oldValue) {
        newValue.table15TotalAmount = Math.round((newValue.table15Quantity * newValue.table15Amount).toFixed(2) * 100) / 100
      },
      deep: true
    }
  },
  data () {
    return {
      table15: Object.assign({}, this.formData),
      editor: this.$store.getters.userName,
      rules: {
        table15SuppliesName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table15Use: [{ required: true, message: '不可为空', trigger: 'change' }],
        table15Time: [{ required: true, message: '请选择时间', trigger: 'change' }],
        table15Manager: [{ required: true, message: '不可为空', trigger: 'change' }],
        table15Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table15Quantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table15Amount: [{ required: true, message: '请输入金额', trigger: 'change' }]
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
          this.table15.table15Editor = this.editor
          console.log(JSON.stringify(this.table15))
          this.$emit('confirm', this.table15)
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
