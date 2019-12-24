<template>
  <el-form :model="table13" :rules="rules" ref="table13" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="分包项目名称" prop="table13SubcontractingName">
          <el-input v-model="table13.table13SubcontractingName" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位" prop="table13Unit">
          <el-input v-model="table13.table13Unit" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="合同工程量" prop="table13ContractQuantity">
          <el-input v-model.number="table13.table13ContractQuantity" type="number" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际工程量" prop="table13ActualQuantity">
          <el-input v-model.number="table13.table13ActualQuantity" type="number" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="完成形象进度情况" prop="table13Schedule">
          <el-input v-model="table13.table13Schedule" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="分包单价" prop="table13SubcontractingPrice">
          <el-input v-model.number="table13.table13SubcontractingPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="分包合价">
          <el-input v-model.number="table13.table13SubcontractingTotalPrice" type="number" :readonly="true"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="责任成本单价" prop="table13LiabilityCostPrice">
          <el-input v-model.number="table13.table13LiabilityCostPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="责任成本合价">
          <el-input v-model.number="table13.table13LiabilityCostTotalPrice" :readonly="true" type="number"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table13.table13Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table13')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostProjectDetailForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table13 = Object.assign({}, newValue)
      }
    },
    table13: {
      handler (newValue, oldValue) {
        newValue.table13SubcontractingTotalPrice = parseFloat((newValue.table13ActualQuantity * newValue.table13SubcontractingPrice).toFixed(2))
        newValue.table13LiabilityCostTotalPrice = parseFloat((newValue.table13ContractQuantity * newValue.table13LiabilityCostPrice).toFixed(2))
      },
      deep: true
    }
  },
  data () {
    return {
      table13: Object.assign({}, this.formData),
      editor: this.$store.getters.userName,
      rules: {
        table13SubcontractingName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13ContractQuantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13ActualQuantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13Schedule: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13SubcontractingPrice: [{ required: true, message: '不可为空', trigger: 'change' }],
        table13LiabilityCostPrice: [{ required: true, message: '不可为空', trigger: 'change' }]
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
          this.table13.table13Editor = this.editor
          console.log(JSON.stringify(this.table13))
          this.$emit('confirm', this.table13)
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
