<template>
  <el-form :model="table22" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工种">
          <el-input v-model="table22.table22WorkType" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="责任成本人工费占总产值百分比">
          <el-input v-model="table22.table22LiabilityLabor" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际成本人工费占总产值百分比">
          <el-input v-model="table22.table22ActualLabor" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="责任成本材料费占总产值百分比">
          <el-input v-model="table22.table22LiabilityMaterial" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际成本材料费占总产值百分比">
          <el-input v-model="table22.table22ActualMaterial" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="责任成本机械费占总产值百分比">
          <el-input v-model="table22.table22LiabilityMechanical" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际成本机械费占总产值百分比">
          <el-input v-model="table22.table22ActualMechanical" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table22.table22Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TotalCompareForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table22 = newValue
      }
    }
  },
  data () {
    return {
      table22: this.formData,
      editor: this.$store.getters.userName
    }
  },
  methods: {
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm () {
      this.table22.table22Editor = this.editor
      this.$emit('confirm', this.table22)
    }
  }
}
</script>

<style scoped>

</style>
