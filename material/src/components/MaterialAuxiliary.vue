<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="日期" prop="auxiliaryMaterialDate">
          <el-date-picker
            v-model="formData.auxiliaryMaterialDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="品名" prop="auxiliaryMaterialName">
          <el-input v-model="formData.auxiliaryMaterialName" />
          <!--<el-cascader v-model="formData.auxiliaryMaterialName" :options="materialTypes" :props="{ expandTrigger: 'hover' }" class="width-full"></el-cascader>-->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单位">
          <el-autocomplete v-model="formData.auxiliaryMaterialUnit" class="width-full" :fetch-suggestions="querySearch" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数量">
          <el-input-number v-model="formData.materialQuantity" controls-position="right" :min="0" class="width-full"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单价(含税)">
          <el-input v-model="formData.materialPriceTax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额(含税)">
          <el-input v-model="formData.materialAmountTax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="税率">
          <el-input v-model="formData.taxRate"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单价(不含税)">
          <el-input v-model="formData.materialPrice"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额(不含税)">
          <el-input v-model="formData.materialAmount"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="税额">
          <el-input v-model="formData.tax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="用途" prop="use">
          <el-cascader v-model="formData.use" :options="usages" :props="{ expandTrigger: 'hover' }" class="width-full"></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发票号">
          <el-input v-model="formData.receiptNumber"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="供应商"  prop="supplierName">
          <el-autocomplete v-model="formData.supplierName" class="width-full" :fetch-suggestions="querySearch1" />
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
  name: 'MaterialAuxiliary',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {},
      rules: {
        auxiliaryMaterialDate: [{ required: true, message: '不可为空' }],
        auxiliaryMaterialName: [{ required: true, message: '不可为空' }],
        use: [{ required: true, message: '不可为空' }],
        supplierName: [{ required: true, message: '不可为空' }]
      },
      unClick: false,
      usages: [],
      units: [{ value: '只' }, { value: '台' }, { value: '条' }, { value: '把' }, { value: '支' }, { value: '根' }],
      supplier: [{ value: '零星采购' }, { value: '南京珏德新材料科技有限公司' }]
    }
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
        if (val.materialPriceTax && val.materialQuantity) {
          this.formData.materialAmountTax = this.$utils.multiply(val.materialPriceTax, val.materialQuantity)
          this.formData.materialAmount = this.$utils.divide(this.formData.materialAmountTax, this.$utils.add(1, this.$utils.divide(val.taxRate, 100))).toFixed(2)
          this.formData.tax = this.$utils.multiply(this.formData.materialAmount, this.$utils.divide(val.taxRate, 100)).toFixed(2)
          this.formData.materialPrice = this.$utils.divide(this.formData.materialAmount, val.materialQuantity)
        }
        this.formData.materialAmount = this.$utils.divide(this.formData.materialAmountTax, this.$utils.add(1, this.$utils.divide(val.taxRate, 100))).toFixed(2)
        if (val.use) {
          val.useId = val.use[1]
        }
      },
      deep: true
    }
  },
  created () {
    this.getBase()
  },
  methods: {
    querySearch (queryString, cb) {
      const units = this.units
      const results = queryString ? units.filter(this.createFilter(queryString)) : units
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearch1 (queryString, cb) {
      const units = this.supplier
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
      console.log('add')
      this.unClick = true
      this.$api.material.addAuxiliaryItem(this.formData).then(rsp => {
        console.log(rsp)
        this.unClick = false
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '新增成功!', duration: 1000 })
          this.$emit('primary')
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      })
    },
    editItem () {
      this.$emit('primary')
    },
    getBase () {
      this.$api.material.getUseList().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.useSort,
            value: item.useSort,
            children: []
          })
          if (item.detailList) {
            item.detailList.forEach(it => {
              temp[index].children.push({
                label: it.useDetail,
                value: it.useId
              })
            })
          }
        })
        this.usages = temp
      })
    }
  }
}
</script>

<style scoped>

</style>
