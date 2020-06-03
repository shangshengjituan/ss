<template>
  <div>
    <van-nav-bar title="员工列表" fixed left-arrow @click-left="goBack" style="z-index: 29999">
      <template #right>
        <van-icon name="filter-o" size="18" @click="showPopup = !showPopup" />
        <span style="color: #ffffff">空</span>
        <van-icon name="add-o" size="18" @click="$router.push('/staffadd')"/>
      </template>
    </van-nav-bar>
    <van-popup v-model="showPopup" position="top" class="flex-container" :style="{ height: '70%' }">
      <div class="flex-content">
        <van-button
          :type="departmentId === item.departmentId ? 'primary' : 'default'" size="small"
          v-for="item in departments" :key="item.departmentId" @click="clickItem(item)">
          {{item.departmentName}}
        </van-button>
      </div>
      <div class="flex-bottom">
        <van-button type="default" @click="handleReset">重置</van-button>
        <van-button type="primary" @click="handleFiltrate">确认</van-button>
      </div>
    </van-popup>
    <div class="small-title">
      <span>{{departmentName}}（{{staff.length}}人）</span>
    </div>
    <van-card v-for="item in staff" :key="item.staffNum" :desc="`部门：${item.departmentName}`">
      <template #title>
        <div class="flex">
          <span>姓名：{{item.staffName}}</span>
          <span>工号：{{item.staffNum}}</span>
        </div>
      </template>
      <template #footer>
        <van-button size="mini" plain type="primary" @click="handleModify(item)">修改</van-button>
        <van-button size="mini" plain type="warning" @click="handleDelete(item.staffId)">删除</van-button>
      </template>
    </van-card>
    <van-empty description="暂无数据" v-show="showEmpty" />
  </div>
</template>

<script>
import { NavBar, Icon, Popup, Card, Button, Empty } from 'vant'
export default {
  name: 'Staff',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Card.name]: Card,
    [Button.name]: Button,
    [Empty.name]: Empty
  },
  data () {
    return {
      showPopup: false,
      showEmpty: false,
      departmentId: '0',
      departmentName: '全部',
      staff: [],
      departments: []
    }
  },
  created () {
    this.getStaff()
    this.getDepartments()
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
        this.showEmpty = this.staff.length === 0
      })
    },
    getDepartments () {
      this.$api.getDepartments().then(rsp => {
        console.log(rsp)
        this.departments = rsp.departments
      })
    },
    clickItem (item) {
      console.log(item)
      this.departmentId = item.departmentId
      this.departmentName = item.departmentName
    },
    handleReset () {
      this.departmentId = '0'
      this.departmentName = '全部'
      this.showPopup = false
      this.getStaff()
    },
    handleFiltrate () {
      this.showPopup = false
      this.getStaff()
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
          if (rsp.result === 200) {
            this.$toast('删除成功')
            this.getStaff()
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
  min-height: 36px;
}
.small-title {
  padding: 5px 15px 0;
  color: #646566;
  font-size: 12px;
}
.flex-container {
  padding-top: 51px;
  display: flex;
  flex-flow: column nowrap;
}
.flex-content {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: flex-start;
  flex: 1;
}
.flex-content button {
  margin-bottom: 10px;
}
.flex-bottom {
  display: flex;
}
.flex-bottom button {
  flex: 1;
}
  .flex {
    display: flex;
  }
  .flex span {
    flex: 1;
  }
</style>
