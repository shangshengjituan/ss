<template>
<div style="overflow: hidden;">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>表单工具</el-breadcrumb-item>
  </el-breadcrumb>
  <!--项目汇总-->
  <el-card shadow="hover" style="width: 450px">
    <div slot="header" class="clearfix">
      <span>项目汇总</span>
      <el-button
        style="float: right; padding: 3px 0" type="text" v-if="role === 'leader'"
        @click="dialogProgramVisible = true">新增项目</el-button>
    </div>
    <div style="height: 400px;overflow:scroll;">
      <el-scrollbar :native="false"  :noresize="false">
        <div v-for="(project, index) in projectList" :key="index" class="text item">
          <span>{{ index+1 }}、 {{ project.projectName }} / {{project.projectManager}} / 管理费：{{project.managementFee}}%</span>
          <el-button
            v-show="project.departmentId === departmentId"
            @click="openDialogUpdateProgram(project)"
            type="text" size="small">编辑</el-button>
        </div>
      </el-scrollbar>
    </div>
  </el-card>
  <!-- 新增项目 -->
  <el-dialog title="新增项目" :visible.sync="dialogProgramVisible">
    <el-form :model="projectItem" :rules="rulePro" ref="projectItem" label-width="150px">
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="projectItem.projectName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="项目经理" prop="projectManager">
        <el-input v-model="projectItem.projectManager" autocomplete="off" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="收取管理费" prop="managementFee">
        <el-input v-model.number="projectItem.managementFee" placeholder="提交后不可修改，请谨慎填写" type="number" autocomplete="off"><template slot="append">%</template></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <span style="color: #F56C6C">注：新增后不可删除，请谨慎操作！</span>
      <el-button @click="dialogProgramVisible = false">取 消</el-button>
      <el-button type="primary" @click="validateProData('projectItem')">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 修改项目 -->
  <el-dialog title="修改项目" :visible.sync="dialogUpdateProgramVisible">
    <el-form :model="projectUpdateItem" :rules="rulePro1" ref="projectUpdateItem">
      <el-form-item label="项目名称" prop="projectName" label-width="120">
        <el-input v-model="projectUpdateItem.projectName" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogUpdateProgramVisible = false">取 消</el-button>
      <el-button type="primary" @click="validateProData1('projectUpdateItem')">确 定</el-button>
    </div>
  </el-dialog>

  <!--工种汇总-->
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
  <!-- 新增工种 -->
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
        projectName: '',
        managementFee: '',
        projectManager: this.$store.getters.userName
      },
      rulePro: {
        projectName: [{ required: true, message: '不可为空', trigger: 'change' }],
        managementFee: [{ required: true, message: '请输入数字', trigger: 'change' }],
        projectManager: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      dialogUpdateProgramVisible: false,
      projectUpdateItem: {
        id: '',
        projectName: ''
      },
      rulePro1: {
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
            this.projectItem.projectName = ''
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
            this.workItem.bricklayer = ''
          } else if (rsp.data.result === 500) {
            this.$message.error(rsp.data.resultText)
          } else {
            this.$message.error('新增工种失败')
          }
          this.dialogWorkVisible = false
          this.getWork()
        })
    },
    updateProject () {
      this.$api.project.updateProjectItem(this.projectUpdateItem)
        .then(rsp => {
          console.log(rsp.data)
          if (rsp.data.result === 200) {
            this.$message.success('修改项目成功！')
          } else if (rsp.data.result === 500) {
            this.$message.error(rsp.data.resultText)
          } else {
            this.$message.error('修改项目失败')
          }
          this.dialogUpdateProgramVisible = false
          this.getProject()
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
    openDialogUpdateProgram (project) {
      this.projectUpdateItem.id = project.id
      this.projectUpdateItem.projectName = project.projectName
      this.dialogUpdateProgramVisible = true
    },
    validateProData1 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateProject()
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
