<template>
<div>
  <van-nav-bar title="修改部门" left-arrow @click-left="goBack"/>
  <van-form @submit="onSubmit" :show-error-message="false">
    <!--<van-field-->
      <!--v-model="userNum" name="userNum" clearable-->
      <!--label="工号" placeholder="请输入工号"-->
      <!--:rules="[{ required: true, message: '请输入工号' }]"-->
    <!--/>-->
    <!--<van-field-->
      <!--v-model="userPwd" type="password" name="userPwd" clearable-->
      <!--label="密码" placeholder="请输入密码"-->
      <!--:rules="[{ required: true, message: '请输入密码' }]"-->
    <!--/>-->
    <div style="margin: 36px 16px;">
      <van-button round block color="#B8802C" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <bottom-info />
</div>
</template>

<script>
import { NavBar, Card, Form, Field, Button } from 'vant'
import BottomInfo from '../components/BottomInfo'
export default {
  name: 'StaffModify',
  components: {
    BottomInfo,
    [NavBar.name]: NavBar,
    [Card.name]: Card,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      departments: []
    }
  },
  created () {
    console.log(this.$route.query)
    // staffId: 1
    // staffNum: "00001"
    // staffName: "易敏"
    // departmentId: 99
    // departmentName: "集团公司董事长"
    this.getDepartments()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getDepartments () {
      this.$api.getDepartments().then(rsp => {
        console.log(rsp)
      })
    },
    onSubmit (values) {
      console.log(values)
    }
  }
}
</script>

<style scoped>

</style>
