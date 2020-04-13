<template>
  <div class="container">
  <h1>江苏尚昇建设集团有限公司 <small> 报表系统后台管理</small><el-link @click="logout" type="primary" style="float: right">退出系统</el-link></h1>
  <el-tabs type="border-card">
    <!--用户管理:已有人员,新注册人员,忘记密码-->
    <el-tab-pane label="用户管理">
      <el-button type="primary" @click="clickAdd">注册人员</el-button>
      <p><span>注：密码初始值为 12345</span></p>
      <el-table :data="users" border height="600" style="width: 100%;margin-top: 10px" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column type="index" />
        <el-table-column prop="userNum" label="工号"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="departmentName" label="部门"></el-table-column>
        <el-table-column prop="plateAuthority" label="板块权限"></el-table-column>
        <el-table-column prop="departmentAuthority" label="部门权限"></el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" @input="filterUsers" placeholder="输入姓名/部门关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="clickUpdate(scope.row)">修改信息</el-button>
            <el-button @click="resetPwd(scope.row)" type="text" size="small">初始化密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 注册页面 -->
      <el-dialog title="注册用户" :visible.sync="dialogVisibleAdd">
        <add-user :departments="departments" :authority="authority" @confirm="confirmAdd" @cancel="cancelDialogAdd"></add-user>
      </el-dialog>
      <!-- 修改页面 -->
      <el-dialog title="修改用户信息" :visible.sync="dialogVisible">
        <user-info :user-info="dialogData" :departments="departments" :authority="authority" @confirm="confirmUpdate" @cancel="cancelDialog"></user-info>
      </el-dialog>
    </el-tab-pane>
    <!--权限管理:浏览权限,权限分配的人员-->
    <!--<el-tab-pane label="权限管理">权限管理</el-tab-pane>-->
    <!--部门管理:增,改-->
    <el-tab-pane label="部门管理">
      <el-button type="primary" @click="dialogVisibleAdd1 = true">新增部门</el-button>
      <el-table :data="departments" border height="600" style="width:600px; margin-top: 10px" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column type="index" />
        <el-table-column prop="departmentName" label="部门"></el-table-column>
        <el-table-column prop="codeName" label="所属板块"></el-table-column>
        <el-table-column label="操作" align="center" width="102">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="clickUpdateDepart(scope.row)">修改信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增部门 -->
      <el-dialog title="新增部门" :visible.sync="dialogVisibleAdd1">
        <el-form :model="depart">
          <el-form-item label="部门名称" label-width="120">
            <el-input v-model="depart.departmentName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属板块" label-width="120">
            <el-select v-model="depart.departmentType" placeholder="请选择">
              <el-option v-for="item in plates" :key="item.plateId" :label="item.plate" :value="item.plateId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <span style="color: #F56C6C">注：新增后不可删除，请谨慎操作！</span>
          <el-button @click="dialogVisibleAdd1 = false">取 消</el-button>
          <el-button type="primary" @click="addDepartment">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改部门 -->
      <el-dialog title="修改部门" :visible.sync="dialogVisible1">
        <el-form :model="departInfo">
          <el-form-item label="部门名称" label-width="120">
            <el-input v-model="departInfo.departmentName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属板块" label-width="120">
            <el-select v-model="departInfo.departmentType" placeholder="请选择">
              <el-option v-for="item in plates" :key="item.plateId" :label="item.plate" :value="item.plateId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="updateDepartment">确 定</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import UserInfo from '../../components/administrator/UserInfo'
import AddUser from '../../components/administrator/AddUser'
import HeaderNav from '../../components/HeaderNav'
export default {
  name: 'index',
  components: { HeaderNav, AddUser, UserInfo },
  data () {
    return {
      activeNames: ['1'],
      initUsers: [],
      users: [],
      search: '',
      dialogData: {},
      dialogVisibleAdd: false,
      dialogVisible: false, // 对话框是否显示
      authority: [],
      departments: [],
      plates: [],
      dialogVisibleAdd1: false,
      dialogVisible1: false,
      depart: {}, // 注册
      departInfo: {} // 修改
    }
  },
  created () {
    this.getUsers()
    this.getAuthority()
    this.getPlates()
    this.getDepartments()
  },
  methods: {
    getUsers () {
      this.$api.admin.getUsers()
        .then(rsp => {
          console.log(rsp.data)
          this.initUsers = rsp.data.allUser
          this.users = this.initUsers
        })
        .catch(error => {
          console.log(error)
        })
    },
    filterUsers () {
      this.users = this.initUsers.filter(data => !this.search || data.userName.includes(this.search) || data.departmentName.includes(this.search))
    },
    resetPwd (user) {
      this.$confirm('此操作将初始化 ' + user.userName + ' 密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.admin.updateUserPwd({
          userId: user.userNum
        }).then(rsp => {
          if (rsp.data.result === 200) {
            this.$message.success(user.userName + ' 密码初始化成功！')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消初始化密码操作。'
        })
      })
    },
    // 点击注册，跳出注册框
    clickAdd () {
      this.dialogVisibleAdd = true
    },
    cancelDialogAdd () {
      this.dialogVisibleAdd = false
    },
    confirmAdd (data) {
      this.$api.admin.addUser(data)
        .then(rsp => {
          let data = rsp.data
          if (data.result === 200) {
            this.$message.success('注册成功！')
            this.getUsers()
          } else {
            this.$message.error('修改失败：' + data.resultText)
          }
          console.log(rsp)
          this.dialogVisible = false
        })
    },
    // 点击编辑，跳出修改框
    clickUpdate (data) {
      this.dialogData = data
      this.dialogVisible = true
    },
    cancelDialog () {
      this.dialogVisible = false
    },
    confirmUpdate (data) {
      this.$api.admin.updateUser(data)
        .then(rsp => {
          let data = rsp.data
          if (data.result === 200) {
            this.$message.success('修改成功！')
            this.getUsers()
          } else {
            this.$message.error('修改失败：' + data.resultText)
          }
          console.log(rsp)
          this.dialogVisible = false
        })
    },
    getAuthority () {
      this.$api.admin.getAuthority()
        .then(rsp => {
          rsp.data.plates.forEach((item, index, arr) => {
            let keyMap = {'codeNum': 'value', 'codeName': 'label'}
            let obj = Object.keys(item).reduce((newData, key) => {
              let newKey = keyMap[key] || key
              newData[newKey] = item[key]
              return newData
            }, {})
            obj.children = []
            this.authority.push(obj)
            if (item.children) {
              item.children.forEach((it, i, arr) => {
                let keyMap = {'departmentId': 'value', 'departmentName': 'label'}
                let obj = Object.keys(it).reduce((newData, key) => {
                  let newKey = keyMap[key] || key
                  newData[newKey] = it[key]
                  return newData
                }, {})
                this.authority[index].children.push(obj)
              })
            }
          })
          console.log(rsp.data)
          console.log(this.authority)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getDepartments () {
      this.$api.admin.getDepartments()
        .then(rsp => {
          console.log(rsp.data)
          this.departments = rsp.data.departments
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPlates () {
      this.$api.admin.getPlates()
        .then(rsp => {
          console.log(rsp.data)
          this.plates = rsp.data.plate
          console.log(this.plates)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addDepartment () {
      if (!this.depart.departmentName || !this.depart.departmentType) {
        this.$message.error('字段不可为空！')
        return false
      }
      this.$api.admin.addDepartment(this.depart)
        .then(rsp => {
          let data = rsp.data
          if (data.result === 200) {
            this.$message.success('注册成功！')
            this.getDepartments()
            this.depart = {}
          } else {
            this.$message.error('修改失败：' + data.resultText)
          }
          console.log(rsp)
          this.dialogVisibleAdd1 = false
        })
    },
    clickUpdateDepart (data) {
      this.departInfo = {
        departmentId: data.departmentId,
        departmentName: data.departmentName,
        departmentType: data.codeNum
      }
      this.dialogVisible1 = true
    },
    updateDepartment () {
      if (!this.departInfo.departmentName || !this.departInfo.departmentType) {
        this.$message.error('字段不可为空！')
        return false
      }
      this.$api.admin.updateDepartment(this.departInfo)
        .then(rsp => {
          let data = rsp.data
          if (data.result === 200) {
            this.$message.success('修改成功！')
            this.getDepartments()
            this.dialogVisible1 = false
          } else {
            this.$message.error('修改失败：' + data.resultText)
          }
          console.log(rsp)
        })
    },
    logout () {
      this.$store.dispatch('logout').then(rsp => {
        console.log(rsp)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 10px;
  }
.box-card {
  width: 400px;
}
</style>
