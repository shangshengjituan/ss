<template>
<div>
  <van-nav-bar title="新增会议" left-arrow @click-left="goBack"/>
  <van-form @submit="onSubmit" :show-error-message="false">
    <van-field v-model="confName" name="confName" label="议题" placeholder="请输入议题" :rules="[{ required: true, message: '请输入议题' }]"/>
    <van-field
      v-model="confTime" :value="confTime" name="confTime" readonly clickable label="时间" placeholder="请选择时间"
      @click="showPicker = true" :rules="[{ required: true, trigger:'onChange', message: '请选择时间' }]"/>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker type="datetime" :min-date="currentDate" :formatter="formatter" @confirm="onConfirm" @cancel="showPicker = false"/>
    </van-popup>
    <van-field v-model="confHost" name="confHost" label="主持人" placeholder="请输入主持人"/>
    <van-field v-model="confSite" name="confSite" label="地点" placeholder="请输入地点"/>
    <van-field
      v-model="confPerson" name="confPerson" label="应到人员" placeholder="请输入应到人员"
      :rules="[{ required: true }]"/>
    <div style="margin: 16px;">
      <van-button round block type="info" color="#B8802C" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <choose-staff />
</div>
</template>

<script>
import { NavBar, Form, Field, Popup, DatetimePicker, Button } from 'vant'
import ChooseStaff from '../components/ChooseStaff'
export default {
  name: 'AddMeeting',
  components: {
    ChooseStaff,
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Button.name]: Button
  },
  data () {
    return {
      confName: '',
      confTime: '',
      confHost: '',
      confSite: '',
      confPerson: '',
      showPicker: false,
      currentDate: new Date()
    }
  },
  created () {
    this.getDepStaff()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getDepStaff () {
      this.$api.getDepStaff().then(rsp => {
        console.log(rsp)
      })
    },
    formatter (type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      } else if (type === 'hour') {
        return `${val}时`
      } else if (type === 'minute') {
        return `${val}分`
      }
      return val
    },
    onConfirm (time) {
      console.log(time)
      const year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      let hour = time.getHours()
      let minute = time.getMinutes()
      if (month >= 1 && month <= 9) { month = `0${month}` }
      if (day >= 1 && day <= 9) { day = `0${day}` }
      if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
      if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
      this.confTime = `${year}-${month}-${day} ${hour}:${day}`
      this.showPicker = false
    },
    onSubmit (values) {
      console.log(values)
    }
  }
}
</script>

<style scoped>

</style>
