<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" size="mini">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="日期" prop="freight_date">
          <el-date-picker
            v-model="formData.freight_date" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收入/支出" prop="income_expenditure">
          <el-select v-model="formData.income_expenditure" placeholder="请选择">
            <el-option key="收入" label="收入" value="收入" />
              <el-option key="支出" label="支出" value="支出" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="费用类别" prop="freight_type">
          <!--<el-input v-model="formData.freight_type"></el-input>-->
          <el-autocomplete v-model="formData.freight_type" class="width-full" :fetch-suggestions="querySearch" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="项目名称" prop="project_id">
          <el-input v-model="formData.project_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车型">
          <el-input v-model="formData.car_length"></el-input>
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
          <el-input v-model="formData.basic_mileage"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际公里数">
          <el-input v-model="formData.actual_mileage"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单价(含税)" prop="freight_price_tax">
          <el-input v-model="formData.freight_price_tax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额(含税)">
          <el-input v-model="formData.freight_amount_tax" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="税率" prop="tax_rate">
          <el-input v-model="formData.tax_rate"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单价(不含税)" prop="freight_price">
          <el-input v-model="formData.freight_price"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额(不含税)">
          <el-input v-model="formData.freight_amount" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="税额">
          <el-input v-model="formData.tax" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="发票号">
          <el-input v-model="formData.receipt_number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客户/承运商"  prop="client_id">
          <el-input v-model="formData.client_id"></el-input>
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
  name: 'SaleFreight',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {},
      rules: {
        freight_date: [{ required: true, message: '不可为空' }],
        income_expenditure: [{ required: true, message: '不可为空' }],
        freight_type: [{ required: true, message: '不可为空' }],
        project_id: [{ required: true, message: '不可为空' }],
        frequency: [{ required: true, message: '不可为空' }],
        freight_price_tax: [{ required: true, message: '不可为空' }],
        tax_rate: [{ required: true, message: '不可为空' }],
        client_id: [{ required: true, message: '不可为空' }]
      },
      units: [{ value: '运输费' }, { value: '其他' }]
    }
  },
  watch: {
    baseData: {
      handler (val, old) {
        this.formData = Object.assign({}, val)
        // console.log(val, old)
        // if (val) {
        //   console.log('true')
        //   this.formData = Object.assign({}, val)
        // } else {
        //   this.formData = {}
        // }
      },
      deep: true
    },
    formData: {
      handler (val, old) {
        if (val.freight_price_tax && val.frequency) {
          this.formData.freight_amount_tax = this.$utils.multiply(val.freight_price_tax, val.frequency)
          this.formData.freight_amount = this.$utils.toFixedNumber(this.$utils.divide(this.formData.freight_amount_tax, this.$utils.add(1, this.$utils.divide(val.tax_rate, 100))), 2)
          this.formData.tax = this.$utils.toFixedNumber(this.$utils.multiply(this.formData.freight_amount, this.$utils.divide(val.tax_rate, 100)), 2)
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
    submitForm () {
      this.isEdit ? this.editItem() : this.addItem()
    },
    handleCancel (formName) {
      this.$refs[formName].resetFields()
      this.$emit('cancel')
    },
    addItem () {
      // add
      this.$emit('primary')
    },
    editItem () {
      // edit
      this.$emit('primary')
    }
  }
}
</script>

<style scoped>

</style>
