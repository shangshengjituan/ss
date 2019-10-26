<template>
  <el-form :model="table3" :rules="rules" ref="table3" label-width="110px" label-position="right" @validate="handleCalculate">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="工作内容明细：">
          <span>{{table3.jobDetail}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="单位" prop="table3Unit">
          <el-select
            filterable allow-create default-first-option
            v-model="table3.table3Unit" placeholder="请选择单位" value="">
            <el-option value="m^2">m<sup>2</sup></el-option>
            <el-option value="m^3">m<sup>3</sup></el-option>
            <el-option value="个">个</el-option>
            <el-option value="t">t</el-option>
            <el-option value="根">根</el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="合同工程量" prop="table3ContractQuantity">
          <el-input v-model="table3.table3ContractQuantity" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="实际工程量" prop="table3ActualEngineeringQuantity">
          <el-input v-model="table3.table3ActualEngineeringQuantity" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="责任人工单价" prop="table3ResponsibleLaborUnitPrice">
          <el-input v-model.number="table3.table3ResponsibleLaborUnitPrice" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="责任人工费" prop="table3ResponsibleLaborFee">
          <el-input v-model.number="table3.table3ResponsibleLaborFee" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="实际人工单价" prop="table3ActualLaborUnitPrice">
          <el-input v-model.number="table3.table3ActualLaborUnitPrice" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="实际人工费" prop="table3ActualLaborCost">
          <el-input v-model.number="table3.table3ActualLaborCost" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="人工费差额：">
          <span> {{ costDifference }} 元</span>
          <!--<el-input v-model.number="table3.table3LaborCostDifference" type='number' clearable><template slot="append">元</template></el-input>-->
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="编制人：">
          <span>{{this.editor}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table3.table3Remark" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('table3')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostLaborForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table3 = newValue
        this.costDifference = newValue.table3LaborCostDifference
      }
    }
  },
  data () {
    return {
      table3: this.formData,
      editor: this.$store.getters.userName,
      costDifference: this.formData.table3LaborCostDifference,
      rules: {
        table3ContractQuantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table3ActualEngineeringQuantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table3ResponsibleLaborUnitPrice: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table3ResponsibleLaborFee: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table3ActualLaborUnitPrice: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table3ActualLaborCost: [{ required: true, message: '请输入金额', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleCalculate () {
      this.costDifference = this.table3.table3ResponsibleLaborFee - this.table3.table3ActualLaborCost
    },
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的table3数据增减字段为buildingData后提交
          this.table3.table3Editor = this.editor
          this.table3.table3LaborCostDifference = this.costDifference
          console.log(JSON.stringify(this.table3))
          this.$emit('confirm', this.table3)
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
