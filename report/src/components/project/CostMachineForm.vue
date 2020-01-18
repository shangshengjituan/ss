<template>
  <el-form :model="table9" :rules="rules" ref="table9" label-width="180px" label-position="right"  @validate="handleCalculate">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="名称" prop="table9MechanicalName">
          <el-input v-model="table9.table9MechanicalName" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="起始时间" prop="table9StartDate">
          <el-date-picker
            v-model="table9.table9StartDate" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择起始日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="终止时间" prop="table9EndDate">
          <el-date-picker
            @focus="handleEndTime"
            v-model="table9.table9EndDate" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            placeholder="请选择终止日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="实际机械人工费" prop="table9LaborFee">
          <el-input v-model.number="table9.table9LaborFee" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际机械租赁单价" prop="table9Price">
          <el-input v-model.number="table9.table9Price" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际机械费小计" prop="table9TotalPrice">
          <el-input v-model.number="table9.table9TotalPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="责任成本机械费" prop="table9MachineryFee">
          <el-input v-model.number="table9.table9MachineryFee" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="自购机械费">
          <el-input v-model.number="table9.table9SelfPurchaseFee" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="机械费差价">
          <el-input v-model="costDifference" :readonly="true" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table9.table9Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table9')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostMachineForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table9 = Object.assign({}, newValue)
        this.costDifference = newValue.table9SpreadFee
      }
    },
    table9: {
      handler (newValue, oldValue) {
        this.costDifference = Math.round((newValue.table9MachineryFee - newValue.table9TotalPrice) * 100) / 100
      },
      deep: true
    }
  },
  data () {
    return {
      table9: Object.assign({}, this.formData),
      editor: this.$store.getters.userName,
      costDifference: this.formData.table6Spread,
      pickerOptions: {},
      rules: {
        table9MechanicalName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table9LaborFee: [{ required: true, message: '不可为空', trigger: 'change' }],
        table9StartDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
        table9EndDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
        table9Price: [{ required: true, message: '不可为空', trigger: 'change' }],
        table9TotalPrice: [{ required: true, message: '不可为空', trigger: 'change' }],
        table9MachineryFee: [{ required: true, message: '不可为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleCalculate () {
      this.costDifference = Math.round((this.table9.table9MachineryFee - this.table9.table9TotalPrice) * 100) / 100
    },
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的table9数据增减字段为buildingData后提交
          this.table9.table9Editor = this.editor
          this.table9.table9SpreadFee = this.costDifference
          console.log(JSON.stringify(this.table9))
          this.$emit('confirm', this.table9)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEndTime () {
      let demo = new Date(this.table9.table9StartDate).getTime()
      this.pickerOptions = {
        disabledDate (time) {
          return time.getTime() < demo
        }
      }
    },
    disabledDate (time) {
      return time.getTime() > new Date(this.table9.table9EndDate).getTime()
    }
  }
}
</script>

<style scoped>

</style>
