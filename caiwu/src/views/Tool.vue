<template>
  <div class="flex-container">
    <el-tabs v-model="activeName" tab-position="left" @tab-click="handleTabChange">
      <el-tab-pane label="项目" name="项目">
        <el-card shadow="hover">
          <div slot="header">
            <el-form :inline="true">
              <el-form-item>
                <el-button type="primary" size="mini" @click="handleShow" icon="el-icon-plus">新增数据</el-button>
              </el-form-item>
              <el-form-item>
                <el-input v-model="search" size="mini" placeholder="输入项目名称关键字搜索"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-table
            :data="projects.filter(data => !search || data.projectName.includes(search))"
            max-height="650">
            <el-table-column type="index" width="60px"/>
            <el-table-column label="项目名称" width="250px" prop="projectName" />
            <el-table-column label="项目号" width="100px" prop="projectNumber" />
            <el-table-column label="操作" align="right" width="120px">
              <template slot-scope="scope">
                <el-button type="text" @click="handleEditShow(scope.row)">编辑</el-button>
                <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="甲方" name="甲方">
        <el-card shadow="hover" style="width: 400px">
          <div slot="header" class="card-header">
            <!--<span>甲方</span>-->
            <el-button  type="primary" size="mini" icon="el-icon-plus" @click="handleShow">新增数据</el-button></div>
          <div v-for="(item, index) in parties" :key="item.partyAId" class="text item">
            {{index+1 + '. '+ item.partyAName }}
            <div style="float: right">
              <el-button style="padding: 0" type="text" @click="handleEditShow(item)">编辑</el-button>
              <el-button style="padding: 0" type="text" @click="handleDelete(item)">删除</el-button>
            </div>
          </div>
          <!--<el-tree :data="parties" @node-click="handleNodeClick"></el-tree>-->
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <el-dialog width="500px" title="新增项目" label-width="90px" :visible.sync="showForm">
      <el-form v-if="activeName==='项目'" ref="form" :model="projectForm" :rules="rules">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="projectForm.projectName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目号">
          <el-input v-model="projectForm.projectNumber" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else-if="activeName==='甲方'" ref="form" :model="partyForm" :rules="rules">
        <el-form-item label="单位名称" prop="partyAName">
          <el-input v-model="partyForm.partyAName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" :disabled="unClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
	export default {
		name: "Tool",
		data () {
			return {
				activeName: '项目',
				projects: [],
				parties: [],
				search: '',
				showForm: false,
				isEdit: false,
				baseData: {},
				currentRow: {},
				projectForm: {},
				partyForm: {},
				unClick: false,
				rules: {
					projectName: [{ required: true, message: '不可为空' }],
					partyAName: [{ required: true, message: '不可为空' }]
				}
			}
		},
		created () {
			this.getProjects()
      this.getParties()
		},
		watch: {
			activeName (val) {
				if(val === '项目') this.getProjects()
				if(val === '甲方') this.getParties()
      },
			baseData: {
				handler (val) {
					if (this.activeName ==='项目') {
						this.projectForm = Object.assign({}, val)
					} else if (this.activeName ==='甲方') {
						this.partyForm = Object.assign({}, val)
					}
				},
				deep: true
			}
		},
		methods: {
			getProjects() {
				this.$api.getProjects().then(rsp => {this.projects = rsp.data})
			},
			getParties() {
				this.$api.getParties().then(rsp => {this.parties = rsp.data})
			},
			handleTabChange (tab, event) {
				console.log(tab, event)
      },
			handleShow () {
				this.showForm = true
				this.isEdit = false
				this.baseData = {}
				console.log(JSON.stringify(this.baseData))
			},
			handleEditShow (item) {
				this.showForm = true
				this.isEdit = true
				this.baseData = item
				console.log(JSON.stringify(this.baseData))
			},
			// handleCurrentChange (val) {
			// 	this.currentRow = val
			// },
			handleDelete (item) {
				console.log(item)
				if (JSON.stringify(item) === '{}') return
				this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
					.then(() => {
						this.deleteItem(item)
					}).catch(() => { this.$message({ type: 'info', message: '已取消删除', duration: 1000 }) })
			},
			deleteItem (item) {
				if (this.activeName ==='项目') {
					this.$api.deleteProject({ projectId: item.projectId }).then(rsp => {
						if (rsp.result === 200) {
							this.$message({ type: 'success', message: '删除成功', duration: 1000 })
							this.getProjects()
						} else { this.$message.error(rsp.resultText) }
					})
        } else if (this.activeName ==='甲方') {
					this.$api.deleteParty({ partyAId: item.partyAId }).then(rsp => {
						if (rsp.result === 200) {
							this.$message({ type: 'success', message: '删除成功', duration: 1000 })
							this.getParties()
						} else { this.$message.error(rsp.resultText) }
					})
				}
			},
			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.isEdit ? this.editItem() : this.addItem()
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			handleCancel (formName) {
				this.$refs[formName].resetFields()
				this.showForm = false
			},
			addItem () {
				this.unClick = true
				if (this.activeName ==='项目') {
					this.$api.addProject(this.projectForm).then(rsp => {
						this.unClick = false
						if (rsp.result === 200) {
							this.$message({ type: 'success', message: '新增成功!', duration: 1000 })
							this.showForm = false
							this.getProjects()
						} else {
							this.$message({ type: 'error', message: rsp.resultText })
						}
					}).catch(err => {
						this.unClick = false
						this.$message({ type: 'error', message: err })
					})
				} else if (this.activeName ==='甲方') {
					this.$api.addParty(this.partyForm).then(rsp => {
						this.unClick = false
						if (rsp.result === 200) {
							this.$message({ type: 'success', message: '新增成功!', duration: 1000 })
							this.showForm = false
							this.getParties()
						} else {
							this.$message({ type: 'error', message: rsp.resultText })
						}
					}).catch(err => {
						this.unClick = false
						this.$message({ type: 'error', message: err })
					})
				}
			},
			editItem () {
				this.unClick = true
				if (this.activeName ==='项目') {
					this.$api.modifyProject(this.projectForm).then(rsp => {
						this.unClick = false
						if (rsp.result === 200) {
							this.$message({ type: 'success', message: '修改成功!', duration: 1000 })
							this.showForm = false
							this.getProjects()
						} else {
							this.$message({ type: 'error', message: rsp.resultText })
						}
					}).catch(err => {
						this.unClick = false
						this.$message({ type: 'error', message: err })
					})
				} else if (this.activeName ==='甲方') {
					this.$api.modifyParty(this.partyForm).then(rsp => {
						this.unClick = false
						if (rsp.result === 200) {
							this.$message({ type: 'success', message: '修改成功!', duration: 1000 })
							this.showForm = false
							this.getParties()
						} else {
							this.$message({ type: 'error', message: rsp.resultText })
						}
					}).catch(err => {
						this.unClick = false
						this.$message({ type: 'error', message: err })
					})
				}

			}
		}
	}
</script>

<style>

  .flex-container {
    display: flex;
    flex-flow: row wrap;
    padding: 10px;
  }
  .card-header {
    margin: 0 -10px 0 0;
  }
  .el-card__body {
    padding: 10px;
  }
  .el-card .el-form-item {
     margin-bottom: 0;
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
