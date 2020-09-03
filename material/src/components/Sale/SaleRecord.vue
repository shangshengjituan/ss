<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="项目名称" prop="projectId">
          <el-select v-model="formData.projectId" placeholder="请选择项目">
            <el-option v-for="item in projects" :key="item.projectId" :label="item.projectName" :value="item.projectId" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="规格" prop="commodity">
          <el-cascader v-model="formData.commodity" :options="commodities" :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="板厚" prop="thickness">
          <el-input v-model="formData.thickness"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">浇注</p>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="日期" prop="pouringDate">
          <el-date-picker
            v-model="formData.pouringDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数量" prop="pouringQuantity">
          <el-input-number v-model="formData.pouringQuantity" controls-position="right" class="width-full"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="面积"  prop="pouringArea">
          <el-input-number v-model="formData.pouringArea" controls-position="right" class="width-full"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">入库</p>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="日期" prop="warehousingDate">
          <el-date-picker
            v-model="formData.warehousingDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数量" prop="warehousingQuantity">
          <el-input-number v-model="formData.warehousingQuantity" controls-position="right" class="width-full"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="面积" prop="warehousingArea">
          <el-input-number v-model="formData.warehousingArea" controls-position="right" class="width-full"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="生产模数">
          <el-input v-model="formData.produceModule"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="16">
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
  name: 'SaleRecord',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: Object.assign({}, this.baseData),
      rules: {
        projectId: [{ required: true, message: '不可为空' }],
        commodity: [{ required: true, message: '不可为空' }],
        pouringDate: [{ required: true, message: '不可为空' }],
        pouringQuantity: [{ required: true, message: '不可为空' }],
        warehousingDate: [{ required: true, message: '不可为空' }],
        thickness: [{ required: true, message: '不可为空' }],
        pouringArea: [{ required: true, message: '不可为空' }],
        warehousingArea: [{ required: true, message: '不可为空' }],
        warehousingQuantity: [{ required: true, message: '不可为空' }]
      },
      unClick: false,
      projects: [],
      commodities: []
    }
  },
  created () {
    this.getBase()
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
        if (val.commodity) {
          val.commodityId = val.commodity[1]
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
      this.unClick = true
      this.$api.sale.addRecord(this.formData).then(rsp => {
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
      this.$api.sale.getProjects().then(rsp => {
        this.projects = rsp.data
      })
      this.$api.sale.getCommodities().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.commodityName,
            value: item.index,
            children: []
          })
          if (item.commoditySizeLists) {
            item.commoditySizeLists.forEach(it => {
              temp[index].children.push({
                label: it.commoditySize,
                value: it.commodityId
              })
            })
          }
        })
        this.commodities = temp
      })
    }
  }
}
</script>

<style scoped>

</style>
