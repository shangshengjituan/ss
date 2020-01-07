<template>
  <el-form :model="table10" :rules="rules" ref="table10" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="分包项目名称" prop="table10SubcontractingName">
          <el-input v-model="table10.table10SubcontractingName" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="分包工程合同价" prop="table10ContractPrice">
          <el-input v-model.number="table10.table10ContractPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="收管理费" prop="table10ManagementFee">
          <el-input v-model.number="table10.table10ManagementFee" type="number" clearable><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="分包工程价">
          <el-input v-model.number="table10.table10EngineeringPrice" type="number" :readonly="true"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="合同价每平米造价" prop="table10ContractCost">
          <el-input v-model.number="table10.table10ContractCost" type="number" clearable><template slot="append">元/m<sup>2</sup></template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="分包价每平米造价" prop="table10EngineeringCost">
          <el-input v-model.number="table10.table10EngineeringCost" type="number" clearable><template slot="append">元/m<sup>2</sup></template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table10.table10Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table10')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostManageCostForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table10 = Object.assign({}, newValue)
      }
    },
    table10: {
      handler (newValue, oldValue) {
        newValue.table10EngineeringPrice = parseFloat((newValue.table10ContractPrice * (1 - newValue.table10ManagementFee / 100)).toFixed(2))
      },
      deep: true
    }
  },
  data () {
    return {
      table10: Object.assign({}, this.formData),
      editor: this.$store.getters.userName,
      rules: {
        table10SubcontractingName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table10ContractPrice: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table10ManagementFee: [{ required: true, message: '不可为空', trigger: 'change' }],
        table10EngineeringPrice: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table10ContractCost: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table10EngineeringCost: [{ required: true, message: '请输入金额', trigger: 'change' }]
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
          // 将验证后的table10数据增减字段为buildingData后提交
          this.table10.table10Editor = this.editor
          this.table10.table10TotalPrice = this.totalPrice
          console.log(JSON.stringify(this.table10))
          this.$emit('confirm', this.table10)
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
