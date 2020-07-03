<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="日期" prop="wageDate">
          <el-date-picker
            v-model="formData.wageDate" value-format="yyyy-MM" class="width-full"
            type="month" placeholder="选择年月" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="类别" prop="staffType">
          <el-select v-model="formData.staffType" placeholder="请选择" class="width-full">
            <el-option key="管理人员" label="管理人员" value="管理人员" />
            <el-option key="职工" label="职工" value="职工" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="姓名" prop="staffName">
          <el-input v-model="formData.staffName" />
        </el-form-item>
      </el-col>
    </el-row>
    <!--<p class="text-divider">工资部分</p>-->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="基本工资" prop="basicWage">
          <el-input v-model="formData.basicWage"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="绩效工资">
          <el-input v-model="formData.performanceWage"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="工作津贴">
          <el-input v-model="formData.workAllowance"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <!--<p class="text-divider">津贴部分</p>-->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="工龄">
          <el-input v-model="formData.seniorityWage"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="证书">
          <el-input v-model="formData.certificateWage"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="其他">
          <el-input v-model="formData.otherWage"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="应付金额" prop="amountsPayable">
          <el-input v-model="formData.amountsPayable" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">扣款部分（个人承担）</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="社会保险">
          <el-input v-model="formData.socialInsurance"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="大额保险">
          <el-input v-model="formData.largeInsurance"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="公积金">
          <el-input v-model="formData.providentFund"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="伙食费">
          <el-input v-model="formData.foodExpenses"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="所得税">
          <el-input v-model="formData.incomeTax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="扣款其他">
          <el-input v-model="formData.otherDenductions"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="扣款合计">
          <el-input v-model="formData.totalDeductions" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <!--<p class="text-divider">本月已发金额</p>-->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="应发金额" prop="amountPayable">
          <el-input v-model="formData.amountPayable"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="实发金额">
          <el-input v-model="formData.amountActual" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="工资余额">
          <el-input v-model="formData.wageBalance" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="备注">
          <el-input v-model="formData.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'RearWage',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {},
      rules: {
        wageDate: [{ required: true, message: '不可为空' }],
        staffType: [{ required: true, message: '不可为空' }],
        staffName: [{ required: true, message: '不可为空' }],
        basicWage: [{ required: true, message: '不可为空' }],
        amountsPayable: [{ required: true, message: '不可为空' }],
        amountPayable: [{ required: true, message: '不可为空' }]
      }
    }
  },
  watch: {
    baseData: {
      handler (val, old) {
        this.formData = Object.assign({}, val)
      },
      deep: true
    },
    formData: {
      handler (val, old) {
        const temp = this.$utils.add(this.$utils.add(val.performanceWage, val.workAllowance), this.$utils.add(val.seniorityWage, val.certificateWage))
        this.formData.amountsPayable = this.$utils.add(val.basicWage, this.$utils.add(val.otherWage, temp)).toFixed(2)
        const temp1 = this.$utils.add(this.$utils.add(val.largeInsurance, val.providentFund), this.$utils.add(val.foodExpenses, val.incomeTax))
        this.formData.totalDeductions = this.$utils.add(this.formData.socialInsurance, this.$utils.add(val.otherDenductions, temp1)).toFixed(2)
        this.formData.amountActual = this.$utils.subtract(val.amountPayable, this.formData.totalDeductions).toFixed(2)
        this.formData.wageBalance = this.$utils.subtract(this.formData.amountsPayable, val.amountPayable).toFixed(2)
      },
      deep: true
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isEdit ? this.editItem() : this.addItem()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel (formName) {
      this.$refs[formName].resetFields()
      this.$emit('cancel')
    },
    addItem () {
      console.log('add')
      this.$api.rear.addWageItem(this.formData).then(rsp => {
        console.log(rsp)
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '新增成功!', duration: 1000 })
          this.$emit('primary')
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      })
    },
    editItem () {
      this.$emit('primary')
    }
  }
}
</script>

<style scoped>

</style>
