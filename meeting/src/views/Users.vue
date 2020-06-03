<template>
  <div>
    <van-nav-bar title="用户列表" fixed left-arrow @click-left="goBack">
      <template #right>
        <van-icon name="add-o" size="18" @click="$router.push('/useradd')"/>
      </template>
    </van-nav-bar>
    <div class="small-title">
      <span>系统用户共{{users.length}}人</span>
    </div>
    <van-cell-group>
      <van-swipe-cell v-for="item in users" :key="item.userId">
        <van-cell :title="item.userName" :value="`工号：${item.userNum}`" />
        <template #right>
          <van-button square plain type="danger" text="重置密码" @click="handleReset(item.userId)" />
          <van-button square type="danger" text="删除" @click="handleDelete(item.userId)" />
        </template>
      </van-swipe-cell>
    </van-cell-group>
    <van-empty description="暂无数据" v-show="showEmpty" />
  </div>
</template>

<script>
import { NavBar, Icon, Card, CellGroup, Cell, SwipeCell, Button, Empty } from 'vant'
export default {
  name: 'Users',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Empty.name]: Empty
  },
  data () {
    return {
      showEmpty: false,
      users: []
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getUsers () {
      this.$api.getUsers().then(rsp => {
        console.log(rsp)
        this.users = rsp.userList
        this.showEmpty = this.users.length === 0
      })
    },
    handleDelete (id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确认删除此用户吗？'
      }).then(() => {
        this.$api.deleteUser({
          userId: id
        }).then(rsp => {
          console.log(rsp)
          if (rsp.result === 200) {
            this.$toast('删除成功')
            this.getUsers()
          } else {
            this.$toast(rsp.resultText)
          }
        })
      })
    },
    handleReset (id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确认重置此用户密码为12345吗？'
      }).then(() => {
        this.$api.updateUserPwd({
          userId: id,
          userPwd: '12345'
        }).then(rsp => {
          console.log(rsp)
          if (rsp.result === 200) {
            this.$toast('密码重置成功')
            this.getUsers()
          } else {
            this.$toast(rsp.resultText)
          }
        })
      })
    }
  }
}
</script>

<style scoped>
  .van-card__content {
    min-height: 16px;
  }
  .small-title {
    padding: 5px 15px;
    color: #646566;
    font-size: 12px;
  }
</style>
