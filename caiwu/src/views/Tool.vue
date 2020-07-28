<template>
  <div class="flex-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix"><span>项目</span></div>
      <el-tree :data="projects" @focus="focusNode"></el-tree>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix"><span>甲方</span></div>
      <el-tree :data="parties" @node-click="handleNodeClick"></el-tree>
    </el-card>
  </div>
</template>

<script>
	export default {
		name: "Tool",
		data () {
			return {
				projects: [],
				parties: []
			}
		},
		created () {
			this.getBase()
		},
		methods: {
			getBase() {
				this.$api.getProjects().then(rsp => {
					let temp = []
					rsp.data.forEach(item => {
						temp.push({
							label: item.projectName,
							value: item.projectId,
							children: []
						})
					})
					this.projects = temp
				})
				this.$api.getParties().then(rsp => {
					let temp = []
					rsp.data.forEach(item => {
						temp.push({
							label: item.partyAName,
							value: item.partyAId,
							children: []
						})
					})
					this.parties = temp
				})
			},
			focusNode () {
				console.log('focus')
      },
			handleNodeClick(data) {
				console.log(data)
			}
		}
	}
</script>

<style scoped>
  .flex-container {
    display: flex;
    flex-flow: row wrap;
    padding: 10px;
  }
  .box-card {
    width: 400px;
    margin: 0 10px 10px 0;
    /*flex: 1;*/
  }
  .el-card__body {
    padding: 10px;
  }
  .item {
    margin: 0 0 5px;
    /*width: auto;*/
  }
  .indent {
    text-indent: 16px;
  }
  .el-collapse {
    border: 0;
    color: #303133;
  }
  .col-title {
    height: 32px;
    line-height: 32px;
  }
  .el-collapse-item__header {
    font-size: initial;
  }
  .el-collapse-item__content {
    padding-bottom: 5px;
  }
</style>
