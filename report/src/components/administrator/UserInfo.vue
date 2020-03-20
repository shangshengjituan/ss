<template>
  <el-form :model="info" :rules="rules" ref="info" label-width="110px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="工号">
          <el-input v-model="info.userNum" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="姓名">
          <el-input v-model="info.userName" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="所在部门">
          <el-select v-model="info.userDepartment" placeholder="请选择">
            <el-option
              v-for="item in departments"
              :key="item.departmentId"
              :label="item.departmentName"
              :value="item.departmentId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="权限">
          <el-cascader placeholder="请选择" v-model="userAuth" :options="authority"></el-cascader>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('info')">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    userInfo: {
      type: Object
    },
    departments: {
      type: Array
    },
    authority: {
      type: Array
    }
  },
  watch: {
    userInfo: {
      handler (newValue, oldValue) {
        this.info = Object.assign({}, newValue)
        this.userAuth = [newValue.plateId, newValue.departmentId]
      },
      deep: true
    },
    userAuth: {
      handler (newVal, oldVal) {
        this.info.plateId = newVal[0]
        this.info.departmentId = newVal[1]
      }
    }
  },
  data () {
    return {
      info: Object.assign({}, this.userInfo),
      userAuth: [this.userInfo.plateId, this.userInfo.departmentId],
      rules: {
        groupCertificate: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupMeal: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupRent: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupOther: [{ required: true, message: '请输入金额', trigger: 'change' }]
      }
      // depart: [],
      // depAuth: [],
      // auth: []
    }
  },
  methods: {
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的buildingData数据增减字段为info后提交
          console.log(JSON.stringify(this.info))
          this.$emit('confirm', this.info)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getAuthority () {
      this.$api.admin.getAuthority()
        .then(rsp => {
          console.log(rsp.data)
          this.authority = rsp.data.plates
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
    }
  }
}
</script>

<style scoped>

</style>
