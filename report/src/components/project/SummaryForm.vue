<template>
  <el-form :model="table2option2" label-width="90px" label-position="right" >
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="基数">
          <span>{{ table2option2.target }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="产值">
          <el-input v-model.number="table2option2.table2Output" type="number"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任成本">
          <el-input v-model.number="table2option2.table2LiabilityCost" :readonly="true" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="实际成本">
          <el-input v-model.number="table2option2.table2ActualCost" type="number"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="差额">
          <span>{{ table2option2.diff}} 元</span>
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
        console.log(newValue)
        this.table2option2 = Object.assign({}, newValue)
      }
    },
    table2option2: {
      handler (newVal, oldVal) {
        if (newVal.table2Output) {
          newVal.table2LiabilityCost = this.numeral(newVal.table2Output).multiply(newVal.target).value()
        }
        if (newVal.table2Output && newVal.table2ActualCost) {
          newVal.diff = this.numeral(newVal.table2Output).subtract(newVal.table2ActualCost).value()
        }
      },
      deep: true
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
