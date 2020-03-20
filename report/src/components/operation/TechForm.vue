<template>
  <el-form :model="techData" :rules="rules" ref="techData" label-width="110px" label-position="right" @validate="handleSum">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单位名称">
          <el-input v-model="techData.departmentName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="年份" prop="techYear">
          <el-date-picker
            v-model="techData.techYear"
            type="year"
            format="yyyy"
            value-format="yyyy"
            placeholder="请选择年份">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="明细类型">
          <el-input v-model="techData.techType" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工资" prop="techSalary">
          <el-input v-model.number="techData.techSalary" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="行政收入" prop="techAdministrative">
          <el-input v-model.number="techData.techAdministrative" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="固定资产投资" prop="techFixedAssets">
          <el-input v-model.number="techData.techFixedAssets" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="培训费" prop="techTraining">
          <el-input v-model.number="techData.techTraining" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="科技创新费" prop="techTechnology">
          <el-input v-model.number="techData.techTechnology" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="招待费" prop="techEntertain">
          <el-input v-model.number="techData.techEntertain" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="经营费" prop="techOperating">
          <el-input v-model.number="techData.techOperating" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="财务费用" prop="techFinance">
          <el-input v-model.number="techData.techFinance" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="各类税费" prop="techTaxes">
          <el-input v-model.number="techData.techTaxes" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="审计费" prop="techAudit">
          <el-input v-model.number="techData.techAudit" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="律师费用" prop="techLawyer">
          <el-input v-model.number="techData.techLawyer" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="证书费用" prop="techCertificate">
          <el-input v-model.number="techData.techCertificate" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="伙食费用" prop="techMeal">
          <el-input v-model.number="techData.techMeal" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="房租费用" prop="techRent">
          <el-input v-model.number="techData.techRent" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="其他费用" prop="techOther">
          <el-input v-model.number="techData.techOther" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="备注">
      <el-input v-model="techData.techRemark" clearable></el-input>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="费用合计">
          <span>{{tempTotal}} 元</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="编制人" >
          <span>{{techData.techEditor}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('techData')">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TechForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.techData = Object.assign({}, newValue)
      },
      deep: true
    }
  },
  data () {
    return {
      techData: Object.assign({}, this.formData),
      rules: {
        techYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        techSalary: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techAdministrative: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techFixedAssets: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techTraining: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techTechnology: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techEntertain: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techOperating: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techFinance: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techTaxes: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techAudit: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techLawyer: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techCertificate: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techMeal: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techRent: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techOther: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      tempTotal: this.formData.techTotal.toString().replace(/\B(?=(\d{3})+$)/g, ' , ')
    }
  },
  methods: {
    // 合计
    handleSum () {
      let total = this.techData.techSalary + this.techData.techAdministrative + this.techData.techFixedAssets +
        this.techData.techTraining + this.techData.techTechnology + this.techData.techEntertain +
        this.techData.techOperating + this.techData.techFinance + this.techData.techTaxes +
        this.techData.techAudit + this.techData.techLawyer + this.techData.techCertificate +
        this.techData.techMeal + this.techData.techOther + this.techData.techRent
      this.techData.techTotal = total
      this.tempTotal = total.toString().replace(/\B(?=(\d{3})+$)/g, ' , ')
    },
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的buildingData数据增减字段为techData后提交
          console.log(JSON.stringify(this.techData))
          this.$emit('confirm', this.techData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
</style>
