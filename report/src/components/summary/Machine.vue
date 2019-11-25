<template>
  <el-form :model="table2option1" label-width="110px" label-position="right" >
    <el-divider class="z-divider" content-position="left">实际人工费</el-divider>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="产值">
          <el-input v-model.number="table2option1.actualLaborOutput" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任指标">
          <el-input v-model="table2option1.actualLaborTarget" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任成本">
          <el-input v-model.number="table2option1.actualLaborLiabilityCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="实际成本">
          <el-input v-model.number="table2option1.actualLaborActualCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="差额">
          <span>{{(table2option1.actualLaborLiabilityCost - table2option1.actualLaborActualCost) || 0 }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="备注">
          <el-input v-model="table2option1.actualLaborRemark" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider class="z-divider" content-position="left">合同外点工</el-divider>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="产值">
          <el-input v-model.number="table2option1.pointWorkOutput" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任指标">
          <el-input v-model="table2option1.pointWorkTarget" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任成本">
          <el-input v-model.number="table2option1.pointWorkLiabilityCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="实际成本">
          <el-input v-model.number="table2option1.pointWorkActualCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col></el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="差额">
          <span>{{(table2option1.pointWorkLiabilityCost - table2option1.pointWorkActualCost) || 0 }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="备注">
          <el-input v-model="table2option1.pointWorkRemark" clearable></el-input>
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
  name: 'Machine',
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
      table2option1: {
        table2ProjectId: '',
        table2ProjectYear: '',
        table2Quarter: '',
        actualLaborOutput: '',
        actualLaborTarget: '',
        actualLaborLiabilityCost: '',
        actualLaborActualCost: '',
        actualLaborRemark: '',
        pointWorkOutput: '',
        pointWorkTarget: '',
        pointWorkLiabilityCost: '',
        pointWorkActualCost: '',
        pointWorkRemark: ''
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
      Object.keys(this.table2option1).forEach(key => {
        this.table2option1[key] = this.summaryData[key]
      })
    },
    addTable2option1 () {
      this.$api.project.addTable2option1(this.table2option1)
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
        this.addTable2option1()
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
