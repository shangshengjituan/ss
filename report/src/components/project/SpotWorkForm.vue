<template>
  <el-form :model="table5" :rules="rules" ref="table5" label-width="110px" label-position="right"  @validate="handleCalculate">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="工作内容" prop="table5WorkContent">
          <el-input v-model="table5.table5WorkContent" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="发生点工原因" prop="table5Reason">
          <el-input v-model="table5.table5Reason" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row  :gutter="20">
      <el-col :span="8">
        <el-form-item label="起始时间" prop="table5StartTime">
          <el-date-picker
            v-model="table5.table5StartTime" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placeholder="请选择起始日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="终止时间" prop="table5EndTime">
          <el-date-picker
            @focus="handleEndTime"
            v-model="table5.table5EndTime" :clearable="false" :editable="false"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            placeholder="请选择终止日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="栋号及部位" prop="table5Position">
          <el-input v-model="table5.table5Position" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工种" prop="table5WorkTypeId">
          <el-select v-model="table5.table5WorkName" placeholder="请选择工作内容明细" value="">
            <el-option
              v-for="item in workList"
              :key="item.id" :label="item.bricklayer" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="班组" prop="table5Team">
          <el-input v-model="table5.table5Team" placeholder="请输入班组" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="平均人数" prop="table5AveragePeople">
          <el-input v-model.number="table5.table5AveragePeople" type='number' clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单价" prop="table5UnitPrice">
          <el-input v-model.number="table5.table5UnitPrice" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合价" prop="table5TotalPrice">
          <span>{{totalPrice}} 元</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="备注">
          <el-input v-model="table5.table5Remark" clearable></el-input>
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
      <el-button type="primary" @click="handleConfirm('table5')"> 确 定 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SpotWorkForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.table5 = newValue
        this.totalPrice = newValue.table5TotalPrice
      }
    }
  },
  data () {
    return {
      table5: this.formData,
      editor: this.$store.getters.userName,
      totalPrice: this.formData.table5TotalPrice,
      workList: [],
      pickerOptions: {},
      rules: {
        table5ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table5ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table5Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table5WorkContent: [{ required: true, message: '不可为空', trigger: 'change' }],
        table5Reason: [{ required: true, message: '不可为空', trigger: 'change' }],
        table5StartTime: [{ required: true, message: '请选择日期', trigger: 'change' }],
        table5EndTime: [{ required: true, message: '请选择日期', trigger: 'change' }],
        table5Position: [{ required: true, message: '不可为空', trigger: 'change' }],
        table5WorkTypeId: [{ required: true, message: '请选择明细', trigger: 'change' }],
        table5Team: [{ required: true, message: '不可为空', trigger: 'change' }],
        table5AveragePeople: [{ required: true, message: '不可为空', trigger: 'change' }],
        table5UnitPrice: [{ required: true, message: '请输入金额', trigger: 'change' }]
      }
    }
  },
  created () {
    this.getWork()
  },
  methods: {
    getWork () {
      this.$api.project.getWorkList()
        .then(rsp => {
          this.workList = rsp.data.list
          console.log(this.workList)
        })
    },
    handleCalculate () {
      this.totalPrice = this.table5.table5AveragePeople * this.table5.table5UnitPrice
    },
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的table5数据增减字段为buildingData后提交
          this.table5.table5Editor = this.editor
          this.table5.table5TotalPrice = this.totalPrice
          console.log(JSON.stringify(this.table5))
          this.$emit('confirm', this.table5)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEndTime () {
      let demo = new Date(this.table5.table5StartTime).getTime()
      this.pickerOptions = {
        disabledDate (time) {
          return time.getTime() < demo
        }
      }
    },
    disabledDate (time) {
      return time.getTime() > new Date(this.table5.table5StartTime).getTime()
    }
  }
}
</script>

<style scoped>

</style>
