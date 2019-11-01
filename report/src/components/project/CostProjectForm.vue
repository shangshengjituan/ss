<template>
  <el-form :model="table12" :rules="rules" ref="table12" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="分包项目名称" prop="table12SubcontractingName">
          <el-input v-model="table12.table12SubcontractingName" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位" prop="table12Unit">
          <el-input v-model="table12.table12Unit" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合同工程量" prop="table12WorkQuantity">
          <el-input v-model.number="table12.table12WorkQuantity" type="number" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="合同价" prop="table12ContractPrice">
          <el-input v-model.number="table12.table12ContractPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="分包单价" prop="table12SubcontractingPrice">
          <el-input v-model.number="table12.table12SubcontractingPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="分包合价">
          <el-input v-model.number="table12.table12SubcontractingTotalPrice" type="number" :readonly="true"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="责任成本单价" prop="table12LiabilityCostPrice">
          <el-input v-model.number="table12.table12LiabilityCostPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="责任成本合价">
          <el-input v-model.number="table12.table12LiabilityCostTotalPrice" :readonly="true" type="number"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="差额">
          <el-input v-model="table12.table12Spread" placeholder="责任成本与分包合价差额" :readonly="true"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table12.table12Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table12')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostProjectForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table12 = newValue
      }
    },
    table12: {
      handler (newValue, oldValue) {
        newValue.table12SubcontractingTotalPrice = newValue.table12ContractPrice * newValue.table12SubcontractingPrice
        newValue.table12LiabilityCostTotalPrice = newValue.table12WorkQuantity * newValue.table12LiabilityCostPrice
        newValue.table12Spread = newValue.table12LiabilityCostTotalPrice - newValue.table12SubcontractingTotalPrice
      },
      deep: true
    }
  },
  data () {
    return {
      table12: this.formData,
      editor: this.$store.getters.userName,
      rules: {
        table12SubcontractingName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12WorkQuantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12ContractPrice: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12SubcontractingPrice: [{ required: true, message: '不可为空', trigger: 'change' }],
        table12LiabilityCostPrice: [{ required: true, message: '不可为空', trigger: 'change' }]
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
          this.table12.table12Editor = this.editor
          console.log(JSON.stringify(this.table12))
          this.$emit('confirm', this.table12)
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
