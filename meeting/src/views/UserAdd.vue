<template>
  <div class="flex-container">
    <van-nav-bar title="添加用户" left-arrow @click-left="goBack"/>
    <van-form @submit="onSubmit" :show-error-message="false">
      <van-field
        v-model="userNum" name="userNum" clearable
        label="工号" placeholder="请输入工号"
        :rules="[{ required: true, message: '请输入工号' }]"
      />
      <van-field
        v-model="userPwd" type="password" name="userPwd" clearable
        label="密码" placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div class="small-title">注：姓名将自动从员工表中获取，密码默认为12345。</div>
      <div style="margin: 16px;">
        <van-button round block type="info" color="#B8802C" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <bottom-info />
  </div>
</template>

<script>
import { NavBar, Form, Field, Button } from 'vant'
import BottomInfo from '../components/BottomInfo'
export default {
  name: 'StaffAdd',
  components: {
    BottomInfo,
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      userNum: '',
      userPwd: '12345'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    onSubmit () {
      this.$api.addUser({
        userNum: this.userNum,
        userPwd: this.userPwd
      }).then(rsp => {
        console.log(rsp)
        if (rsp.result === 200) {
          this.$toast('添加成功')
          this.$router.push('/users')
        } else {
          this.$toast(rsp.resultText)
        }
      })
    }
  }
}
</script>

<style scoped>
  .flex-container {
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
  }
  .van-form {
    flex: 1;
  }
  .small-title {
    padding: 5px 15px 0;
    color: #646566;
    font-size: 12px;
  }
</style>
