<template>
  <div>
    <van-nav-bar title="进行中会议列表" left-arrow @click-left="goBack"/>
    <van-card v-for="item in list" :key="item.confId" :desc="`${item.confTime}`" @click="handleClick(item.confId)">
      <template #title>
        <div>
          <span>议题：{{item.confName}}</span>
        </div>
      </template>
      <template #footer>
        <div v-show="item.confInitiator === $store.getters.userNum">
          <van-button size="mini" plain type="primary" @click="handleModify(item)">修改</van-button>
          <van-button size="mini" plain type="warning" @click="handleDelete(item.confId)">删除</van-button>
        </div>
      </template>
    </van-card>
    <van-empty description="暂无数据" v-show="showEmpty" />
  </div>
</template>

<script>
import { NavBar, Card, Button, Empty } from 'vant'
export default {
  name: 'Listing',
  components: {
    [NavBar.name]: NavBar,
    [Card.name]: Card,
    [Button.name]: Button,
    [Empty.name]: Empty
  },
  data () {
    return {
      showEmpty: false,
      list: []
    }
  },
  created () {
    this.getMeetings()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getMeetings () {
      this.$api.getMeetings({
        confStatus: 0
      }).then(rsp => {
        console.log(rsp)
        this.list = rsp.conferenceList
        this.showEmpty = this.list.length === 0
      })
    },
    handleClick (id) {
      console.log(id)
    },
    handleModify (item) {
      this.$router.push({ path: '/meetingmodify', query: { id: item.confId } })
    },
    handleDelete (id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确认删除此会议吗？'
      }).then(() => {
        this.$api.deleteMeeting({
          confId: id
        }).then(rsp => {
          console.log(rsp)
          if (rsp.result === 200) {
            this.$toast('删除成功')
            this.getMeetings()
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
  .van-card__footer {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
</style>
