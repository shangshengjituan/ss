<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="日期" prop="saleDate">
          <el-date-picker
            v-model="formData.saleDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="项目名称" prop="projectId">
          <el-select v-model="formData.projectId" placeholder="请选择项目">
            <el-option v-for="item in projects" :key="item.projectId" :label="item.projectName" :value="item.projectId" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="规格" prop="commodity">
          <el-cascader v-model="formData.commodity" :options="commodities" :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位" prop="unit">
          <el-autocomplete v-model="formData.unit" class="width-full" :fetch-suggestions="querySearch" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数量" prop="saleQuantity">
          <el-input-number v-model="formData.saleQuantity" controls-position="right" :min="0" class="width-full"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="面积" prop="saleArea">
          <el-input v-model="formData.saleArea"><template slot="append">㎡</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="销售单价" prop="salePrice">
          <el-input v-model="formData.salePrice"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额(含税)">
          <el-input v-model="formData.saleAmountTax" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="金额(不含税)">
          <el-input v-model="formData.saleAmount" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="税额">
          <el-input v-model="formData.tax" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否回款">
          <el-input v-model="formData.hitMoney"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="已开发票号">
          <el-input v-model="formData.receiptNumber"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客户"  prop="clientId">
          <el-select v-model="formData.clientId" placeholder="请选择客户">
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
      <el-button type="primary" @click="submitForm('form')">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SaleSale',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: Object.assign({}, this.baseData),
      rules: {
        saleDate: [{ required: true, message: '不可为空' }],
        projectId: [{ required: true, message: '不可为空' }],
        commodity: [{ required: true, message: '不可为空' }],
        unit: [{ required: true, message: '不可为空' }],
        saleQuantity: [{ required: true, message: '不可为空' }],
        saleArea: [{ required: true, message: '不可为空' }],
        salePrice: [{ required: true, message: '不可为空' }],
        saleAmountTax: [{ required: true, message: '不可为空' }],
        saleAmount: [{ required: true, message: '不可为空' }],
        tax: [{ required: true, message: '不可为空' }],
        clientId: [{ required: true, message: '不可为空' }]
      },
      units: [{ value: '块' }, { value: '个' }],
      projects: [],
      commodities: [],
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
        if (val.saleArea && val.salePrice) {
          this.formData.saleAmountTax = this.$utils.multiply(val.saleArea, val.salePrice)
          this.formData.saleAmount = this.$utils.toFixedNumber(this.$utils.divide(this.formData.saleAmountTax, 1.13), 2)
          this.formData.tax = this.$utils.subtract(this.formData.saleAmountTax, this.formData.saleAmount)
        }
        if (val.commodity) {
          val.commodityId = val.commodity[1]
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
      console.log('add')
      this.$api.sale.addSale(this.formData).then(rsp => {
        console.log(rsp)
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
      this.$api.sale.getProjects().then(rsp => {
        this.projects = rsp.data
      })
      this.$api.sale.getCommodities().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.commodityName,
            value: item.index,
            children: []
          })
          if (item.commoditySizeLists) {
            item.commoditySizeLists.forEach(it => {
              temp[index].children.push({
                label: it.commoditySize,
                value: it.commodityId
              })
            })
          }
        })
        this.commodities = temp
      })
      this.$api.sale.getClients().then(rsp => {
        this.clients = rsp.data
      })
    }
  }
}
</script>

<style>
  .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
