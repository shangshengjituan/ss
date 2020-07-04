<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="日期" prop="foodDate">
          <el-date-picker
            v-model="formData.foodDate" value-format="yyyy-MM" class="width-full"
            type="month" placeholder="选择月份" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="姓名" prop="staffName">
          <el-input v-model="formData.staffName" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="考勤" prop="attendance">
          <el-input v-model="formData.attendance"><template slot="append">天</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="标准" prop="standard">
          <el-input v-model="formData.standard"><template slot="append">元/天</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">个人承担</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="标准" prop="standardPersonal">
          <el-input v-model="formData.standardPersonal"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="小计">
          <el-input v-model="formData.subtotalPersonal" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.foodAmount" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="备注">
          <el-input v-model="formData.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'RearMeal',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: {},
      rules: {
        foodDate: [{ required: true, message: '不可为空' }],
        staffName: [{ required: true, message: '不可为空' }],
        basePayPersonal: [{ required: true, message: '不可为空' }],
        attendance: [{ required: true, message: '不可为空' }]
      },
      materialTypes: [],
      kinds: [],
      providers: []
    }
  },
  watch: {
    baseData: {
      handler (val, old) {
        this.formData = Object.assign({}, val)
      },
      deep: true
    },
    formData: {
      handler (val, old) {
        if (val.attendance && (val.standardPersonal || val.standard)) {
          this.formData.subtotalPersonal = this.$utils.multiply(val.attendance, val.standardPersonal).toFixed(2)
          const temp = this.$utils.subtract(this.$utils.multiply(val.attendance, val.standard), val.subtotalPersonal)
          this.formData.foodAmount = temp.toFixed(2)
        }
      },
      deep: true
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isEdit ? this.editItem() : this.addItem()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel (formName) {
      this.$refs[formName].resetFields()
      this.$emit('cancel')
    },
    addItem () {
      console.log('add')
      this.$api.rear.addMealItem(this.formData).then(rsp => {
        console.log(rsp)
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '新增成功!', duration: 1000 })
          this.$emit('primary')
        } else {
          this.$message.error(rsp.resultText)
        }
      })
    },
    editItem () {
      this.$emit('primary')
    }
  }
}
</script>

<style scoped>

</style>
