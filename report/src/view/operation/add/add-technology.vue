<template>
  <el-card shadow="hover">
    <h4>集团管理层及各管理中心运营成本明细表</h4>
    <el-divider></el-divider>
    <el-form :model="techData" :rules="rules" ref="techData" label-width="110px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位名称">
            <el-input v-model="departmentName" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="techYear">
            <el-date-picker
              v-model="techData.techYear"
              type="year"
              format="yyyy"
              value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="明细类型" prop="value">
            <el-cascader
              v-model="techData.value"
              :options="options"
              @change="handleChange"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工资" prop="techSalary">
            <el-input v-model.number="techData.techSalary" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政费用" prop="techAdministrative">
            <el-input v-model.number="techData.techAdministrative" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="固定资产投资" prop="techFixedAssets">
            <el-input v-model.number="techData.techFixedAssets" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="培训费" prop="techTraining">
            <el-input v-model.number="techData.techTraining" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="科技创新费" prop="techTechnology">
            <el-input v-model.number="techData.techTechnology" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招待费" prop="techEntertain">
            <el-input v-model.number="techData.techEntertain" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经营费" prop="techOperating">
            <el-input v-model.number="techData.techOperating" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="财务费用" prop="techFinance">
            <el-input v-model.number="techData.techFinance" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="各类税费" prop="techTaxes">
            <el-input v-model.number="techData.techTaxes" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="审计费" prop="techAudit">
            <el-input v-model.number="techData.techAudit" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="律师费用" prop="techLawyer">
            <el-input v-model.number="techData.techLawyer" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证书费用" prop="techCertificate">
            <el-input v-model.number="techData.techCertificate" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="伙食费用" prop="techMeal">
            <el-input v-model.number="techData.techMeal" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房租费用" prop="techRent">
            <el-input v-model.number="techData.techRent" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他费用" prop="techOther">
            <el-input v-model.number="techData.techOther" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input v-model="techData.techRemark" clearable></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="费用合计">
            <span>{{totalCost}} 元</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!--<el-form-item label="编制人" prop="techEditor">-->
          <!--<el-input v-model="techData.techEditor" clearable></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="编制人" >
            <span>{{techData.techEditor}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('techData')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'AddTechnology',
  data () {
    return {
      departmentName: this.$store.getters.departmentName,
      techData: {
        departmentId: this.$store.getters.departmentId.toString(),
        techYear: '',
        techQuarter: '', // 季度
        techEstimatedOrActual: '', // 预估实际
        techSalary: '',
        techAdministrative: '',
        techFixedAssets: '',
        techTraining: '',
        techTechnology: '',
        techEntertain: '',
        techOperating: '',
        techFinance: '',
        techTaxes: '',
        techAudit: '',
        techLawyer: '',
        techCertificate: '',
        techMeal: '',
        techOther: '',
        techRemark: '',
        techEditor: this.$store.getters.userName,
        techRent: '',
        value: [] // 暂存类型季度
      },
      rules: {
        techYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        value: [{ type: 'array', required: true, message: '请选择类型', trigger: 'change' }],
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
        techOther: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techEditor: [{ required: true, message: '请输入金额', trigger: 'change' }],
        techRent: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      options: this.$store.getters.addType, // 预估实际季度选择
      tempTotal: 0
    }
  },
  computed: {
    totalCost () {
      // 费用合计
      // let _this = this
      // let total = 0 + this.techData.techSalary + this.techData.techAdministrative + this.techData.techFixedAssets + this.techData.techTraining + this.techData.techTechnology + this.techData.techEntertain + this.techData.techOperating + this.techData.techFinance + this.techData.techTaxes + this.techData.techAudit + this.techData.techLawyer + this.techData.techCertificate + this.techData.techMeal + this.techData.techOther + this.techData.techRent
      // _this.tempTotal = total
      let _this = this
      let arr = Object.values(this.techData)
      console.log(arr)
      let total = 0
      let filterArr = arr.filter(function (item, index, arr) {
        return typeof item === 'number' && !isNaN(item)
      })
      filterArr.forEach(function (item, index, arr) {
        total = total + item
        return total
      })
      console.log(total)
      _this.tempTotal = parseFloat(total.toFixed(2))
      return total.toFixed(2)
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
      this.techData.techEstimatedOrActual = val[0]
      this.techData.techQuarter = val[1] || '0'
    },
    validateData (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的buildingData数据增减字段为formDate后提交
          let formDate = Object.assign({}, _this.techData)
          formDate.techTotal = _this.tempTotal
          console.log(JSON.stringify(formDate))
          console.log(JSON.stringify(this.techData))
          // 提交确认框
          _this.$confirm('确认提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 提交
            _this.$api.operation.addTech(formDate)
              .then(rsp => {
                console.log(rsp.data)
                let data = rsp.data
                if (data.result === 500) {
                  // 请勿重复填写
                  _this.$alert(data.resultText, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      console.log(action)
                      return false
                    }
                  })
                } else if (data.result === 200) {
                  _this.$router.push({path: '/operation/all/technology'})
                  _this.$message({
                    message: '提交成功！',
                    type: 'success'
                  })
                } else if (data.result === 404) {
                  _this.$message({
                    message: '未知错误，提交失败。',
                    type: 'error'
                  })
                }
              })
          }).catch(() => {
            console.log('cancel submit.')
          })
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
  .el-breadcrumb {
    margin-bottom: 20px;
  }
</style>
