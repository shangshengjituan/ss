<template>
  <div class="zhz-header">
    <div style="float: left">
      <span style="font-weight: bold">江苏健和文化体育产业发展有限公司</span>
    </div>
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
  .zhz-header {
    padding: 0 20px;
    overflow: hidden;
    color: #ffffff;
    line-height: 60px;
  }
</style>
