<template>
  <el-form :model="user" ref="user" label-width="110px" label-position="right">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="工号">
          <el-input v-model="user.userNum" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="姓名">
          <el-input v-model="user.userName" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="所在部门">
          <el-select v-model="user.userDepartment" placeholder="请选择">
            <el-option
              v-for="item in departments"
              :key="item.departmentId"
              :label="item.departmentName"
              :value="item.departmentId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="权限">
          <el-cascader placeholder="请选择"
            v-model="userAuth"
            :options="authority"></el-cascader>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('user')">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AddUser',
  props: {
    departments: {
      type: Array
    },
    authority: {
      type: Array
    }
  },
  data () {
    return {
      user: {
        userNum: '',
        userName: '',
        userDepartment: '',
        departmentId: '',
        plateId: ''
      },
      userAuth: []
    }
  },
  watch: {
    userAuth: {
      handler (newVal, oldVal) {
        this.user.plateId = newVal[0]
        this.user.departmentId = newVal[1]
      }
    }
  },
  methods: {
    // 取消注册
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定注册
    handleConfirm (formName) {
      if (!this.user.userNum || !this.user.userName || !this.user.userDepartment || !this.user.departmentId) {
        this.$message.error('字段不可为空！')
        return false
      }
      console.log(JSON.stringify(this.user))
      this.$emit('confirm', this.user)
    }
  }
}
</script>

<style scoped>

</style>
