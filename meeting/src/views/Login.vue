<template>
  <div class="flex-container">
    <div class="putImage">
      <van-image width="100" :src="require('../assets/logo.png')" />
    </div>
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
      <div style="margin: 36px 16px;">
        <van-button round block color="#B8802C" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <bottom-info class="info" />
  </div>
</template>

<script>
import { Image, Form, Field, Button } from 'vant'
import BottomInfo from '../components/BottomInfo'
export default {
  name: 'Login',
  components: {
    BottomInfo,
    [Image.name]: Image,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      userNum: '',
      userPwd: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log(values)
      this.$store.dispatch('login', values).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
  .flex-container {
    height: 100vh;
    display: flex;
    flex-flow: column;
    /*align-items: center;*/
  }
  .putImage {
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  .van-form {
    flex: 1;
  }
  .info {
    flex: 1;
    text-align: center;
  }
</style>
