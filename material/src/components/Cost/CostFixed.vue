<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="日期" prop="fixAssetDate">
          <el-date-picker
            v-model="formData.fixAssetDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="收款单位" prop="beneficiary">
          <el-input v-model="formData.beneficiary" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="formData.equipmentName" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="合同金额">
          <el-input v-model="formData.contractAmount"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="上期付款">
          <el-input v-model="formData.lastPayment"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="本期付款">
          <el-input v-model="formData.currentPayment"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="累计付款">
          <el-input v-model="formData.cumulativePayment"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="发票号">
          <el-input v-model="formData.receiptNumber" />
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">发票金额</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.amountReceipt"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="税率">
          <el-input v-model="formData.taxRate"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="税金">
          <el-input v-model="formData.taxReceipt"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="备注">
          <el-input v-model="formData.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')" :disabled="unClick">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostFixed',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: Object.assign({}, this.baseData),
      unClick: false,
      rules: {
        fixAssetDate: [{ required: true, message: '不可为空' }],
        beneficiary: [{ required: true, message: '不可为空' }],
        equipmentName: [{ required: true, message: '不可为空' }],
        detectPayment: [{ required: true, message: '不可为空' }]
      }
    }
  },
  watch: {
    baseData: {
      handler (val, old) {
        this.formData = Object.assign({}, val)
      },
      deep: true
    },
    formData: {
      handler (val, old) {
        if (val.currentPayment && val.lastPayment) {
          this.formData.cumulativePayment = this.$utils.add(val.currentPayment, val.lastPayment)
          this.formData.amountReceipt = this.$utils.divide(this.formData.currentPayment, this.$utils.add(1, this.$utils.divide(val.taxRate, 100))).toFixed(2)
        }
        this.formData.taxReceipt = this.$utils.multiply(this.formData.amountReceipt, this.$utils.divide(val.taxRate, 100)).toFixed(2)
      },
      deep: true
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isEdit ? this.editItem() : this.addItem()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel (formName) {
      this.$refs[formName].resetFields()
      this.$emit('cancel')
    },
    addItem () {
      console.log('add')
      this.unClick = true
      this.$api.cost.addFixedItem(this.formData).then(rsp => {
        console.log(rsp)
        this.unClick = false
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '新增成功!', duration: 1000 })
          this.$emit('primary')
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      }).catch(err => {
        this.unClick = false
        this.$message({ type: 'error', message: err })
      })
    },
    editItem () {
      this.$emit('primary')
    }
  }
}
</script>

<style scoped>

</style>
