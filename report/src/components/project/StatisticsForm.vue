<template>
  <el-form :model="table1" label-width="150px" label-position="right" >
    <el-row>
      <el-col :span="8">
        <el-form-item label="合同价">
          <el-input v-model.number="table1.table1ContractPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="责任成本">
          <el-input v-model.number="table1.table1LiabilityCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际成本">
          <el-input v-model.number="table1.table1ActualCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="合同价每平米造价">
          <el-input v-model.number="table1.table1ContractPriceM2" type="number" clearable><template slot="append">元/m<sup>2</sup></template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="责任成本每平米造价">
          <el-input v-model.number="table1.table1LiabilityCostM2" type="number" clearable><template slot="append">元/m<sup>2</sup></template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际成本每平米造价">
          <el-input v-model.number="table1.table1ActualCostM2" type="number" clearable><template slot="append">元/m<sup>2</sup></template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="备注">
          <el-input v-model="table1.table1Remark" clearable></el-input>
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
  name: 'StatisticsForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table1 = newValue
      }
    }
  },
  data () {
    return {
      table1: this.formData
    }
  },
  methods: {
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm () {
      console.log(JSON.stringify(this.table1))
      this.$emit('confirm', this.table1)
    }
  }
}
</script>

<style scoped>

</style>
