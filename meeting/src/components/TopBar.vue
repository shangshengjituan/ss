<template>
  <van-nav-bar :title="title" left-arrow @click-left="goBack"/>
</template>

<script>
import { NavBar } from 'vant'
export default {
  name: 'TopBar',
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    title: String
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
