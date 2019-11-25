<template>
  <el-form :model="table2option2" label-width="110px" label-position="right" >
    <el-divider class="z-divider" content-position="left">材料费</el-divider>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="产值">
          <el-input v-model.number="table2option2.materialFeeOutput" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任指标">
          <el-input v-model="table2option2.materialFeeTarget" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任成本">
          <el-input v-model.number="table2option2.materialFeeLiabilityCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="实际成本">
          <el-input v-model.number="table2option2.materialFeeActualCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="差额">
          <span>{{(table2option2.materialFeeLiabilityCost - table2option2.materialFeeActualCost) || 0 }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="备注">
          <el-input v-model="table2option2.materialFeeRemark" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider class="z-divider" content-position="left">周转材料费</el-divider>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="产值">
          <el-input v-model.number="table2option2.turnoverMaterialOutput" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任指标">
          <el-input v-model="table2option2.turnoverMaterialTarget" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任成本">
          <el-input v-model.number="table2option2.turnoverMaterialLiabilityCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="实际成本">
          <el-input v-model.number="table2option2.turnoverMaterialActualCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col></el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="差额">
          <span>{{(table2option2.turnoverMaterialLiabilityCost - table2option2.turnoverMaterialActualCost) || 0 }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="备注">
          <el-input v-model="table2option2.turnoverMaterialRemark" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider class="z-divider" content-position="left">调入调出材料费</el-divider>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="产值">
          <el-input v-model.number="table2option2.transferMaterialOutput" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任指标">
          <el-input v-model="table2option2.transferMaterialTarget" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任成本">
          <el-input v-model.number="table2option2.transferMaterialLiabilityCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="实际成本">
          <el-input v-model.number="table2option2.transferMaterialActualCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col></el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="差额">
          <span>{{(table2option2.transferMaterialLiabilityCost - table2option2.transferMaterialActualCost) || 0 }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="备注">
          <el-input v-model="table2option2.transferMaterialRemark" clearable></el-input>
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
  name: 'Material',
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
        materialFeeOutput: '',
        materialFeeTarget: '',
        materialFeeLiabilityCost: '',
        materialFeeActualCost: '',
        materialFeeRemark: '',
        turnoverMaterialOutput: '',
        turnoverMaterialTarget: '',
        turnoverMaterialLiabilityCost: '',
        turnoverMaterialActualCost: '',
        turnoverMaterialRemark: '',
        transferMaterialOutput: '',
        transferMaterialTarget: '',
        transferMaterialLiabilityCost: '',
        transferMaterialActualCost: '',
        transferMaterialRemark: ''
      }
    }
  },
  created () {
    this.initData()
  },
  watch: {
    summaryData: {
      handler (newValue, oldValue) {
        this.initData()
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
    },
    addTable2option2 () {
      this.$api.project.addTable2option2(this.table2option2)
        .then(rsp => {
          if (rsp.data.result === 200) {
            this.$message.success('新增表单成功！')
            this.$emit('fresh')
          } else if (rsp.data.result === 500) {
            this.$message.error(rsp.data.resultText)
            // this.$emit('fresh')
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
        this.addTable2option2()
      }).catch(() => {
        console.log('cancel submit.')
      })
    }
  }
}
</script>

<style scoped>
  .z-divider {
    background-color: rgb(64, 158, 255);
  }
  .z-divider div {
    color: rgb(64, 158, 255);
  }
</style>
