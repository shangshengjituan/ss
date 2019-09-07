<template>
  <div class="demo-sportData">
    <h4>文化板块各单位运营成本明细统计表</h4>
    <el-form :model="sportData" :rules="rules" ref="sportData" label-width="110px" label-position="left" >
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
            <el-input v-model="sportData.sportSalary" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培训费" prop="sportTraining">
            <el-input v-model="sportData.sportTraining" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招待费" prop="sportEntertain">
            <el-input v-model="sportData.sportEntertain" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经营费" prop="sportOperating">
            <el-input v-model="sportData.sportOperating" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房租费" prop="sportRent">
            <el-input v-model="sportData.sportRent" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="水电费" prop="sportHydropower">
            <el-input v-model="sportData.sportHydropower" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="伙食费" prop="sportMeal">
            <el-input v-model="sportData.sportMeal" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政费用" prop="sportAdministrative">
            <el-input v-model="sportData.sportAdministrative" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="财务费用" prop="sportFinance">
            <el-input v-model="sportData.sportFinance" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="各类税费" prop="sportTaxes">
            <el-input v-model="sportData.sportTaxes" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="宣传费用" prop="sportPropaganda">
            <el-input v-model="sportData.sportPropaganda" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他费用" prop="sportOther">
            <el-input v-model="sportData.sportOther" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="费用合计" prop="sportTotal">
            <el-input v-model="sportData.sportTotal" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人" prop="sportEditor">
            <el-input v-model="sportData.sportEditor" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制日期" prop="sportEditorDate">
            <el-input v-model="sportData.sportEditorDate" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input v-model="sportData.sportRemark" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('sportData')">立即创建</el-button>
        <el-button @click="resetForm('sportData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddSport',
  data () {
    return {
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
        sportTotal: '',
        sportEditor: '',
        sportEditorDate: '',
        value: [] // 提交时删除
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
        sportTotal: [{ required: true, message: '请输入金额', trigger: 'change' }],
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
      }]
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
      this.sportData.sportEstimatedOrActual = val[0]
      this.sportData.sportQuarter = val[1]
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .demo-sportData {
    padding: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
