<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="120px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="合同" prop="contract">
          <el-cascader v-model="formData.contract" :options="contractTypes" :props="{ expandTrigger: 'hover' }"  filterable class="width-full"></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发票号" prop="invoiceNumber">
          <el-input v-model="formData.invoiceNumber" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="付款日期" prop="paymentDate">
          <el-date-picker
            v-model="formData.paymentDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="付款金额(含税)" prop="paymentAmount">
          <el-input v-model="formData.paymentAmount"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="16">
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
  name: 'InvoicePayment',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: Object.assign({}, this.baseData),
      unClick: false,
      contractTypes: [],
      rules: {
        contract: [{ required: true, message: '不可为空' }],
        invoiceNumber: [{ required: true, message: '不可为空' }],
        paymentDate: [{ required: true, message: '不可为空' }],
        paymentAmount: [{ required: true, message: '不可为空' }]
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
      handler (val) {
        if (val.contract) {
          val.contractId = val.contract[1]
        }
      },
      deep: true
    }
  },
  created () {
    this.getBase()
  },
  methods: {
    getBase () {
      this.$api.invoice.getContractIds().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.supplierName,
            value: item.supplierId,
            children: []
          })
          if (item.contractAmountList) {
            item.contractAmountList.forEach(it => {
              temp[index].children.push({
                label: it.contractAmount || item.supplierName,
                value: it.contractId
              })
            })
          }
        })
        this.contractTypes = temp
      })
    },
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
      this.$api.invoice.addPayment(this.formData).then(rsp => {
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
