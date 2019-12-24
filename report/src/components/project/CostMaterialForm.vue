<template>
  <el-form :model="table7" :rules="rules" ref="table7" label-width="180px" label-position="right"  @validate="handleCalculate">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="类型" prop="table7Type">
          <el-select v-model="table7.table7Type" placeholder="请选择调入/调出" value="">
            <el-option label="调入" key="1" value="调入"/>
            <el-option label="调出" key="2" value="调出"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="调入/调出材料名称" prop="table7MaterialName">
          <el-input v-model="table7.table7MaterialName" placeholder="请输入材料名称" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="调出单位" prop="table7RecallUnit">
          <el-input v-model="table7.table7RecallUnit" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="调入单位" prop="table7TransferUnit">
          <el-input v-model="table7.table7TransferUnit" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位">
          <el-input v-model="table7.table7Unit" placeholder="请输入工程量单位" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工程量" prop="table7WorkQuantity">
          <el-input v-model.number="table7.table7WorkQuantity" type='number' placeholder="请输入工程量" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="type" prop="table7Price">
          <el-input v-model.number="table7.table7Price" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="调入单位合价">
          <span>{{totalPrice}} 元</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table7.table7Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table7')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostMaterialForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table7 = Object.assign({}, newValue)
        this.totalPrice = newValue.table7TotalPrice
      }
    }
  },
  data () {
    return {
      table7: Object.assign({}, this.formData),
      editor: this.$store.getters.userName,
      totalPrice: this.formData.table7TotalPrice,
      rules: {
        table7MaterialName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table7RecallUnit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table7TransferUnit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table7Unit: [{ required: true, message: '不可为空', trigger: 'change' }],
        table7WorkQuantity: [{ required: true, message: '请输入工程量', trigger: 'change' }],
        table7Type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        table7Price: [{ required: true, message: '请输入金额', trigger: 'change' }]
      }
    }
  },
  computed: {
    type () {
      let demo = this.table7.table7Type
      if (demo === '调入') {
        return '调入单位材料折合单价'
      } else if (demo === '调出') {
        return '调出单位材料购买单价'
      } else {
        return '单价'
      }
    }
  },
  methods: {
    handleCalculate () {
      this.totalPrice = parseFloat((this.table7.table7WorkQuantity * this.table7.table7Price).toFixed(2))
    },
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的table7数据增减字段为buildingData后提交
          this.table7.table7Editor = this.editor
          this.table7.table7TotalPrice = this.totalPrice
          console.log(JSON.stringify(this.table7))
          this.$emit('confirm', this.table7)
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
