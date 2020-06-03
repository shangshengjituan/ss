<template>
<div class="flex-container">
  <van-nav-bar title="修改部门" left-arrow @click-left="goBack"/>
  <van-form>
    <van-field v-model="staff.staffName" name="staffName" readonly label="姓名"/>
    <van-field v-model="staff.staffNum" name="staffNum" readonly label="工号"/>
    <van-field
      readonly clickable name="picker" :value="departmentName"
      label="部门" placeholder="请选择部门" @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false"/>
    </van-popup>
    <div style="margin: 36px 16px;">
      <van-button round block color="#B8802C" @click="onSubmit">提交</van-button>
    </div>
  </van-form>
  <bottom-info />
</div>
</template>

<script>
import { NavBar, Form, Field, Popup, Picker, Button } from 'vant'
import BottomInfo from '../components/BottomInfo'
export default {
  name: 'StaffModify',
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
      departments: [],
      columns: [],
      staff: {},
      showPicker: false,
      departmentId: '',
      departmentName: ''
    }
  },
  created () {
    console.log(this.$route.query)
    this.staff = this.$route.query
    this.departmentId = this.staff.departmentId
    this.departmentName = this.staff.departmentName
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
      if (this.staff.departmentId === this.departmentId) {
        this.$toast('您未更改此人部门信息')
        return
      }
      this.$api.updateStaff({ staffId: this.staff.staffId, departmentId: this.departmentId }).then(rsp => {
        console.log(rsp)
        if (rsp.result === 200) {
          this.$toast('修改成功')
          this.$router.push('/staff')
        } else {
          this.$notify({ type: 'warning', message: '未知错误，修改失败' })
        }
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
  }
</style>
