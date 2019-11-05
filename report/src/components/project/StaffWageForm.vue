<template>
  <el-form :model="table17" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="姓名">
          <el-input v-model="table17.table17Name" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="岗位与职务">
          <el-input v-model="table17.table17PostPosition" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="进项目时间">
          <el-date-picker
            v-model="table17.table17EnterTime" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择起始日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="出项目时间">
          <el-date-picker
            @focus="handleEndTime"
            v-model="table17.table17OutTime" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            placeholder="请选择终止日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工资标准">
          <el-input v-model.number="table17.table17FeeStandard" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="证件津贴">
          <el-input v-model.number="table17.table17Allowance" type="number" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table17.table17Remark" clearable></el-input>
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
  name: 'StaffWageForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table17 = newValue
      }
    }
  },
  data () {
    return {
      table17: this.formData,
      editor: this.$store.getters.userName,
      pickerOptions: {}
    }
  },
  methods: {
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm () {
      // 将验证后的table17数据增减字段为buildingData后提交
      this.table17.table17Editor = this.editor
      console.log(JSON.stringify(this.table17))
      this.$emit('confirm', this.table17)
    },
    handleEndTime () {
      let demo = new Date(this.table17.table17EnterTime).getTime()
      this.pickerOptions = {
        disabledDate (time) {
          return time.getTime() < demo
        }
      }
    },
    disabledDate (time) {
      return time.getTime() > new Date(this.table17.table17OutTime).getTime()
    }
  }
}
</script>

<style scoped>

</style>
