<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="日期" prop="materialStatisticDate">
          <el-date-picker
            v-model="formData.materialStatisticDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="采购/领用" prop="purchaseUserId">
          <el-select v-model="formData.purchaseUserId" placeholder="请选择">
            <el-option v-for="item in kinds" :key="item.purchaseUserId" :label="item.purchaseUser" :value="item.purchaseUserId" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="材料类别" prop="material">
          <el-cascader v-model="formData.material" :options="materialTypes" :props="{ expandTrigger: 'hover' }" class="width-full"></el-cascader>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单位" prop="materialUnit">
          <el-autocomplete v-model="formData.materialUnit" class="width-full" :fetch-suggestions="querySearch" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数量" prop="materialQuantity">
          <el-input-number v-model="formData.materialQuantity" controls-position="right" :min="0" class="width-full"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单价(含税)" prop="materialPriceTax">
          <el-input v-model="formData.materialPriceTax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额(含税)">
          <el-input v-model="formData.materialAmountTax" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="税率" prop="taxRate">
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
          <el-input v-model="formData.materialAmount" readonly><template slot="append">元</template></el-input>
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
          <el-input v-model="formData.materialUser"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发票号">
          <el-input v-model="formData.receiptNumber"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="供应商"  prop="supplierId">
          <el-select v-model="formData.supplierId" placeholder="请选择">
            <el-option v-for="item in providers" :key="item.supplierId" :label="item.supplier" :value="item.supplierId" />
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
        materialStatisticDate: [{ required: true, message: '不可为空' }],
        purchaseUserId: [{ required: true, message: '不可为空' }],
        material: [{ required: true, message: '不可为空' }],
        materialUnit: [{ required: true, message: '不可为空' }],
        materialQuantity: [{ required: true, message: '不可为空' }],
        materialPriceTax: [{ required: true, message: '不可为空' }],
        taxRate: [{ required: true, message: '不可为空' }],
        supplierId: [{ required: true, message: '不可为空' }]
      },
      units: [{ value: '吨' }, { value: 'kg' }, { value: '片' }],
      materialTypes: [],
      kinds: [],
      providers: []
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
          this.formData.materialAmount = this.$utils.toFixedNumber(this.$utils.divide(this.formData.materialAmountTax, this.$utils.add(1, this.$utils.divide(val.taxRate, 100))), 2)
          this.formData.tax = this.$utils.toFixedNumber(this.$utils.multiply(this.formData.materialAmount, this.$utils.divide(val.taxRate, 100)), 2)
          this.formData.materialPrice = this.$utils.divide(this.formData.materialAmount, val.materialQuantity)
        }
        if (val.material) {
          val.materialId = val.material[1]
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
      this.$api.material.addItem(this.formData).then(rsp => {
        console.log(rsp)
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '新增成功!' })
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
      this.$api.material.getMaterialType().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.rawMaterialCategory,
            value: item.index,
            children: []
          })
          if (item.specificProductNameList) {
            item.specificProductNameList.forEach(it => {
              temp[index].children.push({
                label: it.specificProductName,
                value: it.materialId
              })
            })
          }
        })
        this.materialTypes = temp
      })
      this.$api.material.getKinds().then(rsp => {
        this.kinds = rsp.data
      })
      this.$api.material.getProviders().then(rsp => {
        this.providers = rsp.data
      })
    }
  }
}
</script>

<style scoped>

</style>
