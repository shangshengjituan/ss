<template>
  <div class="demo-buildingData">
    <h4>集团建筑板块各单位运营成本明细统计表</h4>
    <el-divider></el-divider>
    <el-form :model="buildingData" :rules="rules" ref="buildingData" label-width="110px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位名称" prop="departmentId">
            <el-select v-model="buildingData.departmentId" placeholder="请选择部门">
              <el-option label="明麓公司总工办" value="6"></el-option>
              <el-option label="明麓公司经营部" value="7"></el-option>
              <el-option label="明麓公司成本部" value="8"></el-option>
              <el-option label="祥能管理公司" value="21"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="buildingYear">
            <el-date-picker
              v-model="buildingData.buildingYear"
              type="year"
              format="yyyy"
              value-format="yyyy"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="明细类型" prop="value">
            <el-cascader
              v-model="buildingData.value"
              :options="options"
              @change="handleChange"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工资" prop="buildingSalary">
            <el-input v-model.number="buildingData.buildingSalary" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政费用" prop="buildingAdministrative">
            <el-input v-model.number="buildingData.buildingAdministrative" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="固定资产投资" prop="buildingFixedAssets">
            <el-input v-model.number="buildingData.buildingFixedAssets" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="培训费" prop="buildingTraining">
            <el-input v-model.number="buildingData.buildingTraining" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="科技创新费" prop="buildingTechnology">
            <el-input v-model.number="buildingData.buildingTechnology" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招待费" prop="buildingEntertain">
            <el-input v-model.number="buildingData.buildingEntertain" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经营费" prop="buildingOperating">
            <el-input v-model.number="buildingData.buildingOperating" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="财务费用" prop="buildingFinance">
            <el-input v-model.number="buildingData.buildingFinance" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="各类税费" prop="buildingTaxes">
            <el-input v-model.number="buildingData.buildingTaxes" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="其他费用" prop="buildingOther">
            <el-input v-model.number="buildingData.buildingOther" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="buildingData.buildingRemark" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="费用合计" prop="buildingTotal">
            <span>{{totalCost}} 元</span>
            <!--<el-input v-model="buildingData.buildingTotal" clearable><template slot="append">元</template></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人" prop="buildingEditor">
            <span>{{buildingData.buildingEditor}}</span>
          </el-form-item>
        </el-col>
        <!--<el-col :span="8">-->
          <!--<el-form-item label="编制日期" prop="buildingEditorDate">-->
            <!--<el-input v-model="buildingData.buildingEditorDate" clearable></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('buildingData')">立即创建</el-button>
        <el-button @click="test">测试</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddBuilding',
  data () {
    return {
      buildingData: {
        departmentId: '',
        buildingYear: '',
        buildingQuarter: '', // 季度
        buildingEstimatedOrActual: '', // 预估实际
        buildingSalary: '',
        buildingAdministrative: '',
        buildingFixedAssets: '',
        buildingTraining: '',
        buildingTechnology: '',
        buildingEntertain: '',
        buildingOperating: '',
        buildingFinance: '',
        buildingTaxes: '',
        buildingOther: '',
        buildingRemark: '',
        // buildingTotal: '',
        buildingEditor: '测试员',
        value: [] // 暂存类型季度
      },
      rules: {
        departmentId: [{ required: true, message: '请选择部门', trigger: 'change' }],
        buildingYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        value: [{ type: 'array', required: true, message: '请选择类型', trigger: 'change' }],
        buildingSalary: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingAdministrative: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingFixedAssets: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingTraining: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingTechnology: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingEntertain: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingOperating: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingFinance: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingTaxes: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingOther: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingRent: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      value: [],
      options: [{
        value: '1',
        label: '预估'
      }, {
        value: '2',
        label: '实际',
        children: [{
          value: '1',
          label: '第一季度'
        }, {
          value: '2',
          label: '第二季度'
        }, {
          value: '3',
          label: '第三季度'
        }, {
          value: '4',
          label: '第四季度'
        }]
      }],
      tempTotal: 0
    }
  },
  computed: {
    totalCost () {
      let _this = this
      let arr = Object.values(this.buildingData)
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
      _this.tempTotal = total
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
      this.buildingData.buildingEstimatedOrActual = val[0]
      this.buildingData.buildingQuarter = val[1] || ''
    },
    validateData (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的buildingData数据增减字段为formDate后提交
          let formDate = _this.buildingData
          formDate.buildingTotal = _this.tempTotal
          console.log(formDate)
          // 提交确认框
          _this.$confirm('提交后将无法修改，确认提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 提交
            _this.$axios.post('/insertForm', formDate)
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
                  _this.$message({
                    message: '提交成功！',
                    type: 'success',
                    onClose () {
                      _this.$router.push({path: '/alloperation'})
                    }
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
    },
    test () {
      this.$router.push({name: 'AllOperation', params: {'type': 'building'}})
    }
  }
}
</script>

<style>
  .demo-buildingData {
    padding: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .demo-buildingData input::-webkit-outer-spin-button,
  .demo-buildingData input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .demo-buildingData input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
