<template>
  <el-form :model="table20" label-width="180px" label-position="right">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工作内容明细" prop="table20WorkType">
          <el-input v-model="table20.table20WorkType" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位">
          <el-input v-model="table20.table20Unit" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际工程量">
          <el-input v-model.number="table20.table20ActualQuantity" type="number" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单价">
          <el-input v-model.number="table20.table20Price" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="实际人工费"  prop="table20ActualLaborCost">
          <el-input v-model.number="table20.table20ActualLaborCost" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="起始日期">
          <el-date-picker
            v-model="table20.table20StartDate" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择起始日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="终止日期">
          <el-date-picker
            @focus="handleEndTime"
            v-model="table20.table20EndDate" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            placeholder="请选择终止日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table20.table20Remark" clearable></el-input>
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
  name: 'TempLaborForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table20 = newValue
      }
    }
  },
  data () {
    return {
      table20: this.formData,
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
      this.table20.table20Editor = this.editor
      this.$emit('confirm', this.table20)
    },
    handleEndTime () {
      let demo = new Date(this.table20.table20StartDate).getTime()
      this.pickerOptions = {
        disabledDate (time) {
          return time.getTime() < demo
        }
      }
    },
    disabledDate (time) {
      return time.getTime() > new Date(this.table20.table20StartDate).getTime()
    }
  }
}
</script>

<style scoped>

</style>
