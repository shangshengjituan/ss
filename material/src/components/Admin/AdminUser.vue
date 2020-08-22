<template>
<div>
  <el-form ref="form" class="form-container" :model="formData" :rules="rules" label-width="100px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="formData.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formData.password"></el-input>
    </el-form-item>
    <el-form-item label="权限设置" prop="auth">
      <el-transfer v-model="formData.auth" :data="data" :titles="['全部权限', '已选权限']"></el-transfer>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleCancel('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')" :disabled="unClick">确定</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import baseData from '../../util/baseData'
export default {
  name: 'AdminUser',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      data: baseData.auth,
      value: [],
      formData: {},
      unClick: false,
      rules: {
        username: [{ required: true, message: '不可为空' }],
        password: [{ required: true, message: '不可为空' }],
        auth: [{ required: true, message: '不可为空' }]
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
.form-container {
  width: 682px;
}
</style>
