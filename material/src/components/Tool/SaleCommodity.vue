<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
    <el-form-item label="客户/承运商">
      <el-input v-model="formData.clientName"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleCancel('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')" :disabled="unClick">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SaleCommodity',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {
        clientName: ''
      },
      rules: {
        clientName: [{ required: true, message: '不可为空' }]
      },
      unClick: false,
      usages: []
    }
  },
  watch: {
    baseData: {
      handler (val, old) {
        if (this.isEdit) {
          this.formData = {
            clientId: val.id,
            clientName: val.value || ''
          }
        } else {
          this.formData = {
            clientName: val.value || ''
          }
        }
        this.unClick = false
      },
      deep: true
    }
  },
  created () {
    if (!Object.keys(this.baseData).length) return
    this.formData = {
      clientId: this.baseData.id,
      clientName: this.baseData.value
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
      this.$api.sale.addClient(this.formData).then(rsp => {
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
      this.unClick = true
      this.$api.sale.updateClient(this.formData).then(rsp => {
        console.log(rsp)
        this.unClick = false
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '修改成功!', duration: 1000 })
          this.$emit('primary')
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      }).catch(err => {
        this.unClick = false
        this.$message({ type: 'error', message: err })
      })
    }
  }
}
</script>

<style scoped>

</style>
