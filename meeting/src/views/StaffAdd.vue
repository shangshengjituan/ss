<template>
  <div>
    <van-nav-bar title="添加成员" left-arrow @click-left="goBack"/>
    <van-form @submit="onSubmit" :show-error-message="false">
      <van-field v-model="staffName" name="staffName" label="姓名" placeholder="请输入姓名" :rules="[{ required: true, message: '请输入姓名' }]"/>
      <van-field v-model="staffNum" name="staffNum" label="工号" placeholder="请输入工号" :rules="[{ required: true, message: '请输入工号' }]"/>
      <van-field
        readonly clickable name="picker" :value="departmentName" :rules="[{ required: true, message: '请选择部门' }]"
        label="部门" placeholder="请选择部门" @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false"/>
      </van-popup>
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
import { NavBar, Form, Field, Popup, Picker, Button } from 'vant'
import BottomInfo from '../components/BottomInfo'
export default {
  name: 'StaffAdd',
  components: {
    BottomInfo,
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Button.name]: Button
  },
  data () {
    return {
      staffNum: '',
      staffName: '',
      departmentId: '',
      departmentName: '',
      showPicker: false,
      departments: [],
      columns: []
    }
  },
  created () {
    this.getDepartments()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getDepartments () {
      this.$api.getDepartments().then(rsp => {
        console.log(rsp)
        this.departments = rsp.departments
        this.columns = rsp.departments.map(item => {
          return item.departmentName
        })
      })
    },
    onConfirm (val, index) {
      console.log(val, index)
      this.departmentName = val
      this.departments.forEach(item => {
        if (val === item.departmentName) {
          this.departmentId = item.departmentId
          return false
        }
      })
      this.showPicker = false
    },
    onSubmit () {
      this.$api.addStaff({
        staffNum: this.staffNum,
        staffName: this.staffName,
        departmentId: this.departmentId
      }).then(rsp => {
        console.log(rsp)
        if (rsp.result === 200) {
          this.$toast('添加成功')
          this.$router.push('/staff')
        } else {
          this.$toast(rsp.resultText)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
