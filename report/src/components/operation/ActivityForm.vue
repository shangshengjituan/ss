<template>
  <el-form :model="activityData" :rules="rules1" ref="activityData" label-width="110px" label-position="right" >
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="赛事活动名称" prop="activityName">
          <el-input v-model="activityData.activityName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="年份" prop="activityYear">
          <el-date-picker
            v-model="activityData.activityYear"
            type="year"
            format="yyyy"
            value-format="yyyy"
            placeholder="请选择年份">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="赛事活动时间" prop="activityTime">
          <el-date-picker
            v-model="activityData.activityTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="赛事运营单位" prop="activityOperatingUnit">
          <el-input v-model="activityData.activityOperatingUnit" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="赛事活动地点" prop="activityLocation">
          <el-input v-model="activityData.activityLocation" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="预估运营成本" prop="activityEstimatedCost">
          <el-input v-model.number="activityData.activityEstimatedCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际运营成本" prop="activityActualCost">
          <el-input v-model.number="activityData.activityActualCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="activityData.activityRemark" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="编制人">
          <span>{{activityData.activityEditor}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="validateData1('activityData')">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ActivityForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.activityData = newValue
      },
      deep: true
    }
  },
  data () {
    return {
      activityData: this.formData,
      rules: {
        activityName: [{ required: true, message: '请输入赛事活动名称', trigger: 'change' }],
        activityTime: [{ required: true, message: '请输入赛事活动时间', trigger: 'change' }],
        activityLocation: [{ required: true, message: '请输入赛事活动地点', trigger: 'change' }],
        activityOperatingUnit: [{ required: true, message: '请输入赛事运营单位', trigger: 'change' }],
        activityEstimatedCost: [{ required: true, message: '请输入金额', trigger: 'change' }],
        activityActualCost: [{ required: true, message: '请输入金额', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的buildingData数据增减字段为groupData后提交
          console.log(JSON.stringify(this.activityData))
          this.$emit('confirm', this.activityData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
</style>
