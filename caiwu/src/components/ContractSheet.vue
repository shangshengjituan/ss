<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
    <el-row :gutter="20">
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
      <el-col :span="12">
        <el-form-item label="甲方单位名称" prop="partyAId">
          <el-select v-model="formData.partyAId" placeholder="请选择">
            <el-option
              v-for="item in parties"
              :key="item.partyAId"
              :label="item.partyAName"
              :value="item.partyAId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="合同价款">
          <el-input v-model="formData.contractPrice" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="结算价款">
          <el-input v-model="formData.settlementPrice" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="累计产值">
          <el-input v-model="formData.cumulativeOutputValue" />
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
		name: "ContractSheet",
		props: {
			projects: Array,
			parties: Array,
			baseData: Object,
			isEdit: Boolean
		},
		data () {
			return {
				formData: {},
				unClick: false,
				rules: {
					invoiceDate: [{ required: true, message: '不可为空' }],
					partyAId: [{ required: true, message: '不可为空' }],
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
				this.$api.addContract(this.formData).then(rsp => {
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
				this.$api.modifyContract(this.formData).then(rsp => {
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
