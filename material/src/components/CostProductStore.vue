<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="日期" prop="productInventoryDate">
          <el-date-picker
            v-model="formData.productInventoryDate" value-format="yyyy-MM" class="width-full"
            type="month" placeholder="选择日期" :editable="false" :clearable="false" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="产品大类" prop="productCategoryId">
          <el-select v-model="formData.productCategoryId" placeholder="请选择">
            <el-option v-for="item in productTypes" :key="item.productCategoryId" :label="item.productCategory +' / '+ item.specificProductName +' / '+ item.specificSpecification" :value="item.productCategoryId"/>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">上期库存</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="块数">
          <el-input v-model="formData.blockPast"><template slot="append">块</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="面积">
          <el-input v-model="formData.areaPast"><template slot="append">㎡</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.amountPast"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">本期入库</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="块数">
          <el-input v-model="formData.blockCurrent"><template slot="append">块</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="面积">
          <el-input v-model="formData.areaCurrent"><template slot="append">㎡</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="成本单价">
          <el-input v-model="formData.priceCurrent"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.amountCurrent"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">本期销售</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="块数">
          <el-input v-model="formData.blockSale"><template slot="append">块</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="面积">
          <el-input v-model="formData.areaSale"><template slot="append">㎡</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="成本单价">
          <el-input v-model="formData.priceSale"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.amountSale"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">本期累计库存</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="块数">
          <el-input v-model="formData.blockInventory"><template slot="append">块</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="面积">
          <el-input v-model="formData.areaInventory"><template slot="append">㎡</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.amountInventory"><template slot="append">元</template></el-input>
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
  name: 'CostProductStore',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {},
      productTypes: [],
      unClick: false,
      rules: {
        productInventoryDate: [{ required: true, message: '不可为空' }],
        productCategoryId: [{ required: true, message: '不可为空' }],
        equipmentName: [{ required: true, message: '不可为空' }],
        detectPayment: [{ required: true, message: '不可为空' }]
      }
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
        if (val.areaCurrent && val.priceCurrent) {
          this.formData.amountCurrent = this.$utils.multiply(val.areaCurrent, val.priceCurrent).toFixed(2)
        }
        if (val.areaSale && val.priceSale) {
          this.formData.amountSale = this.$utils.multiply(val.areaSale, val.priceSale).toFixed(2)
        }
        if (val.amountPast || val.amountCurrent || val.amountSale) {
          this.formData.amountInventory = this.$utils.subtract(this.$utils.add(val.amountPast, val.amountCurrent), val.amountSale).toFixed(2)
        }
        if (val.blockPast || val.blockCurrent || val.blockSale) {
          this.formData.blockInventory = this.$utils.subtract(this.$utils.add(val.blockPast, val.blockCurrent), val.blockSale)
        }
        if (val.areaPast || val.areaCurrent || val.areaSale) {
          this.formData.areaInventory = this.$utils.subtract(this.$utils.add(val.areaPast, val.areaCurrent), val.areaSale).toFixed(3)
        }
      },
      deep: true
    }
  },
  created () {
    this.getBase()
  },
  methods: {
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
      this.$api.cost.addProductStoreItem(this.formData).then(rsp => {
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
      this.$api.cost.getProductCate().then(rsp => {
        this.productTypes = rsp.data
      })
    }
  }
}
</script>

<style scoped>

</style>
