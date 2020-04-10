<template>
  <el-form :model="table2option2" label-width="110px" label-position="right" >
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="产值">
          <el-input v-model.number="table2option2.table2Output" type="number" ><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="基数">
          <span>{{ summaryData.target }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任成本">
          <el-input v-model.number="table2option2.table2LiabilityCost" :readonly="true" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="实际成本">
          <el-input v-model.number="table2option2.table2ActualCost" type="number" :readonly="readonlyActualCost"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="差额">
          <span>{{ diff}} 元</span>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="备注">
          <el-input v-model="table2option2.table2Remark" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="createData"> 立即创建 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AddSummary',
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
      table2option2: {
        table2ProjectId: '',
        table2ProjectYear: '',
        table2Quarter: '',
        specificOptionId: '',
        table2Output: '',
        table2LiabilityCost: '',
        table2ActualCost: '',
        table2Remark: ''
      },
      readonlyActualCost: !!this.summaryData.table2ActualCost,
      diff: 0
    }
  },
  created () {
    this.initData()
  },
  watch: {
    summaryData: {
      handler (newVal, oldVal) {
        this.readonlyActualCost = !!newVal.table2ActualCost
        console.log('change')
        this.initData()
      },
      deep: true
    },
    table2option2: {
      handler (newVal, oldVal) {
        if (newVal.table2Output) {
          newVal.table2LiabilityCost = this.numeral(newVal.table2Output).multiply(this.summaryData.target).value()
        }
        if (newVal.table2Output && newVal.table2ActualCost) {
          this.diff = this.numeral(newVal.table2Output).subtract(newVal.table2ActualCost).value()
        }
      },
      deep: true
    }
  },
  methods: {
    initData () {
      Object.assign(this.summaryData, this.basisData)
      Object.keys(this.table2option2).forEach(key => {
        this.table2option2[key] = this.summaryData[key]
      })
      this.table2option2.specificOptionId = this.summaryData.optionId[1]
    },
    addTable2 () {
      this.$api.project.addTable2(this.table2option2)
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
        this.addTable2()
      }).catch(() => {
        console.log('cancel submit.')
      })
    }
  }
}
</script>

<style scoped>

</style>
