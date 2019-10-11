<template>
  <el-form :model="buildingData" :rules="rules" ref="buildingData" label-width="110px" label-position="right" @validate="handleSum">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单位名称" prop="departmentId">
          <el-input v-model="buildingData.departmentName" :readonly="true"></el-input>
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
        <el-form-item label="明细类型">
          <el-input v-model="buildingData.buildingType" :readonly="true"></el-input>
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
          <span>{{tempTotal}} 元</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="编制人">
          <span>{{buildingData.buildingEditor}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('buildingData')">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'BuildingForm',
  props: {
    formData: {
      type: Object
    }
  },
  data () {
    return {
      buildingData: this.formData,
      rules: {
        buildingYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        buildingSalary: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingAdministrative: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingFixedAssets: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingTraining: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingTechnology: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingEntertain: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingOperating: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingFinance: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingTaxes: [{ required: true, message: '请输入金额', trigger: 'change' }],
        buildingOther: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      value: [],
      options: this.$store.getters.addType, // 预估实际季度选择
      tempTotal: this.formData.buildingTotal.toString().replace(/\B(?=(\d{3})+$)/g, ' , ')
    }
  },
  methods: {
    // 合计
    handleSum () {
      let total = this.buildingData.buildingSalary + this.buildingData.buildingAdministrative + this.buildingData.buildingFixedAssets +
        this.buildingData.buildingTraining + this.buildingData.buildingTechnology + this.buildingData.buildingEntertain +
        this.buildingData.buildingOperating + this.buildingData.buildingFinance + this.buildingData.buildingTaxes +
        this.buildingData.buildingOther
      console.log(total)
      this.buildingData.buildingTotal = total
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
          // 将验证后的buildingData数据增减字段为buildingData后提交
          console.log(JSON.stringify(this.buildingData))
          this.$emit('confirm', this.buildingData)
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
