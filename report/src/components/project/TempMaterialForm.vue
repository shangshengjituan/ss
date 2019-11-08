<template>
  <el-form :model="table21" :rules="rules" ref="table21" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="材料名称" prop="table21MaterialName">
          <el-input v-model="table21.table21MaterialName" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="规格型号">
          <el-input v-model="table21.table21SpecificationModal" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位">
          <el-input v-model="table21.table21Unit" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="采购时间">
          <el-date-picker
            v-model="table21.table21PurchaseTime"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            :clearable="false" :editable="false">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="实际工程量">
          <el-input v-model.number="table21.table21ActualQuantity" type="number"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际单价">
          <el-input v-model.number="table21.table21ActualPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际材料费">
          <el-input v-model.number="table21.table21MaterialPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table21.table21Remark" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="编制人：">
          <span>{{this.editor}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('table21')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TempMaterialForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table21 = newValue
      }
    },
    table21: {
      handler (newValue, oldValue) {
        if (newValue.table21ActualPrice && newValue.table21ActualQuantity) {
          newValue.table21MaterialPrice = newValue.table21ActualPrice * newValue.table21ActualQuantity
        }
      },
      deep: true
    }
  },
  data () {
    return {
      table21: this.formData,
      editor: this.$store.getters.userName,
      rules: {
        table21MaterialName: [{ required: true, message: '不可为空', trigger: 'change' }],
        table21MaterialPrice: [{ required: true, message: '不可为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.table21.table21Editor = this.editor
          console.log(JSON.stringify(this.table21))
          this.$emit('confirm', this.table21)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
