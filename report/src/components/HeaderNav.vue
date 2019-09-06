<template>
  <div style="overflow: hidden;">
    <div>尚昇集团</div>
    <span style="float: left">江苏尚昇建设集团有限公司</span>
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
