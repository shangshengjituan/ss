<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="日期" prop="socialSecurityDate">
          <el-date-picker
            v-model="formData.socialSecurityDate" value-format="yyyy-MM" class="width-full"
            type="month" placeholder="选择月份" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="姓名" prop="staffName">
          <el-input v-model="formData.staffName" />
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">社保（企业）</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="缴费基数" prop="basePayEnterprise">
          <el-input v-model="formData.basePayEnterprise"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="医疗比例">
          <el-input v-model="formData.medicalTreatmentEnterprise"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="养老比例">
          <el-input v-model="formData.pensionEnterprise"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="工伤比例">
          <el-input v-model="formData.workInjuryEnterprise"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="生育比例">
          <el-input v-model="formData.childbirthEnterprise"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="失业比例">
          <el-input v-model="formData.unemploymentEnterprise"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="合计比例">
          <el-input v-model="formData.totalEnterprise" readonly><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.amountEnterprise" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">公积金</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="企业">
          <el-input v-model="formData.providentFundEnterprise"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="个人">
          <el-input v-model="formData.providentFundPersonal"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">社保（个人）</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="缴费基数" prop="basePayPersonal">
          <el-input v-model="formData.basePayPersonal"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="医疗比例">
          <el-input v-model="formData.medicalTreatmentPersonal"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="养老比例">
          <el-input v-model="formData.pensionPersonal"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="失业比例">
          <el-input v-model="formData.unemploymentPersonal"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="合计比例">
          <el-input v-model="formData.totalPersonal" readonly><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.amountPersonal" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="大额保险">
          <el-input v-model="formData.largeInsurance"><template slot="append">元</template></el-input>
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
  name: 'RearSSFund',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {},
      rules: {
        socialSecurityDate: [{ required: true, message: '不可为空' }],
        staffName: [{ required: true, message: '不可为空' }],
        basePayPersonal: [{ required: true, message: '不可为空' }],
        basePayEnterprise: [{ required: true, message: '不可为空' }]
      },
      materialTypes: [],
      kinds: [],
      providers: []
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
        const temp = this.$utils.add(this.$utils.add(val.medicalTreatmentEnterprise, val.pensionEnterprise), this.$utils.add(val.workInjuryEnterprise, val.childbirthEnterprise))
        this.formData.totalEnterprise = this.$utils.add(val.unemploymentEnterprise, temp)
        this.formData.amountEnterprise = this.$utils.toFixedNumber(this.$utils.multiply(this.formData.basePayEnterprise, this.$utils.divide(this.formData.totalEnterprise, 100)), 2)
        this.formData.totalPersonal = this.$utils.add(val.medicalTreatmentPersonal, this.$utils.add(val.pensionPersonal, val.unemploymentPersonal))
        this.formData.amountPersonal = this.$utils.toFixedNumber(this.$utils.multiply(this.formData.basePayPersonal, this.$utils.divide(this.formData.totalPersonal, 100)), 2)
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
      this.$api.rear.addSSFundItem(this.formData).then(rsp => {
        console.log(rsp)
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '新增成功!', duration: 1000 })
          this.$emit('primary')
        } else {
          this.$message.error(rsp.resultText)
        }
      })
    },
    editItem () {
      this.$emit('primary')
    }
  }
}
</script>

<style>
  .text-divider {
    color: #409EFF;
    /*font-weight: bold;*/
    font-style: italic;
    margin-top: 0;
  }
</style>
