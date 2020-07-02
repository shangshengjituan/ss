<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="日期" prop="officeDate">
          <el-date-picker
            v-model="formData.officeDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="类别" prop="category">
          <el-select v-model="formData.category" placeholder="请选择" class="width-full">
            <el-option key="集团领用" label="集团领用" value="集团领用" />
            <el-option key="公司采购" label="公司采购" value="公司采购" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="名称">
          <el-input v-model="formData.officeSupplies" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="单位">
          <el-autocomplete v-model="formData.officeUnit" class="width-full" :fetch-suggestions="querySearch" />
          <!--<el-input v-model="formData.officeQuantity" />-->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="数量">
          <el-input v-model="formData.officeQuantity" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="单价">
          <el-input v-model="formData.officePrice"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="总价" prop="officeAmount">
          <el-input v-model="formData.officeAmount"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="发票号">
          <el-input v-model="formData.receiptNumber" />
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
  name: 'RearOffice',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {},
      rules: {
        officeDate: [{ required: true, message: '不可为空' }],
        category: [{ required: true, message: '不可为空' }],
        officeAmount: [{ required: true, message: '不可为空' }]
      },
      units: [{ value: '包' }, { value: '个' }, { value: '本' }, { value: '盒' }, { value: '把' }, { value: '支' }]
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
        if (val.officePrice && val.officeQuantity) {
          this.formData.officeAmount = this.$utils.toFixedNumber(this.$utils.multiply(val.officePrice, val.officeQuantity), 2)
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
      this.$api.rear.addOfficeItem(this.formData).then(rsp => {
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
    }
  }
}
</script>

<style scoped>

</style>
