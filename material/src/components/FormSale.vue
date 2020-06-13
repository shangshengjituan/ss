<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="日期" prop="sale_date">
          <el-date-picker
            v-model="formData.sale_date" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="项目名称" prop="project_id">
          <el-input v-model="formData.project_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="品名" prop="freight_id">
          <el-input v-model="formData.freight_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="规格" prop="freight_id">
          <el-input v-model="formData.freight_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位" prop="unit">
          <el-autocomplete v-model="formData.unit" class="width-full" :fetch-suggestions="querySearch"></el-autocomplete>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数量" prop="sale_quantity">
          <el-input-number v-model="formData.sale_quantity" :min="0" class="width-full"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="面积（㎡）" prop="sale_area">
          <el-input v-model="formData.sale_area"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="销售单价" prop="sale_price">
          <el-input v-model="formData.sale_price"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额(含税)">
          <el-input v-model="formData.sale_amount_tax" readonly></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="金额(不含税)">
          <el-input v-model="formData.sale_amount" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="税额">
          <el-input v-model="formData.tax" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否回款">
          <el-input v-model="formData.hit_money"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="已开发票号">
          <el-input v-model="formData.receipt_number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客户"  prop="client_id">
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
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="submitForm('form')">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'FormSale',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {
        sale_date: null,
        project_id: null,
        freight_id: null,
        unit: null,
        sale_quantity: null,
        sale_area: null,
        sale_price: null,
        sale_amount_tax: null,
        sale_amount: null,
        tax: null,
        hit_money: null,
        receipt_number: null,
        client_id: null,
        remark: null
      },
      rules: {
        sale_date: [{ required: true, message: '请输入名称' }],
        project_id: [{ required: true, message: '请输入名称' }],
        freight_id: [{ required: true, message: '请输入名称' }],
        unit: [{ required: true, message: '请输入名称' }],
        sale_quantity: [{ required: true, message: '请输入名称' }],
        sale_area: [{ required: true, message: '请输入名称' }],
        sale_price: [{ required: true, message: '请输入名称' }],
        sale_amount_tax: [{ required: true, message: '请输入名称' }],
        sale_amount: [{ required: true, message: '请输入名称' }],
        tax: [{ required: true, message: '请输入名称' }],
        client_id: [{ required: true, message: '请输入名称' }]
      },
      units: [{ value: '块' }, { value: '个' }]
    }
  },
  watch: {
    baseData: {
      handler (val, old) {
        console.log(val, old)
        if (val) {
          console.log('true')
          this.formData = Object.assign({}, val)
        } else {
          this.formData = {}
        }
      },
      deep: true
    },
    formData: {
      handler (val, old) {
        if (val.sale_area && val.sale_price) {
          this.formData.sale_amount_tax = this.$utils.multiply(val.sale_area, val.sale_price)
          this.formData.sale_amount = this.$utils.toFixedNumber(this.$utils.divide(this.formData.sale_amount_tax, 1.13), 2)
          this.formData.tax = this.$utils.subtract(this.formData.sale_amount_tax, this.formData.sale_amount)
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
    handleCancel () {
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
