<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="日期" prop="costSummaryDate">
          <el-date-picker
            v-model="formData.costSummaryDate" value-format="yyyy-MM" class="width-full"
            type="month" placeholder="选择月份" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="分类" prop="costSort">
          <el-cascader v-model="formData.costSort" :options="sort" :props="{ expandTrigger: 'hover' }" class="width-full"></el-cascader>
          <!--<el-input v-model="formData.costSortId" />-->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="项目" prop="costProject">
          <el-input v-model="formData.costProject" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="金额" prop="costAmount">
          <el-input v-model="formData.costAmount"><template slot="append">元</template></el-input>
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
      <el-button type="primary" @click="submitForm('form')" :disabled="unClick">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CostSummarySheet',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: Object.assign({}, this.baseData),
      unClick: false,
      rules: {
        costSummaryDate: [{ required: true, message: '不可为空' }],
        costSort: [{ required: true, message: '不可为空' }],
        costProject: [{ required: true, message: '不可为空' }],
        costAmount: [{ required: true, message: '不可为空' }]
      },
      sort: []
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
        if (val.costSort) {
          val.costSortId = val.costSort[1]
        }
      },
      deep: true
    }
  },
  created () {
    this.getBase()
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
      this.unClick = true
      this.$api.cost.addSummarySheet(this.formData).then(rsp => {
        console.log(rsp)
        this.unClick = false
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '新增成功!', duration: 1000 })
          this.$emit('primary')
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      }).catch(err => {
        this.unClick = false
        this.$message({ type: 'error', message: err })
      })
    },
    editItem () {
      this.$emit('primary')
    },
    getBase () {
      this.$api.cost.getSort().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.costSort,
            value: item.costSort,
            children: []
          })
          if (item.costSortList) {
            item.costSortList.forEach(it => {
              temp[index].children.push({
                label: it.costProject,
                value: it.costSortId
              })
            })
          }
        })
        this.sort = temp
        // this.sort = rsp.data
      })
    }
  }
}
</script>

<style scoped>

</style>
