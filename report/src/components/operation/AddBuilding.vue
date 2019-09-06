<template>
  <div class="demo-groupData">
    <h4>集团建筑板块各单位运营成本明细统计表</h4>
    <el-form :model="groupData" :rules="rules" ref="groupData" label-width="110px" label-position="left" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位名称" prop="departmentId">
            <el-select v-model="groupData.departmentId" placeholder="请选择部门">
              <el-option label="集团公司管理层" value="1"></el-option>
              <el-option label="企业发展中心" value="2"></el-option>
              <el-option label="智能服务中心" value="3"></el-option>
              <el-option label="财务管理中心" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="groupYear">
            <el-date-picker
              v-model="groupData.groupYear"
              type="year"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="明细类型" prop="value">
            <el-cascader
              v-model="groupData.value"
              :options="options"
              @change="handleChange"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工资" prop="groupSalary">
            <el-input v-model="groupData.groupSalary" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政收入" prop="groupAdministrative">
            <el-input v-model="groupData.groupAdministrative" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="固定资产投资" prop="groupFixedAssets">
            <el-input v-model="groupData.groupFixedAssets" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="培训费" prop="groupTraining">
            <el-input v-model="groupData.groupTraining" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="科技创新费" prop="groupTechnology">
            <el-input v-model="groupData.groupTechnology" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招待费" prop="groupEntertain">
            <el-input v-model="groupData.groupEntertain" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经营费" prop="groupOperating">
            <el-input v-model="groupData.groupOperating" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="财务费用" prop="groupFinance">
            <el-input v-model="groupData.groupFinance" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="各类税费" prop="groupTaxes">
            <el-input v-model="groupData.groupTaxes" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="审计费" prop="groupAudit">
            <el-input v-model="groupData.groupAudit" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="律师费用" prop="groupLawyer">
            <el-input v-model="groupData.groupLawyer" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证书费用" prop="groupCertificate">
            <el-input v-model="groupData.groupCertificate" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="伙食费用" prop="groupMeal">
            <el-input v-model="groupData.groupMeal" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房租费用" prop="groupRent">
            <el-input v-model="groupData.groupRent" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他费用" prop="groupOther">
            <el-input v-model="groupData.groupOther" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="费用合计" prop="groupTotal">
            <el-input v-model="groupData.groupTotal" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人" prop="groupEditor">
            <el-input v-model="groupData.groupEditor" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制日期" prop="groupEditorDate">
            <el-input v-model="groupData.groupEditorDate" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input v-model="groupData.groupRemark" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('groupData')">立即创建</el-button>
        <el-button @click="resetForm('groupData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddBuilding',
  data () {
    return {
      groupData: {
        departmentId: '',
        groupYear: '',
        groupQuarter: '',
        groupEstimatedOrActual: '',
        groupSalary: '',
        groupAdministrative: '',
        groupFixedAssets: '',
        groupTraining: '',
        groupTechnology: '',
        groupEntertain: '',
        groupOperating: '',
        groupFinance: '',
        groupTaxes: '',
        groupAudit: '',
        groupLawyer: '',
        groupCertificate: '',
        groupMeal: '',
        groupEditorDate: '',
        groupOther: '',
        groupRemark: '',
        groupTotal: '',
        groupEditor: '',
        groupRent: '',
        value: [] // 提交时删除
      },
      rules: {
        departmentId: [{ required: true, message: '请选择部门', trigger: 'change' }],
        groupYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        value: [{ type: 'array', required: true, message: '请选择类型', trigger: 'change' }],
        groupSalary: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupAdministrative: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupFixedAssets: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupTraining: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupTechnology: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupEntertain: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupOperating: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupFinance: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupTaxes: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupAudit: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupLawyer: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupCertificate: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupMeal: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupEditorDate: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupOther: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupTotal: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupEditor: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupRent: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      value: [],
      options: [{
        value: '1',
        label: '预估'
      }, {
        value: '2',
        label: '实际',
        children: [{
          value: '1',
          label: '第一季度'
        }, {
          value: '2',
          label: '第二季度'
        }, {
          value: '3',
          label: '第三季度'
        }, {
          value: '4',
          label: '第四季度'
        }]
      }]
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
      this.groupData.groupEstimatedOrActual = val[0]
      this.groupData.groupQuarter = val[1]
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .demo-groupData {
    padding: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
