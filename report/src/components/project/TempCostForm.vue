<template>
  <el-form :model="table19" :rules="rules" ref="table19" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="项目名称" prop="table19FacilityName">
          <el-input v-model="table19.table19FacilityName" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位">
          <el-input v-model="table19.table19Unit" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数量">
          <el-input v-model.number="table19.table19Quantity" type="number" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="合同临设费">
          <el-input v-model.number="table19.table19TemporaryFacilities" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际成本">
          <el-input v-model.number="table19.table19ActualCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="责任成本">
          <el-input v-model.number="table19.table19LiabilityCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="完成形象进度">
          <el-input v-model="table19.table19Schedule" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table19.table19Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table19')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TempCostForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table19 = newValue
      }
    }
  },
  data () {
    return {
      table19: this.formData,
      editor: this.$store.getters.userName,
      rules: {
        table19SubcontractingName: [{ required: true, message: '不可为空', trigger: 'change' }]
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
          this.table19.table19Editor = this.editor
          console.log(JSON.stringify(this.table19))
          this.$emit('confirm', this.table19)
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
