<template>
  <el-form :model="table11" :rules="rules" ref="table11" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="分包工程名称">
          <el-input v-model="table11.table11Header" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="分部分项名称" prop="table11PartialItemName">
          <el-input v-model="table11.table11PartialItemName" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="单位" prop="table11Unit">
          <el-input v-model="table11.table11Unit" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="完成工程量">
          <el-input v-model.number="table11.table11WorkQuantity" type="number" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="完成产值" prop="table11OutputValue">
          <el-input v-model.number="table11.table11OutputValue" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="栋号">
          <el-input v-model="table11.table11BuildingNumber" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="层数">
          <el-input v-model="table11.table11Floor" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="部位">
          <el-input v-model="table11.table11Part" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="形象进度完成情况" prop="table11Schedule">
          <el-input v-model="table11.table11Schedule" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table11.table11Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table11')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostManageValueForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table11 = Object.assign({}, newValue)
      }
    }
  },
  data () {
    return {
      table11: Object.assign({}, this.formData),
      editor: this.$store.getters.userName,
      rules: {
        table11PartialItemName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table11Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table11OutputValue: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table11Schedule: [{ required: true, message: '不可为空', trigger: 'change' }]
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
          this.table11.table11Editor = this.editor
          console.log(JSON.stringify(this.table11))
          this.$emit('confirm', this.table11)
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
