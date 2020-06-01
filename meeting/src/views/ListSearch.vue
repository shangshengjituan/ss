<template>
<div>
  <form action="/">
    <van-search
      v-model="value"
      placeholder="请输入议题关键词"
      @search="onSearch"
    />
    <van-cell title="选择日期区间" :value="date" @click="show = true" />
    <van-calendar color="#B8802C" v-model="show" type="range" @confirm="onConfirm" />
  </form>
  <van-empty description="暂无数据" />
</div>
</template>

<script>
export default {
  name: 'ListSearch',
  data () {
    return {
      value: '',
      date: '',
      show: false
    }
  },
  methods: {
    onSearch (val) {
      console.log('search')
    },
    formatDate (date) {
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    onConfirm (date) {
      const [start, end] = date
      this.show = false
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
    }
  }
}
</script>

<style scoped>

</style>
