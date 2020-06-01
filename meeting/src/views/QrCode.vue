<template>
<div>
  <vue-qr :text="url" :logoSrc="icon" :logoScale="0.2" colorDark="#333333" colorLight="#fff"></vue-qr>
</div>
</template>

<script>
import VueQr from 'vue-qr'
export default {
  name: 'QrCode',
  components: { VueQr },
  data () {
    return {
      url: 'http://baidu.com',
      icon: require('../assets/icon.png')
    }
  }
}
</script>

<style scoped>

</style>
