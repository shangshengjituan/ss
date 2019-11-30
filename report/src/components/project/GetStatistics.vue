<template>
  <el-form :model="table1up" label-width="150px">
    <el-row >
      <el-col :span="8">
        <el-form-item label="项目经理">
          <el-input v-model="table1up.projectManager" clearable :readonly="isExist"/>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="合同约定质量标准">
          <el-input v-model="table1up.contractedQuality" clearable :readonly="isExist"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="8">
        <el-form-item label="合同计划开工时间">
          <el-date-picker
            v-model="table1up.plannedStartDate" :clearable="false" :editable="false" :readonly="isExist"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择起始日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合同竣工时间">
          <el-date-picker
            v-model="table1up.plannedEndDate" :clearable="false" :editable="false" :readonly="isExist"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择终止日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合同日历天数">
          <el-input v-model.number="table1up.plannedDays" type="number" clearable :readonly="isExist" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="8">
        <el-form-item label="实际开工时间">
          <el-date-picker
            v-model="table1up.actualStartDate" :clearable="false" :editable="false" :readonly="isExist"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择起始日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际竣工时间">
          <el-date-picker
            v-model="table1up.actualEndDate" :clearable="false" :editable="false" :readonly="isExist"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择终止日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际日历天数">
          <el-input v-model.number="table1up.actualDays" type="number" clearable :readonly="isExist"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="8">
        <el-form-item label="中标备案合同总价">
          <el-input v-model.number="table1up.contractTotalPrice" type="number" clearable :readonly="isExist"><template slot="append">元（小写）</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="每平米造价">
          <el-input v-model.number="table1up.costPerSquareMeter" type="number" clearable :readonly="isExist"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="工程面积">
          <el-input v-model="table1up.projectArea" clearable :readonly="isExist"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="24">
        <el-form-item label="备案合同工作内容">
          <el-input v-model="table1up.workContent" clearable :readonly="isExist" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button style="float: right" v-show="!isExist" type="primary" @click="createData"> 立即创建 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'GetStatistics',
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
      table1up: {
        table1ProjectId: '',
        table1ProjectYear: '',
        table1Quarter: '',
        projectManager: '',
        contractedQuality: '',
        plannedStartDate: '',
        plannedEndDate: '',
        plannedDays: '',
        actualStartDate: '',
        actualEndDate: '',
        actualDays: '',
        contractTotalPrice: '',
        costPerSquareMeter: '',
        projectArea: '',
        workContent: ''
      },
      isExist: false
    }
  },
  created () {
    console.log('created')
    this.initData()
  },
  watch: {
    summaryData: {
      handler (newValue, oldValue) {
        console.log('up change')
        this.initData()
      },
      deep: true
    }
  },
  methods: {
    initData () {
      console.log('0')
      console.log(Object.keys(this.summaryData).length)
      if (Object.keys(this.summaryData).length) {
        console.log('1')
        Object.keys(this.table1up).forEach(key => {
          this.table1up[key] = this.summaryData[key]
        })
        this.isExist = true
      } else {
        console.log('2')
        Object.keys(this.table1up).forEach(key => {
          this.table1up[key] = this.basisData[key]
        })
        this.isExist = false
      }
    },
    addTable1Up () {
      this.$api.project.addTable1Up(this.table1up)
        .then(rsp => {
          if (rsp.data.result === 200) {
            this.$message.success('新增表单成功！')
            this.isExist = true
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
        this.addTable1Up()
      }).catch(() => {
        console.log('cancel submit.')
      })
    }
  }
}
</script>

<style scoped>
  .el-col .el-form-item {
    margin-bottom: 5px;
  }
  .el-col .el-form-item .el-form-item__label {
    border: 1px solid #DCDFE6;
  }
</style>
