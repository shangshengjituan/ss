<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="日期" prop="profitDate">
          <el-date-picker
            v-model="formData.profitDate" value-format="yyyy-MM" class="width-full"
            type="month" placeholder="选择月份" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="项目">
          <el-select v-model="formData.projectName" class="width-full">
            <el-option label="商品销售收入" value="商品销售收入"></el-option>
            <el-option label="商品销售成本" value="商品销售成本"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="类别">
          <el-input v-model="formData.productName" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额">
          <el-input v-model="formData.profitAmount"><template slot="append">元</template></el-input>
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
  name: 'CostSaleProfit',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: Object.assign({}, this.baseData),
      unClick: false,
      rules: {
        profitDate: [{ required: true, message: '不可为空' }],
        projectName: [{ required: true, message: '不可为空' }],
        productName: [{ required: true, message: '不可为空' }],
        profitAmount: [{ required: true, message: '不可为空' }]
      }
    }
  },
  watch: {
    baseData: {
      handler (val, old) {
        this.formData = Object.assign({}, val)
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
      this.$api.cost.addSaleProfit(this.formData).then(rsp => {
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
