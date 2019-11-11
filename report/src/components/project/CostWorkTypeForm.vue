<template>
  <el-form :model="table23" :rules="rules" ref="table23" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工种" prop="table23WorkType">
          <el-input v-model="table23.table23WorkType" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位">
          <el-input v-model="table23.table23Unit" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="施工部位" >
          <el-input v-model="table23.table23ConstructionSite" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="建筑面积/接触面积">
          <el-input v-model="table23.table23ConstructionArea" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="人工费">
          <el-input v-model.number="table23.table23LaborFee" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="每平米单价">
          <el-input v-model.number="table23.table23UnitPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table23.table23Remark" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="编制人：">
          <span>{{this.editor}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('table23')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostWorkTypeForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table23 = newValue
      }
    }
  },
  data () {
    return {
      table23: this.formData,
      editor: this.$store.getters.userName,
      rules: {
        table23WorkType: [{ required: true, message: '不可为空', trigger: 'change' }]
      }
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
          this.table23.table23Editor = this.editor
          console.log(JSON.stringify(this.table23))
          this.$emit('confirm', this.table23)
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

</style>
