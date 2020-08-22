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
    <div v-show="showForm">
      <p class="text-divider">上期库存</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="块数">
            <el-input v-model="formData.blockPast" readonly><template slot="append">块</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="面积">
            <el-input v-model="formData.areaPast" readonly><template slot="append">㎡</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金额">
            <el-input v-model="formData.amountPast" readonly><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="text-divider">本期入库</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="块数">
            <el-input v-model="formData.blockCurrent" readonly><template slot="append">块</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="面积">
            <el-input v-model="formData.areaCurrent" readonly><template slot="append">㎡</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成本单价">
            <el-input v-model="formData.priceCurrent"><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金额">
            <el-input v-model="formData.amountCurrent" readonly><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="text-divider">本期销售</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="块数">
            <el-input v-model="formData.blockSale" readonly><template slot="append">块</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="面积">
            <el-input v-model="formData.areaSale" readonly><template slot="append">㎡</template></el-input>
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
            <el-input v-model="formData.blockInventory" readonly><template slot="append">块</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="面积">
            <el-input v-model="formData.areaInventory" readonly><template slot="append">㎡</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金额">
            <el-input v-model="formData.amountInventory" readonly><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
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
      formData: Object.assign({}, this.baseData),
      extraData: {},
      showForm: false,
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
        if (val.productInventoryDate && val.productCategoryId) {
          this.getPre({ productInventoryDate: val.productInventoryDate, productCategoryId: val.productCategoryId })
        }
        if (val.priceCurrent) {
          this.formData.amountCurrent = this.$utils.multiply(val.areaCurrent, val.priceCurrent).toFixed(2)
        }
        if (val.priceSale) {
          this.formData.amountSale = this.$utils.multiply(val.areaSale, val.priceSale).toFixed(2)
        }
        if (val.amountCurrent && val.amountSale) {
          this.formData.amountInventory = this.$utils.subtract(this.$utils.add(val.amountPast, val.amountCurrent), val.amountSale).toFixed(2)
        }
        if (!!val !== !!old) {
          this.showForm = !val
        }
        // this.showForm = !val
      },
      deep: true
    }
  },
  created () {
    this.getBase()
  },
  methods: {
    getPre (data) {
      this.$api.cost.getProductStorePre(data).then(rsp => {
        if (!rsp.data) {
          this.formData = {}
          // this.formData = Object.assign({ productInventoryDate: this.formData.productInventoryDate, productCategoryId: this.formData.productCategoryId }, {})
          this.$message({ type: 'error', message: '该月暂无库存、生产、销售数据', duration: 1000 })
          return
        }
        rsp.data.blockInventory = this.$utils.subtract(this.$utils.add(rsp.data.blockPast, rsp.data.blockCurrent), rsp.data.blockSale).toFixed(2)
        rsp.data.areaInventory = this.$utils.subtract(this.$utils.add(rsp.data.areaPast, rsp.data.areaCurrent), rsp.data.areaSale).toFixed(2)
        Object.assign(this.formData, rsp.data)
        console.log('1111')
        console.log(this.formData)
        this.showForm = true
        // this.extraData = rsp.data
        // setTimeout(function () {
        //   console.log('11111')
        //   Object.assign(this.formData, this.extraData)
        // }, 1)
      })
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
      this.$api.cost.addProductStoreItem(this.formData).then(rsp => {
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
