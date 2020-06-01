<template>
  <div>
    <van-nav-bar title="员工列表" left-arrow @click-left="goBack"/>
    <van-card v-for="item in staff" :key="item.staffNum" :desc="`部门：${item.departmentName}`">
      <template #title>
        <div class="flex-container">
          <span>姓名：{{item.staffName}}</span>
          <span>工号：{{item.staffNum}}</span>
        </div>
      </template>
      <template #footer>
        <van-button size="mini" plain type="primary" @click="handleModify(item)">修改</van-button>
        <van-button size="mini" plain type="warning" @click="handleDelete(item.staffNum)">删除</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
import { NavBar, Card, Button } from 'vant'
export default {
  name: 'Staff',
  components: {
    [NavBar.name]: NavBar,
    [Card.name]: Card,
    [Button.name]: Button
  },
  data () {
    return {
      departmentId: '0',
      staff: []
    }
  },
  created () {
    this.getStaff()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getStaff () {
      this.$api.getStaff({
        departmentId: this.departmentId
      }).then(rsp => {
        console.log(rsp)
        this.staff = rsp.staffs
      })
    },
    handleModify (item) {
      this.$router.push({ path: '/staffmodify', query: item })
    },
    handleDelete (id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确认删除此员工吗？'
      }).then(() => {
        this.$api.deleteStaff({
          staffId: id
        }).then(rsp => {
          console.log(rsp)
        })
      })
    }
  }
}
</script>

<style scoped>
.van-card__content {
  min-height: 36px;
}
  .flex-container {
    display: flex;
  }
  .flex-container span {
    flex: 1;
  }
</style>
