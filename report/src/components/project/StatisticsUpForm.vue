<template>
  <el-form :model="table1up" label-width="150px" label-position="right" >
    <el-row >
      <el-col :span="8">
        <el-form-item label="项目经理">
          <el-input v-model="table1up.projectManager" clearable :readonly="true"/>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="合同约定质量标准">
          <el-input v-model="table1up.contractedQuality" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="8">
        <el-form-item label="合同计划开工时间">
          <el-date-picker
            v-model="table1up.plannedStartDate" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择起始日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合同竣工时间">
          <el-date-picker
            @focus="handleEndTime" :picker-options="pickerOptions"
            v-model="table1up.plannedEndDate" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择终止日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合同日历天数">
          <el-input v-model.number="table1up.plannedDays" type="number" :readonly="true" clearable  />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="8">
        <el-form-item label="实际开工时间">
          <el-date-picker
            v-model="table1up.actualStartDate" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择起始日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际竣工时间">
          <el-date-picker
            @focus="handleEndTime1" :picker-options="pickerOptions"
            v-model="table1up.actualEndDate" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择终止日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际日历天数">
          <el-input v-model.number="table1up.actualDays" type="number" :readonly="true" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="8">
        <el-form-item label="中标备案合同总价">
          <el-input v-model.number="table1up.contractTotalPrice" type="number" clearable ><template slot="append">元（小写）</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="每平米造价">
          <el-input v-model.number="table1up.costPerSquareMeter" type="number" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="工程面积">
          <el-input v-model="table1up.projectArea" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="24">
        <el-form-item label="备案合同工作内容">
          <el-input v-model="table1up.workContent" clearable />
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
  name: 'StatisticsUpForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table1up = Object.assign({}, newValue)
      }
    },
    table1up: {
      handler (newVal, oldVal) {
        this.table1up.plannedDays = this.diffDate(newVal.plannedStartDate, newVal.plannedEndDate)
        this.table1up.actualDays = this.diffDate(newVal.actualStartDate, newVal.actualEndDate)
      },
      deep: true
    }
  },
  data () {
    return {
      table1up: Object.assign({}, this.formData),
      pickerOptions: {}
    }
  },
  methods: {
    handleEndTime () {
      let demo = new Date(this.table1up.plannedStartDate).getTime()
      console.log(demo)
      this.pickerOptions = {
        disabledDate (time) {
          return time.getTime() < demo
        }
      }
    },
    handleEndTime1 () {
      let demo = new Date(this.table1up.actualStartDate).getTime()
      console.log(demo)
      this.pickerOptions = {
        disabledDate (time) {
          return time.getTime() < demo
        }
      }
    },
    diffDate (day1, day2) {
      console.log(day1)
      let d1 = Date.parse(day1)
      console.log(d1)
      let d2 = Date.parse(day2)
      return parseInt((d2 - d1) / (1000 * 60 * 60 * 24))
    },
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm () {
      console.log(JSON.stringify(this.table1up))
      this.$emit('confirm', this.table1up)
    }
  }
}
</script>

<style scoped>

</style>
