<template>
<div>
  <van-nav-bar title="会议列表" left-arrow @click-left="goBack"/>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-empty description="暂无数据" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.confId" :title="item.confName" :label="item.confTime">
        <template #right-icon>
          <van-icon name="search" style="line-height: inherit;" />
        </template>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</div>
</template>

<script>
import { NavBar, PullRefresh, List, CellGroup, Cell } from 'vant'
export default {
  name: 'List',
  components: {
    [NavBar.name]: NavBar,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    onLoad () {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style scoped>

</style>
