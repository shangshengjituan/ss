<template>
  <el-form :model="table6" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="材料名称">
          <el-input v-model="table6.table6MaterialName" :readonly="true" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="规格型号">
          <el-input v-model="table6.table6SpecificationModel" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位" prop="table6Unit">
          <el-input v-model="table6.table6Unit" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="实际工程量">
          <el-input v-model.number="table6.table6ActualEngineering" type="number" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际单价">
          <el-input v-model.number="table6.table6ActualPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际材料费合价">
          <el-input v-model.number="table6.table6ActualTotalPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="合同工程量">
          <el-input v-model.number="table6.table6ContractEngineering" type="number" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="责任成本材料费单价">
          <el-input v-model.number="table6.table6LiabilityCostPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="责任成本材料费合价">
          <el-input v-model.number="table6.table6LiabilityCostTotalPrice" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="材料费差价">
          <el-input v-model="costDifference" :readonly="true" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table6.table6Remark" clearable></el-input>
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
  name: 'CostMaterialDetailForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table6 = Object.assign({}, newValue)
        this.costDifference = newValue.table6Spread
      }
    },
    table6: {
      handler (newValue, oldValue) {
        this.costDifference = Math.round((newValue.table6LiabilityCostTotalPrice - newValue.table6ActualTotalPrice) * 100) / 100
      },
      deep: true
    }
  },
  data () {
    return {
      table6: Object.assign({}, this.formData),
      editor: this.$store.getters.userName,
      costDifference: this.formData.table6Spread
    }
  },
  methods: {
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm () {
      // 将验证后的table6数据增减字段为buildingData后提交
      this.table6.table6Editor = this.editor
      this.table6.table6Spread = this.costDifference
      console.log(JSON.stringify(this.table6))
      this.$emit('confirm', this.table6)
    }
  }
}
</script>

<style scoped>

</style>
