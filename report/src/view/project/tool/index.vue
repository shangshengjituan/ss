<template>
<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>表单工具</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">
      <span>项目汇总</span>
      <el-button
        style="float: right; padding: 3px 0" type="text" v-if="role === 'leader'"
        @click="dialogProgramVisible = true">新增项目</el-button>
    </div>
    <div v-for="(project, index) in projectList" :key="index" class="text item">
      {{ index+1 }}、 {{ project.projectName }}
    </div>
  </el-card>
  <el-dialog title="新增项目" :visible.sync="dialogProgramVisible">
    <el-form :model="projectItem" :rules="rulePro" ref="projectItem">
      <el-form-item label="项目名称" prop="projectName" label-width="120">
        <el-input v-model="projectItem.projectName" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogProgramVisible = false">取 消</el-button>
      <el-button type="primary" @click="validateProData('projectItem')">确 定</el-button>
    </div>
  </el-dialog>

  <el-card shadow="hover">
    <div slot="header" class="clearfix">
      <span>工种汇总</span>
      <el-button v-if="role === 'leader'"
        style="float: right; padding: 3px 0" type="text"
        @click="dialogWorkVisible = true">新增工种</el-button>
    </div>
    <div v-for="(work, index) in workList" :key="index" class="text item">
      {{ index+1 }}、 {{ work.bricklayer }}
    </div>
  </el-card>
  <el-dialog title="新增工种" :visible.sync="dialogWorkVisible">
    <el-form :model="workItem" :rules="ruleWork" ref="workItem">
      <el-form-item label="工种名称" prop="bricklayer" label-width="120">
        <el-input v-model="workItem.bricklayer" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogWorkVisible = false">取 消</el-button>
      <el-button type="primary" @click="validateWorkData('workItem')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      plateId: this.$store.getters.plateId,
      role: this.$store.getters.role,
      projectList: [],
      workList: [],
      dialogProgramVisible: false,
      projectItem: {
        departmentId: this.$store.getters.departmentId,
        projectName: ''
      },
      rulePro: {
        projectName: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      dialogWorkVisible: false,
      workItem: {
        bricklayer: ''
      },
      ruleWork: {
        bricklayer: [{ required: true, message: '不可为空', trigger: 'change' }]
      }
    }
  },
  created () {
    this.getProject()
    this.getWork()
  },
  methods: {
    getProject () {
      this.$api.project.getProjectList({
        departmentId: this.departmentId,
        plateId: this.plateId

      })
        .then(rsp => {
          console.log(rsp.data)
          this.projectList = rsp.data.list
        })
    },
    getWork () {
      this.$api.project.getWorkList()
        .then(rsp => {
          console.log(rsp.data)
          this.workList = rsp.data.list
        })
    },
    addProject () {
      this.$api.project.addProjectItem(this.projectItem)
        .then(rsp => {
          console.log(rsp.data)
          if (rsp.data.result === 200) {
            this.$message.success('新增项目成功！')
          } else if (rsp.data.result === 500) {
            this.$message.error(rsp.data.resultText)
          } else {
            this.$message.error('新增项目失败')
          }
          this.dialogProgramVisible = false
          this.getProject()
        })
    },
    addWork () {
      this.$api.project.addWorkItem(this.workItem)
        .then(rsp => {
          console.log(rsp.data)
          if (rsp.data.result === 200) {
            this.$message.success('新增工种成功！')
          } else if (rsp.data.result === 500) {
            this.$message.error(rsp.data.resultText)
          } else {
            this.$message.error('新增工种失败')
          }
          this.dialogWorkVisible = false
          this.getWork()
        })
    },
    validateProData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addProject()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    validateWorkData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addWork()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .el-card {
    width: 360px;
    float: left;
    margin-right: 20px;
  }
</style>
