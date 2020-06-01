<template>
<div class="flex-container">
  <van-nav-bar title="修改密码" left-arrow @click-left="goBack"/>
  <van-form @submit="onSubmit" :show-error-message="false" >
    <van-field
      required v-model="userPwd" type="password" name="userPwd"
      label="新密码" placeholder="请输入新密码" :rules="[{ required: true, message: '请输入新密码' }]"/>
    <van-field
      required v-model="userPwd1" type="password" name="userPwd1"
      label="确认密码" placeholder="请再次输入新密码" :rules="[{ required: true, message: '请再次输入新密码' }]"/>
    <div style="margin: 36px 16px;">
      <van-button round block type="info" color="#B8802C" native-type="submit">
        确认修改
      </van-button>
    </div>
  </van-form>
  <bottom-info class="info" />
</div>
</template>

<script>
import { NavBar, Form, Field, Popup, DatetimePicker, Button } from 'vant'
import BottomInfo from '../components/BottomInfo'
export default {
  name: 'UpdatePwd',
  components: {
    BottomInfo,
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Button.name]: Button
  },
  data () {
    return {
      userPwd: '',
      userPwd1: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    onSubmit (values) {
      console.log(values)
      if (this.userPwd === this.userPwd1) {
        this.$api.updatePwd({
          userPwd: this.userPwd
        }).then(rsp => {
          this.$notify({ type: 'success', message: '修改密码成功，请重新登录' })
          this.$router.push('/login')
        })
      } else {
        this.$toast('密码不一致！')
        return false
      }
    }
  }
}
</script>

<style scoped>
  .flex-container {
    height: 100vh;
    display: flex;
    flex-flow: column;
  }
  .van-form {
    flex: 1;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    text-align: center;
  }
</style>
