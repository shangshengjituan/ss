<template>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="文体板块单位" name="sportplate">
        <h4>文体板块各单位运营成本明细统计表</h4>
        <el-divider></el-divider>
        <el-form :model="sportData" :rules="rules" ref="sportData" label-width="110px" label-position="right" >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="单位名称" prop="departmentId">
                <el-select v-model="sportData.departmentId" placeholder="请选择部门">
                  <el-option label="健和公司" value="22"></el-option>
                  <el-option label="泉湖圣竟公司" value="23"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年份" prop="sportYear">
                <el-date-picker
                  v-model="sportData.sportYear"
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
                  v-model="sportData.value"
                  :options="options"
                  @change="handleChange"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="工资" prop="sportSalary">
                <el-input v-model.number="sportData.sportSalary" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="培训费" prop="sportTraining">
                <el-input v-model.number="sportData.sportTraining" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="招待费" prop="sportEntertain">
                <el-input v-model.number="sportData.sportEntertain" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="经营费" prop="sportOperating">
                <el-input v-model.number="sportData.sportOperating" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="房租费" prop="sportRent">
                <el-input v-model.number="sportData.sportRent" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="水电费" prop="sportHydropower">
                <el-input v-model.number="sportData.sportHydropower" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="伙食费" prop="sportMeal">
                <el-input v-model.number="sportData.sportMeal" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行政费用" prop="sportAdministrative">
                <el-input v-model.number="sportData.sportAdministrative" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="财务费用" prop="sportFinance">
                <el-input v-model.number="sportData.sportFinance" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="各类税费" prop="sportTaxes">
                <el-input v-model.number="sportData.sportTaxes" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宣传费用" prop="sportPropaganda">
                <el-input v-model.number="sportData.sportPropaganda" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其他费用" prop="sportOther">
                <el-input v-model.number="sportData.sportOther" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注">
            <el-input v-model="sportData.sportRemark" clearable></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="费用合计">
                <span>{{totalCost}} 元</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="编制人">
                <span>{{sportData.sportEditor}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="validateData('sportData')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="赛事活动" name="sportactivity">
        <h4>赛事活动运营成本明细统计表</h4>
        <el-divider></el-divider>
        <el-form :model="activityData" :rules="rules1" ref="activityData" label-width="110px" label-position="right" >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="赛事活动名称" prop="activityName">
                <el-select
                  filterable
                  allow-create
                  default-first-option
                  v-model="activityData.activityName"
                  placeholder="请输入/选择赛事活动" value="">
                  <el-option label="春牛首马拉松" value="春牛首马拉松"></el-option>
                  <el-option label="六合镇马拉松" value="六合镇马拉松"></el-option>
                  <el-option label="公司基地生活馆" value="公司基地生活馆"></el-option>
                  <el-option label="其他赛事" value="其他赛事"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年份" prop="activityYear">
                <el-date-picker
                  v-model="activityData.activityYear"
                  type="year"
                  format="yyyy"
                  value-format="yyyy"
                  placeholder="请选择年份">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="赛事活动时间" prop="activityTime">
                <el-date-picker
                  v-model="activityData.activityTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="赛事运营单位" prop="activityOperatingUnit">
                <el-input v-model="activityData.activityOperatingUnit" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="赛事活动地点" prop="activityLocation">
                <el-input v-model="activityData.activityLocation" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="预估运营成本" prop="activityEstimatedCost">
                <el-input v-model.number="activityData.activityEstimatedCost" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实际运营成本" prop="activityActualCost">
                <el-input v-model.number="activityData.activityActualCost" type="number" clearable><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="备注">
                <el-input v-model="activityData.activityRemark" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="编制人">
                <span>{{activityData.activityEditor}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="validateData1('activityData')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
  name: 'AddSport',
  data () {
    return {
      activeName: 'sportplate',
      sportData: {
        departmentId: '',
        sportYear: '',
        sportQuarter: '', // 季度
        sportEstimatedOrActual: '', // 预估实际
        sportSalary: '',
        sportTraining: '',
        sportEntertain: '',
        sportOperating: '',
        sportRent: '',
        sportHydropower: '',
        sportMeal: '',
        sportAdministrative: '',
        sportFinance: '',
        sportTaxes: '',
        sportPropaganda: '',
        sportOther: '',
        sportRemark: '',
        // sportTotal: '',
        sportEditor: '测试员',
        value: [] // 暂存类型季度
      },
      rules: {
        departmentId: [{ required: true, message: '请选择部门', trigger: 'change' }],
        sportYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        value: [{ type: 'array', required: true, message: '请选择类型', trigger: 'change' }],
        sportSalary: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportTraining: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportEntertain: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportOperating: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportRent: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportHydropower: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportMeal: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportAdministrative: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportFinance: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportTaxes: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportOther: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportEditor: [{ required: true, message: '请输入金额', trigger: 'change' }],
        sportPropaganda: [{ required: true, message: '请输入金额', trigger: 'change' }]
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
      tempTotal: 0,
      activityData: {
        activityYear: '',
        activityName: '',
        activityTime: '',
        activityLocation: '',
        activityOperatingUnit: '',
        activityEstimatedCost: '',
        activityActualCost: '',
        activityRemark: '',
        activityEditor: '测试员'
      },
      rules1: {
        activityYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        activityName: [{ required: true, message: '请输入赛事活动名称', trigger: 'change' }],
        activityTime: [{ required: true, message: '请输入赛事活动时间', trigger: 'change' }],
        activityLocation: [{ required: true, message: '请输入赛事活动地点', trigger: 'change' }],
        activityOperatingUnit: [{ required: true, message: '请输入赛事运营单位', trigger: 'change' }],
        activityEstimatedCost: [{ required: true, message: '请输入金额', trigger: 'change' }],
        activityActualCost: [{ required: true, message: '请输入金额', trigger: 'change' }]
      }
    }
  },
  computed: {
    totalCost () {
      // 费用合计
      let _this = this
      let arr = Object.values(this.sportData)
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
      this.sportData.sportEstimatedOrActual = val[0]
      this.sportData.sportQuarter = val[1] || '0'
    },
    validateData (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的sportData数据增减字段为formDate后提交
          let formData = _this.sportData
          formData.sportTotal = _this.tempTotal
          console.log(formData)
          // 提交确认框
          _this.$confirm('提交后将无法修改，确认提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 提交
            _this.submitForm('/insertSportForm', formData)
          }).catch(() => {
            console.log('cancel submit.')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    validateData1 (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的activityData数据增减字段为formDate后提交
          let formData = _this.activityData
          console.log(formData)
          // 提交确认框
          _this.$confirm('提交后将无法修改，确认提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 提交
            _this.submitForm('/insertActivityForm', formData)
          }).catch(() => {
            console.log('cancel submit.')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm (url, formDate) {
      let _this = this
      // 提交
      this.$axios.post(url, formDate)
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
            _this.$router.push({path: '/alloperation/sport'})
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
    }
  }
}
</script>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
