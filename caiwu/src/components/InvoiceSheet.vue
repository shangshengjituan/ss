<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="开票日期" prop="invoiceDate">
          <el-date-picker
            v-model="formData.invoiceDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目" prop="projectId">
          <el-select v-model="formData.projectId" filterable placeholder="请选择">
            <el-option
              v-for="item in projects"
              :key="item.projectId"
              :label="item.projectName"
              :value="item.projectId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="凭证号" prop="voucherNumber">
          <el-input v-model="formData.voucherNumber" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="发票金额">
          <el-input v-model="formData.invoiceAmount" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="税率">
          <el-input v-model="formData.taxRate" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="总金额">
          <el-input v-model="formData.totalAmount" />
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
		name: "InvoiceSheet",
		props: {
			projects: Array,
			baseData: Object,
			isEdit: Boolean
		},
		data () {
			return {
				formData: {},
				unClick: false,
				rules: {
					invoiceDate: [{ required: true, message: '不可为空' }],
					voucherNumber: [{ required: true, message: '不可为空' }],
					equipmentName: [{ required: true, message: '不可为空' }],
					detectPayment: [{ required: true, message: '不可为空' }]
				}
			}
		},
		watch: {
			baseData: {
				handler (val) {
					this.formData = Object.assign({}, val)
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
				this.$api.addInvoice(this.formData).then(rsp => {
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
				// this.$emit('primary')
				console.log('edit')
				this.unClick = true
				this.$api.modifyInvoice(this.formData).then(rsp => {
					console.log(rsp)
					this.unClick = false
					if (rsp.result === 200) {
						this.$message({ type: 'success', message: '修改成功!', duration: 1000 })
						this.$emit('primary')
					} else {
						this.$message({ type: 'error', message: rsp.resultText })
					}
				}).catch(err => {
					this.unClick = false
					this.$message({ type: 'error', message: err })
				})
			}
		}
	}
</script>

<style scoped>

</style>
