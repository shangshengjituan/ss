<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" size="mini">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="日期" prop="material_statistic_date">
          <el-date-picker
            v-model="formData.material_statistic_date" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="采购/领用" prop="purchase_user_id">
          <el-select v-model="formData.purchase_user_id" placeholder="请选择">
            <el-option key="采购" label="采购" value="采购" />
            <el-option key="领用" label="领用" value="领用" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="材料类别" prop="material_id">
          <!--<el-input v-model="formData.material_id"></el-input>-->
          <el-autocomplete v-model="formData.material_id" class="width-full" :fetch-suggestions="querySearch" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单位" prop="material_unit">
          <el-autocomplete v-model="formData.material_unit" class="width-full" :fetch-suggestions="querySearch" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数量" prop="material_quantity">
          <el-input-number v-model="formData.material_quantity" controls-position="right" :min="0" class="width-full"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单价(含税)" prop="material_price_tax">
          <el-input v-model="formData.material_price_tax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额(含税)">
          <el-input v-model="formData.material_amount_tax" readonly><template slot="append">元</template></el-input>
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
        <el-form-item label="单价(不含税)" prop="material_price">
          <el-input v-model="formData.material_price"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额(不含税)">
          <el-input v-model="formData.material_amount" readonly><template slot="append">元</template></el-input>
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
        <el-form-item label="用途">
          <el-input v-model="formData.material_user"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发票号">
          <el-input v-model="formData.receipt_number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="供应商"  prop="supplier_id">
          <el-input v-model="formData.supplier_id"></el-input>
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
  name: 'MaterialMaterial',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {},
      rules: {
        material_statistic_date: [{ required: true, message: '不可为空' }],
        purchase_user_id: [{ required: true, message: '不可为空' }],
        material_id: [{ required: true, message: '不可为空' }],
        material_unit: [{ required: true, message: '不可为空' }],
        material_quantity: [{ required: true, message: '不可为空' }],
        material_price_tax: [{ required: true, message: '不可为空' }],
        tax_rate: [{ required: true, message: '不可为空' }],
        supplier_id: [{ required: true, message: '不可为空' }]
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
        if (val.material_price_tax && val.material_quantity) {
          this.formData.material_amount_tax = this.$utils.multiply(val.material_price_tax, val.material_quantity)
          this.formData.material_amount = this.$utils.toFixedNumber(this.$utils.divide(this.formData.material_amount_tax, this.$utils.add(1, this.$utils.divide(val.tax_rate, 100))), 2)
          this.formData.tax = this.$utils.toFixedNumber(this.$utils.multiply(this.formData.material_amount, this.$utils.divide(val.tax_rate, 100)), 2)
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
