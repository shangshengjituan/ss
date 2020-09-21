<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="日期" prop="freightDate">
          <el-date-picker
            v-model="formData.freightDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收入/支出" prop="incomeExpenditure">
          <el-select v-model="formData.incomeExpenditure" placeholder="请选择" class="width-full">
            <el-option key="收入" label="收入" value="收入" />
              <el-option key="支出" label="支出" value="支出" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="费用类别" prop="freightType">
          <!--<el-input v-model="formData.freightType"></el-input>-->
          <el-autocomplete v-model="formData.freightType" class="width-full" :fetch-suggestions="querySearch" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="项目名称" prop="projectId">
          <el-select v-model="formData.projectId" placeholder="请选择项目" class="width-full">
            <el-option v-for="item in projects" :key="item.projectId" :label="item.projectName" :value="item.projectId" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车型">
          <el-input v-model="formData.carLength"><template slot="append">米</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="趟次" prop="frequency">
          <el-input-number v-model="formData.frequency" controls-position="right" :min="0" class="width-full"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="基本公里数">
          <el-input v-model="formData.basicMileage"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际公里数">
          <el-input v-model="formData.actualMileage"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单价(含税)" prop="freightPriceTax">
          <el-input v-model="formData.freightPriceTax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="税率" prop="taxRate">
          <el-input v-model="formData.taxRate"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额(含税)">
          <el-input v-model="formData.freightAmountTax" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单价(不含税)" prop="freightPrice">
          <el-input v-model="formData.freightPrice"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="税额">
          <el-input v-model="formData.tax" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额(不含税)">
          <el-input v-model="formData.freightAmount" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="发票号">
          <el-input v-model="formData.receiptNumber"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客户/承运商"  prop="clientId">
          <el-select v-model="formData.clientId" placeholder="请选择" class="width-full">
            <el-option v-for="item in clients" :key="item.clientId" :label="item.clientName" :value="item.clientId" />
          </el-select>
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
      <el-button type="primary" @click="submitForm('form')" :disabled="unClick">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SaleFreight',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: Object.assign({}, this.baseData),
      rules: {
        freightDate: [{ required: true, message: '不可为空' }],
        incomeExpenditure: [{ required: true, message: '不可为空' }],
        freightType: [{ required: true, message: '不可为空' }],
        projectId: [{ required: true, message: '不可为空' }],
        frequency: [{ required: true, message: '不可为空' }],
        freightPriceTax: [{ required: true, message: '不可为空' }],
        taxRate: [{ required: true, message: '不可为空' }],
        clientId: [{ required: true, message: '不可为空' }]
      },
      unClick: false,
      units: [{ value: '运输费' }, { value: '其他' }],
      projects: [],
      clients: []
    }
  },
  created () {
    this.getBase()
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
        if (val.freightPriceTax && val.frequency) {
          this.formData.freightAmountTax = this.$utils.multiply(val.freightPriceTax, val.frequency)
          this.formData.freightAmount = this.$utils.divide(this.formData.freightAmountTax, this.$utils.add(1, this.$utils.divide(val.taxRate, 100))).toFixed(2)
          this.formData.tax = this.$utils.multiply(this.formData.freightAmount, this.$utils.divide(val.taxRate, 100)).toFixed(2)
        }
      },
      deep: true
    }
  },
  methods: {
    querySearch (queryString, cb) {
      const units = this.units
      const results = queryString ? units.filter(this.createFilter(queryString)) : units
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (item) => {
        return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
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
      // add
      console.log('add')
      this.unClick = true
      this.$api.sale.addFreight(this.formData).then(rsp => {
        console.log(rsp)
        this.unClick = false
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '新增成功!', duration: 1000 })
          this.$emit('primary')
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      }).catch(err => {
        this.unClick = false
        this.$message({ type: 'error', message: err })
      })
    },
    editItem () {
      // edit
      this.$emit('primary')
    },
    getBase () {
      this.$api.sale.getProjects().then(rsp => {
        this.projects = rsp.data
      })
      this.$api.sale.getClients().then(rsp => {
        this.clients = rsp.data
      })
    }
  }
}
</script>

<style scoped>

</style>
