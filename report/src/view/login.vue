<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      :rules="rules"
      status-icon
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page">
      <h3 class="title">尚昇成本报表系统登录</h3>
      <el-form-item prop="userNum">
        <el-input
          type="text"
          v-model="loginForm.userNum"
          auto-complete="off"
          placeholder="工号"
          @keyup.enter.native="handleSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          type="password"
          v-model="loginForm.userPwd"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item style="width:100%; margin-bottom: 0">
        <el-button
          type="primary"
          style="width:100%;"
          @click="handleSubmit"
          :loading="logining">登录</el-button>
      </el-form-item>
      <div style="text-align: right">
        <el-button type="text" @click="openMsg">联系管理员</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      logining: false,
      loginForm: {
        userNum: '',
        userPwd: ''
      },
      rules: {
        // amount: [{required: true, validator: this.$tool.validatorNumber, trigger: 'change'}],
        userNum: [{required: true, message: '请输入工号', trigger: 'blur'}],
        userPwd: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      checked: false
    }
  },
  methods: {
    handleSubmit (event) {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.logining = true
          let userInfo = {
            userNum: this.loginForm.userNum,
            userPwd: this.loginForm.userPwd
          }
          // 登录
          this.$store.dispatch('login', userInfo).then(rsp => {
            console.log(rsp)
            if (rsp.result === '200') {
              console.log(rsp.user)
              if (rsp.user.plateId !== '0') {
                this.$router.push({path: '/admin'})
              } else {
                this.$router.push({path: '/administrator'})
              }
              this.logining = false
            } else {
              this.$alert(rsp.resultText, '提示：', {
                confirmButtonText: '确定',
                callback: () => {
                  this.loginForm.userNum = ''
                  this.loginForm.userPwd = ''
                  this.logining = false
                }
              })
            }
          }).catch(err => {
            console.log(err)
            console.log('....')
            this.logining = true
          })
        } else {
          return false
        }
      })
    },
    openMsg () {
      this.$alert('智能服务中心 王寒', '请联系', {
        confirmButtonText: '确定'
      })
    }
  }
}
</script>

<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
    /*background: #2d3a4b;*/
    background: #F2F2F2;
    padding-top: 180px;
  }
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 0 auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
