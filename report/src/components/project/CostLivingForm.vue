<template>
  <el-form :model="table8" :rules="rules" ref="table8" label-width="180px" label-position="right" >
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="用户单位名称" prop="table8UserUnitName">
          <el-input v-model="table8.table8UserUnitName" :readonly="true" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="类型" prop="table8Type">
          <el-select v-model="table8.table8Type" placeholder="请选择水费/电费" value="">
            <el-option label="水费" key="1" value="水费"/>
            <el-option label="电费" key="2" value="电费"/>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="单位">
          <el-input v-model="table8.table8Unit" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="用量">
          <el-input v-model.number="table8.table8Dosage" type="number" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="用户工作类别">
          <el-input v-model="table8.table8UserWorkCategory" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="水/电费单价">
          <el-input v-model.number="table8.table8Price" type="number" clearable ><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="水/电费合价" prop="table8TotalPrice">
          <el-input v-model.number="table8.table8TotalPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table8.table8Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table8')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostLivingForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table8 = newValue
      }
    }
  },
  data () {
    return {
      table8: this.formData,
      editor: this.$store.getters.userName,
      rules: {
        table8Type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        table8UserUnitName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table8TotalPrice: [{ required: true, message: '请输入金额', trigger: 'change' }]
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
          // 将验证后的table8数据增减字段为buildingData后提交
          this.table8.table8Editor = this.editor
          console.log(JSON.stringify(this.table8))
          this.$emit('confirm', this.table8)
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
