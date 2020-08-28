<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
    <el-form-item label="用途分类">
      <el-select v-model="formData.materialUseSort" placeholder="请选择">
        <el-option label="陶粒板生产" value="陶粒板生产"></el-option>
        <el-option label="固定资产" value="固定资产"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="用途详细">
      <el-input v-model="formData.materialUseDetail"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleCancel('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')" :disabled="unClick">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'MaterialUse',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {
        materialUseSort: '',
        materialUseDetail: ''
      },
      rules: {
        materialUseSort: [{ required: true, message: '不可为空' }],
        auxiliaryMaterialName: [{ required: true, message: '不可为空' }]
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
            materialUseId: val.id,
            materialUseSort: val.label || '',
            materialUseDetail: val.value || ''
          }
        } else {
          this.formData = {
            materialUseSort: val.label || '',
            materialUseDetail: val.value || ''
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
      materialUseId: this.baseData.id,
      materialUseSort: this.baseData.label,
      materialUseDetail: this.baseData.value
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
      this.$api.material.addMaterialUse(this.formData).then(rsp => {
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
      this.$api.material.updateMaterialUse(this.formData).then(rsp => {
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
