<template>
  <div style="overflow: hidden;">
    <div>健和体育<span>人心健康 和合文化</span></div>
    <span style="float: left">江苏健和文化体育产业发展有限公司</span>
    <div style="float: right">
      管理员：<span>test</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
