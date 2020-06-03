<template>
  <div class="flex-container">
    <van-nav-bar title="主界面">
      <template #left>
        <van-image width="80" :src="require('../assets/logo_row.png')" />
      </template>
    </van-nav-bar>
    <van-grid :column-num="3" icon-size="28" clickable>
      <van-grid-item icon="add-o" text="新增会议" to="/meetingadd" />
      <van-grid-item icon="notes-o" text="进行中会议" to="/list" />
      <van-grid-item icon="orders-o" text="已完成会议" to="/list" />
      <van-grid-item icon="friends-o" text="公司人员管理" to="/staff" />
      <van-grid-item icon="manager-o" text="系统用户管理" to="/users" />
      <van-grid-item icon="edit" text="修改密码" to="/updatepwd" />
      <van-grid-item icon="replay" text="退出账号" @click="handleLogout" />
    </van-grid>
    <bottom-info class="info"></bottom-info>
  </div>
</template>

<script>

import { NavBar, Image, Grid, GridItem, Dialog } from 'vant'
import BottomInfo from '../components/BottomInfo'

export default {
  name: 'Home',
  components: {
    BottomInfo,
    [NavBar.name]: NavBar,
    [Image.name]: Image,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Dialog.name]: Dialog
  },
  // data () {
  //   return {
  //   }
  // },
  methods: {
    handleLogout () {
      console.log('click logout')
      this.$dialog.confirm({
        title: '标题',
        message: '您确认退出系统吗'
      }).then(() => {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/login')
        })
      }).catch(() => {
        return false
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
  .van-grid {
    flex: 1;
  }
  .info {
    flex: 1;
    text-align: center;
  }
</style>
