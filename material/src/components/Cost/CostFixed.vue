<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="120px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="项目" prop="projectName">
          <el-select v-model="formData.projectName" placeholder="请选择">
            <el-option key="机械设备" label="机械设备" value="机械设备"></el-option>
            <el-option key="专业分包" label="专业分包" value="专业分包"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="用途" prop="materialUseId">
          <el-select v-model="formData.materialUseId" size="small" placeholder="请选择">
            <el-option v-for="item in uses" :key="item.materialUseId" :label="item.materialUseSort+'-'+item.materialUseDetail" :value="item.materialUseId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="日期" prop="fixAssetDate">
          <el-date-picker
            v-model="formData.fixAssetDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="供应商">
          <el-input v-model="formData.beneficiary" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="品名/作业项目">
          <el-input v-model="formData.equipmentName" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="单位">
          <el-input v-model="formData.fixAssetUnit"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="合同金额">
          <el-input v-model="formData.contractAmount"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">本月投入（含税）</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="数量">
          <el-input v-model="formData.fixAssetQuantity"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.amountTax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">本月投入（不含税）</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.amount"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="税率">
          <el-input v-model="formData.taxRate"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="税额">
          <el-input v-model="formData.tax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
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
  name: 'CostFixed',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: Object.assign({}, this.baseData),
      unClick: false,
      rules: {
        projectName: [{ required: true, message: '不可为空' }],
        materialUseId: [{ required: true, message: '不可为空' }],
        fixAssetDate: [{ required: true, message: '不可为空' }],
        beneficiary: [{ required: true, message: '不可为空' }],
        equipmentName: [{ required: true, message: '不可为空' }]
      },
      uses: []
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
        this.formData.tax = this.$utils.multiply(val.amount, this.$utils.divide(val.taxRate, 100)).toFixed(2)
      },
      deep: true
    }
  },
  created () {
    this.$api.cost.getMaterialUses().then(rsp => {
      this.uses = rsp.data
    })
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
      this.$api.cost.addFixedItem(this.formData).then(rsp => {
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
    }
  }
}
</script>

<style scoped>

</style>
