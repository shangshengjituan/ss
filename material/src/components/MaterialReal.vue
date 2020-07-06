<template>
  <div>
    <el-form :model="selectData" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="日期" prop="materialStatisticDate">
            <el-date-picker
              v-model="selectData.materialStatisticDate" value-format="yyyy-MM" class="width-full"
              type="month" placeholder="选择月份" :editable="false" :clearable="false"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="材料类别">
            <el-cascader v-model="selectData.materialId" :options="materialTypes" :props="{ expandTrigger: 'hover' }" class="width-full"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="subtotalData && Object.keys(subtotalData).length > 0">
      <p class="text-divider">本期领用小计：</p>
      <el-form :model="subtotalData" label-width="100px" >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="数量">
              <el-input v-model="subtotalData.materialQuantity" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="金额(含税)">
              <el-input v-model="subtotalData.materialAmountTax" readonly><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="金额(不含税)">
              <el-input v-model="subtotalData.materialAmount" readonly><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="税额">
              <el-input v-model="subtotalData.tax" readonly><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p style="margin-bottom: 22px">实际量与本期领用是否相同： <el-radio-group v-model="showReal">
        <el-radio :label="true">相同</el-radio>
        <el-radio :label="false">不相同</el-radio>
      </el-radio-group>
        <!--<el-switch v-model="showReal" active-text="相同" inactive-text="不相同" style="margin-left: 40px" />-->
      </p>
    </div>
    <div v-else style="text-align: center">
      {{msg}}
    </div>
    <div v-show="!showReal && subtotalData && Object.keys(subtotalData).length > 0">
      <p class="text-divider">本期实际量：</p>
      <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
        <el-input v-model="subtotalData.inventoryDate" style="display: none"></el-input>
        <el-input v-model="subtotalData.inventoryType" style="display: none"></el-input>
        <el-input v-model="subtotalData.materialId" style="display: none"></el-input>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="数量" prop="materialQuantity">
              <el-input v-model="formData.materialQuantity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="金额(含税)" prop="materialAmountTax">
              <el-input v-model="formData.materialAmountTax"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="金额(不含税)" prop="materialAmount">
              <el-input v-model="formData.materialAmount"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="税额" prop="tax">
              <el-input v-model="formData.tax"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-if="subtotalData && Object.keys(subtotalData).length > 0" class="button-group">
      <el-button size="medium" @click="handleCancel('form')">取消</el-button>
      <el-button size="medium" type="primary" @click="submitForm('form')">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaterialReal',
  data () {
    return {
      selectData: {
        materialStatisticDate: '',
        materialId: ''
      },
      subtotalData: {},
      showReal: true,
      formData: {},
      msg: '暂无数据',
      rules: {
        materialQuantity: [{ required: true, message: '不可为空' }],
        materialAmountTax: [{ required: true, message: '不可为空' }],
        materialAmount: [{ required: true, message: '不可为空' }],
        tax: [{ required: true, message: '不可为空' }]
      },
      materialTypes: []
    }
  },
  created () {
    this.getBase()
  },
  watch: {
    selectData: {
      handler (val, old) {
        if (!val.materialStatisticDate || !val.materialId) {
          this.msg = '暂无数据'
          this.showReal = true
        }
        if (val.materialStatisticDate && val.materialId) {
          this.getSubtotal()
        }
      },
      deep: true
    }
  },
  methods: {
    getSubtotal () {
      this.$api.material.getSubtotal({
        materialStatisticDate: this.selectData.materialStatisticDate,
        materialId: this.selectData.materialId[1]
      }).then(rsp => {
        if (rsp.result === 200) {
          this.subtotalData = rsp.data
        } else if (rsp.result === 500) {
          this.subtotalData = {}
          this.msg = rsp.resultText
        }
      })
    },
    submitForm (formName) {
      if (this.showReal) {
        this.triggerItem()
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addItem()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    handleCancel (formName) {
      this.$refs[formName].resetFields()
      this.$emit('cancel')
      this.selectData = {}
      this.subtotalData = {}
      this.formData = {}
    },
    addItem () {
      console.log('add')
      Object.assign(this.formData, {
        inventoryType: '实际量',
        inventoryDate: this.selectData.materialStatisticDate,
        materialId: this.selectData.materialId[1]
      })
      console.log(this.formData)
      this.$api.material.addRealItem(this.formData).then(rsp => {
        console.log(rsp)
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '新增实际量成功!', duration: 1000 })
          // this.triggerItem()
          this.$emit('primary')
          this.selectData = {}
          this.subtotalData = {}
          this.formData = {}
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      })
    },
    triggerItem () {
      this.$api.material.addTrigger({
        materialStatisticDate: this.selectData.materialStatisticDate,
        materialId: this.selectData.materialId[1]
      }).then(rsp => {
        console.log(rsp)
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '更新库存成功!', duration: 1000 })
          this.$emit('primary')
          this.selectData = {}
          this.subtotalData = {}
          this.formData = {}
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      })
    },
    getBase () {
      this.$api.material.getMaterialType().then(rsp => {
        const temp = []
        rsp.materialType.forEach((item, index) => {
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
    }
  }
}
</script>

<style scoped>
.button-group {
  padding-left: 150px;
}
</style>
