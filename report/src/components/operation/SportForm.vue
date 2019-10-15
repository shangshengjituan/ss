<template>
  <el-form :model="sportData" :rules="rules" ref="sportData" label-width="110px" label-position="right" @validate="handleSum">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单位名称">
          <span>{{sportData.departmentName}}</span>
          <!--<el-input v-model="sportData.departmentName" :readonly="true"></el-input>-->
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
          <span>{{sportData.sportType}}</span>
          <!--<el-input v-model="sportData.sportType" :readonly="true"></el-input>-->
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
          <span>{{tempTotal}} 元</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="编制人">
          <span>{{sportData.sportEditor}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('sportData')">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SportForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.sportData = newValue
      },
      deep: true
    }
  },
  data () {
    return {
      sportData: this.formData,
      rules: {
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
        sportPropaganda: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      tempTotal: this.formData.sportTotal.toString().replace(/\B(?=(\d{3})+$)/g, ' , ')
    }
  },
  methods: {
    // 合计
    handleSum () {
      let total = this.sportData.sportSalary + this.sportData.sportTraining + this.sportData.sportEntertain +
        this.sportData.sportOperating + this.sportData.sportRent + this.sportData.sportHydropower +
        this.sportData.sportMeal + this.sportData.sportAdministrative + this.sportData.sportFinance +
        this.sportData.sportTaxes + this.sportData.sportOther + this.sportData.sportPropaganda
      console.log(total)
      this.sportData.sportTotal = total
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
          // 将验证后的buildingData数据增减字段为sportData后提交
          console.log(JSON.stringify(this.sportData))
          this.$emit('confirm', this.sportData)
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
