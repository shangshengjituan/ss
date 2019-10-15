<template>
  <el-form :model="groupData" :rules="rules" ref="groupData" label-width="110px" label-position="right" @validate="handleSum">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单位名称">
          <el-input v-model="groupData.departmentName" :readonly="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="年份" prop="groupYear">
          <el-date-picker
            v-model="groupData.groupYear"
            type="year"
            format="yyyy"
            value-format="yyyy"
            placeholder="请选择年份">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="明细类型">
          <el-input v-model="groupData.groupType" :readonly="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工资" prop="groupSalary">
          <el-input v-model.number="groupData.groupSalary" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="行政收入" prop="groupAdministrative">
          <el-input v-model.number="groupData.groupAdministrative" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="固定资产投资" prop="groupFixedAssets">
          <el-input v-model.number="groupData.groupFixedAssets" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="培训费" prop="groupTraining">
          <el-input v-model.number="groupData.groupTraining" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="科技创新费" prop="groupTechnology">
          <el-input v-model.number="groupData.groupTechnology" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="招待费" prop="groupEntertain">
          <el-input v-model.number="groupData.groupEntertain" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="经营费" prop="groupOperating">
          <el-input v-model.number="groupData.groupOperating" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="财务费用" prop="groupFinance">
          <el-input v-model.number="groupData.groupFinance" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="各类税费" prop="groupTaxes">
          <el-input v-model.number="groupData.groupTaxes" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="审计费" prop="groupAudit">
          <el-input v-model.number="groupData.groupAudit" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="律师费用" prop="groupLawyer">
          <el-input v-model.number="groupData.groupLawyer" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="证书费用" prop="groupCertificate">
          <el-input v-model.number="groupData.groupCertificate" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="伙食费用" prop="groupMeal">
          <el-input v-model.number="groupData.groupMeal" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="房租费用" prop="groupRent">
          <el-input v-model.number="groupData.groupRent" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="其他费用" prop="groupOther">
          <el-input v-model.number="groupData.groupOther" type='number' clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="备注">
      <el-input v-model="groupData.groupRemark" clearable></el-input>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="费用合计">
          <span>{{tempTotal}} 元</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="编制人" >
          <span>{{groupData.groupEditor}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('groupData')">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'GroupForm',
  props: {
    formData: {
      type: Object
    }
  },
  watch: {
    formData: {
      handler (newValue, oldValue) {
        this.groupData = newValue
      },
      deep: true
    }
  },
  data () {
    return {
      groupData: this.formData,
      rules: {
        groupYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
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
        groupRent: [{ required: true, message: '请输入金额', trigger: 'change' }],
        groupOther: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      tempTotal: this.formData.groupTotal.toString().replace(/\B(?=(\d{3})+$)/g, ' , ')
    }
  },
  methods: {
    // 合计
    handleSum () {
      let total = this.groupData.groupSalary + this.groupData.groupAdministrative + this.groupData.groupFixedAssets +
        this.groupData.groupTraining + this.groupData.groupTechnology + this.groupData.groupEntertain +
        this.groupData.groupOperating + this.groupData.groupFinance + this.groupData.groupTaxes +
        this.groupData.groupAudit + this.groupData.groupLawyer + this.groupData.groupCertificate +
        this.groupData.groupMeal + this.groupData.groupOther + this.groupData.groupRent
      this.groupData.groupTotal = total
      this.tempTotal = total.toString().replace(/\B(?=(\d{3})+$)/g, ' , ')
    },
    // 取消修改
    handleCancel () {
      this.$emit('cancel')
    },
    // 确定修改
    handleConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将验证后的buildingData数据增减字段为groupData后提交
          console.log(JSON.stringify(this.groupData))
          this.$emit('confirm', this.groupData)
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
