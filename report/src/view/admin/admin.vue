<template>
  <div style="overflow: hidden">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>用户信息</span>
      </div>
      <p>当前用户：{{username}}</p>
      <p>当前部门：{{departmentName}}</p>
      <p>当前日期：{{new Date().getFullYear()}}年{{new Date().getMonth() + 1}}月{{new Date().getDate()}}日</p>
    </el-card>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="60px" size="mini">
        <el-form-item label="工号" >
          <el-input v-model="userForm.userNum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" >
          <el-input v-model="userForm.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="pass">
          <el-input type="password" v-model="userForm.pwd" placeholder="请输入原密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="checkPass">
          <el-input type="password" v-model="userForm.userPwd" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="复密码" prop="checkPass">
          <el-input type="password" v-model="userForm.userPwd1" placeholder="请重复新密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'admin',
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userForm.userPwd !== '') {
          this.$refs.userForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.userPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      username: this.$store.getters.userName,
      departmentName: this.$store.getters.departmentName,
      userForm: {
        userNum: this.$store.getters.userNum,
        userName: this.$store.getters.userName,
        pwd: '', // 原密码
        userPwd: '', // 新密码
        userPwd1: ''
      },
      rules: {
        userPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        userPwd1: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.user.updatePwd({
            userNum: this.userForm.userNum,
            userName: this.userForm.userName,
            pwd: this.userForm.pwd, // 原密码
            userPwd: this.userForm.userPwd // 新密码
          })
            .then(rsp => {
              if (rsp.data.result === 200) {
                this.$message.success('密码修改成功！')
                this.$alert('密码修改成功！', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$router.push('/login')
                    // this.$store.dispatch('logout').then(rsp => {
                    //   console.log(rsp)
                    //   this.$router.push('/login')
                    // })
                  }
                })
              } else if (rsp.data.result === 500) {
                this.$message.error(rsp.data.resultText)
              } else {
                this.$message.error('密码修改失败……')
              }
              console.log(rsp.data)
            })
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
  .el-card {
    margin-right: 20px;
    width: 360px;
    float: left;
  }
  p {
    margin-top: 0;
  }
</style>
