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
  </div>
</template>

<script>
import { NavBar, Form, Field, Popup, DatetimePicker, Button } from 'vant'
export default {
  name: 'StaffAdd',
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Button.name]: Button
  }
}
</script>

<style scoped>

</style>
