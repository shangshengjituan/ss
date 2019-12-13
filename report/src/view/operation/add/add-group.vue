<template>
  <el-card shadow="hover">
    <h4>集团管理层及各管理中心运营成本明细表</h4>
    <el-divider></el-divider>
    <el-form :model="groupData" :rules="rules" ref="groupData" label-width="110px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位名称">
            <el-input v-model="departmentName" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="groupYear">
            <el-date-picker
              v-model="groupData.groupYear"
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
              v-model="groupData.value"
              :options="options"
              @change="handleChange"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工资" prop="groupSalary">
            <el-input v-model.number="groupData.groupSalary" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政费用" prop="groupAdministrative">
            <el-input v-model.number="groupData.groupAdministrative" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="固定资产投资" prop="groupFixedAssets">
            <el-input v-model.number="groupData.groupFixedAssets" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="培训费" prop="groupTraining">
            <el-input v-model.number="groupData.groupTraining" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="科技创新费" prop="groupTechnology">
            <el-input v-model.number="groupData.groupTechnology" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招待费" prop="groupEntertain">
            <el-input v-model.number="groupData.groupEntertain" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经营费" prop="groupOperating">
            <el-input v-model.number="groupData.groupOperating" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="财务费用" prop="groupFinance">
            <el-input v-model.number="groupData.groupFinance" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="各类税费" prop="groupTaxes">
            <el-input v-model.number="groupData.groupTaxes" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="审计费" prop="groupAudit">
            <el-input v-model.number="groupData.groupAudit" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="律师费用" prop="groupLawyer">
            <el-input v-model.number="groupData.groupLawyer" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证书费用" prop="groupCertificate">
            <el-input v-model.number="groupData.groupCertificate" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="伙食费用" prop="groupMeal">
            <el-input v-model.number="groupData.groupMeal" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房租费用" prop="groupRent">
            <el-input v-model.number="groupData.groupRent" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他费用" prop="groupOther">
            <el-input v-model.number="groupData.groupOther" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input v-model="groupData.groupRemark" clearable></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="费用合计">
            <span>{{totalCost}} 元</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!--<el-form-item label="编制人" prop="groupEditor">-->
          <!--<el-input v-model="groupData.groupEditor" clearable></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="编制人" >
            <span>{{groupData.groupEditor}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('groupData')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'AddGroup',
  data () {
    return {
      departmentName: this.$store.getters.departmentName,
      groupData: {
        departmentId: this.$store.getters.departmentId.toString(),
        groupYear: '',
        groupQuarter: '', // 季度
        groupEstimatedOrActual: '', // 预估实际
        groupSalary: '',
        groupAdministrative: '',
        groupFixedAssets: '',
        groupTraining: '',
        groupTechnology: '',
        groupEntertain: '',
        groupOperating: '',
        groupFinance: '',
        groupTaxes: '',
        groupAudit: '',
        groupLawyer: '',
        groupCertificate: '',
        groupMeal: '',
        groupOther: '',
        groupRemark: '',
        groupEditor: this.$store.getters.userName,
        groupRent: '',
        value: [] // 暂存类型季度
      },
      rules: {
        groupYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        value: [{ type: 'array', required: true, message: '请选择类型', trigger: 'change' }],
        groupSalary: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupAdministrative: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupFixedAssets: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupTraining: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupTechnology: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupEntertain: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupOperating: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupFinance: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupTaxes: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupAudit: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupLawyer: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupCertificate: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupMeal: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupOther: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupEditor: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupRent: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      options: this.$store.getters.addType, // 预估实际季度选择
      tempTotal: 0
    }
  },
  computed: {
    totalCost () {
      // 费用合计
      // let _this = this
      // let total = 0 + this.groupData.groupSalary + this.groupData.groupAdministrative + this.groupData.groupFixedAssets + this.groupData.groupTraining + this.groupData.groupTechnology + this.groupData.groupEntertain + this.groupData.groupOperating + this.groupData.groupFinance + this.groupData.groupTaxes + this.groupData.groupAudit + this.groupData.groupLawyer + this.groupData.groupCertificate + this.groupData.groupMeal + this.groupData.groupOther + this.groupData.groupRent
      // _this.tempTotal = total
      let _this = this
      let arr = Object.values(this.groupData)
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
      this.groupData.groupEstimatedOrActual = val[0]
      this.groupData.groupQuarter = val[1] || '0'
    },
    validateData (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的buildingData数据增减字段为formDate后提交
          let formDate = Object.assign({}, _this.groupData)
          formDate.groupTotal = _this.tempTotal
          console.log(JSON.stringify(formDate))
          console.log(JSON.stringify(this.groupData))
          // 提交确认框
          _this.$confirm('确认提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 提交
            _this.$api.operation.addGroup(formDate)
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
                  _this.$router.push({path: '/operation/all/group'})
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
