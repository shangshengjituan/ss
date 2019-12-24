<template>
  <el-form :model="table2option2" label-width="110px" label-position="right" >
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="产值">
          <el-input v-model.number="table2option2.table2Output" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任指标">
          <el-input v-model="table2option2.table2Target" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任成本">
          <el-input v-model.number="table2option2.table2LiabilityCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="实际成本">
          <el-input v-model.number="table2option2.table2ActualCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="差额">
          <span>{{(table2option2.table2LiabilityCost - table2option2.table2ActualCost) || 0 }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="备注">
          <el-input v-model="table2option2.table2Remark" clearable></el-input>
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
  name: 'SummaryForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table2option2 = Object.assign({}, newValue)
      }
    }
  },
  data () {
    return {
      table2option2: Object.assign({}, this.formData)
    }
  },
  methods: {
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm () {
      console.log(JSON.stringify(this.table2option2))
      this.$emit('confirm', this.table2option2)
    }
  }
}
</script>

<style scoped>

</style>
