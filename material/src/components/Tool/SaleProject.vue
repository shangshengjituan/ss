<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="150px">
    <el-form-item label="生产/销售项目">
      <el-input v-model="formData.projectName"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleCancel('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')" :disabled="unClick">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SaleProject',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {
        projectName: ''
      },
      rules: {
        projectName: [{ required: true, message: '不可为空' }]
      },
      unClick: false
    }
  },
  watch: {
    baseData: {
      handler (val, old) {
        if (this.isEdit) {
          this.formData = {
            projectId: val.id,
            projectName: val.value || ''
          }
        } else {
          this.formData = {
            projectName: val.value || ''
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
      projectId: this.baseData.id,
      projectName: this.baseData.value
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
      this.$api.sale.addProject(this.formData).then(rsp => {
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
      this.$api.sale.updateProject(this.formData).then(rsp => {
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
