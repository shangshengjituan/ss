<template>
  <div>
    <van-tree-select :items="list" :active-id.sync="activeIds" :main-active-index.sync="activeIndex"/>
    <van-button  block type="info" color="#B8802C" native-type="submit">
      确认
    </van-button>
  </div>
</template>

<script>
import { TreeSelect, Button } from 'vant'
export default {
  name: 'ChooseStaff',
  components: {
    [TreeSelect.name]: TreeSelect,
    [Button.name]: Button
  },
  data () {
    return {
      activeIds: [],
      activeIndex: 0,
      activeNames: '',
      list: [{
        id: 101,
        text: '某某部门',
        children: [{
          id: 1003,
          text: '某某某'
        }, {
          id: 1004,
          text: '某某某'
        }]
      }, {
        id: 102,
        text: '某某大部门',
        children: [{
          id: 2003,
          text: '某某'
        }, {
          id: 2004,
          text: '某'
        }]
      }],
      result: []
    }
  },
  methods: {
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    }
  }
}
</script>

<style scoped>

</style>
