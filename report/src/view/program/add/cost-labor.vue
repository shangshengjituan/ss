<template>
  <el-card shadow="hover">
    <h4>项目人工费明细统计表</h4>
    <el-divider></el-divider>
    <el-form :model="laborfeeschedule1" :rules="rules" ref="laborfeeschedule1" label-width="110px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input v-model="laborfeeschedule1.ProjectId" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="buildingYear">
            <el-date-picker
              v-model="laborfeeschedule1.Year"
              type="year"
              format="yyyy"
              value-format="yyyy"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="value">
            <el-select v-model="laborfeeschedule1.Quarter" placeholder="请选择" value="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工作内容明细" prop="buildingSalary">
            <el-input v-model.number="laborfeeschedule1.WorkTypeId" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="班组" prop="buildingSalary">
            <el-input v-model.number="laborfeeschedule1.Team" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="单位" prop="buildingSalary">
            <el-input v-model.number="laborfeeschedule1.Unit" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="合同工程量" prop="buildingSalary">
            <el-input v-model.number="laborfeeschedule1.ContractQuantity" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际工程量" prop="buildingAdministrative">
            <el-input v-model.number="laborfeeschedule1.ActualEngineeringQuantity" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="责任人工单价" prop="buildingTraining">
            <el-input v-model.number="laborfeeschedule1.ResponsibleLaborUnitPrice" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="责任人工费" prop="buildingTechnology">
            <el-input v-model.number="laborfeeschedule1.ResponsibleLaborFee" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际人工单价" prop="buildingEntertain">
            <el-input v-model.number="laborfeeschedule1.ActualLaborUnitPrice" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="实际人工费" prop="buildingOperating">
            <el-input v-model.number="laborfeeschedule1.ActualLaborCost" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人工费差额" prop="buildingFinance">
            <el-input v-model.number="laborfeeschedule1.LaborCostDifference" type='number' clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="laborfeeschedule1.Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <span>{{laborfeeschedule1.Editor}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('laborfeeschedule1')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-labor',
  data () {
    return {
      departmentName: this.$store.getters.departmentName,
      laborfeeschedule1: {
        ProjectId: '',
        Quarter: '',
        Team: '',
        Unit: '',
        ContractQuantity: '',
        ActualEngineeringQuantity: '',
        ResponsibleLaborUnitPrice: '',
        ResponsibleLaborFee: '',
        ActualLaborUnitPrice: '',
        ActualLaborCost: '',
        LaborCostDifference: '',
        Remark: '',
        Editor: ''
      },
      options: this.$store.getters.addType[1].children,
      rules: {
        ProjectId: '',
        Quarter: '',
        Team: '',
        Unit: '',
        ContractQuantity: '',
        ActualEngineeringQuantity: '',
        ResponsibleLaborUnitPrice: '',
        ResponsibleLaborFee: '',
        ActualLaborUnitPrice: '',
        ActualLaborCost: '',
        LaborCostDifference: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
