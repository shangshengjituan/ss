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
      <el-button style="float: right" type="primary" @click="createData"> 立即创建 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AddStatistics',
  props: {
    summaryData: {
      type: Object
    },
    basisData: {
      type: Object
    }
  },
  data () {
    return {
      table1: {
        table1ProjectId: '',
        table1ProjectYear: '',
        table1Quarter: '',
        optionId: '',
        table1ContractPrice: '',
        table1LiabilityCost: '',
        table1ActualCost: '',
        table1ContractPriceM2: '',
        table1LiabilityCostM2: '',
        table1ActualCostM2: '',
        table1Remark: ''
      }
    }
  },
  created () {
    this.initData()
  },
  watch: {
    summaryData: {
      handler (newValue, oldValue) {
        console.log('change')
        this.initData()
      },
      deep: true
    }
  },
  methods: {
    initData () {
      Object.assign(this.summaryData, this.basisData)
      Object.keys(this.table1).forEach(key => {
        this.table1[key] = this.summaryData[key]
      })
      // this.table1.optionId = this.basisData.optionId
    },
    addTable1 () {
      this.$api.project.addTable1(this.table1)
        .then(rsp => {
          if (rsp.data.result === 200) {
            this.$message.success('新增表单成功！')
            this.$emit('fresh')
          } else if (rsp.data.result === 500) {
            this.$message.error(rsp.data.resultText)
          } else {
            this.$message.error('新增项目失败……')
          }
          console.log(rsp.data)
        })
    },
    createData () {
      // 提交确认框
      this.$confirm('确认提交吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.addTable1()
      }).catch(() => {
        console.log('cancel submit.')
      })
    }
  }
}
</script>

<style scoped>

</style>
