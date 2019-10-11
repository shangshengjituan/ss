<template>
  <el-form :model="sportData" :rules="rules" ref="sportData" label-width="110px" label-position="right" >
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="单位名称" prop="departmentId">
          <el-select v-model="sportData.departmentId" placeholder="请选择部门">
            <el-option label="健和公司" value="22"></el-option>
            <el-option label="泉湖圣竟公司" value="23"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="年份" prop="sportYear">
          <el-date-picker
            v-model="sportData.sportYear"
            type="year"
            format="yyyy"
            value-format="yyyy"
            placeholder="请选择年份">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="明细类型" prop="value">
          <el-cascader
            v-model="sportData.value"
            :options="options"
            @change="handleChange"></el-cascader>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工资" prop="sportSalary">
          <el-input v-model.number="sportData.sportSalary" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="培训费" prop="sportTraining">
          <el-input v-model.number="sportData.sportTraining" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="招待费" prop="sportEntertain">
          <el-input v-model.number="sportData.sportEntertain" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="经营费" prop="sportOperating">
          <el-input v-model.number="sportData.sportOperating" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="房租费" prop="sportRent">
          <el-input v-model.number="sportData.sportRent" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="水电费" prop="sportHydropower">
          <el-input v-model.number="sportData.sportHydropower" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="伙食费" prop="sportMeal">
          <el-input v-model.number="sportData.sportMeal" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="行政费用" prop="sportAdministrative">
          <el-input v-model.number="sportData.sportAdministrative" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="财务费用" prop="sportFinance">
          <el-input v-model.number="sportData.sportFinance" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="各类税费" prop="sportTaxes">
          <el-input v-model.number="sportData.sportTaxes" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="宣传费用" prop="sportPropaganda">
          <el-input v-model.number="sportData.sportPropaganda" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="其他费用" prop="sportOther">
          <el-input v-model.number="sportData.sportOther" type="number" clearable><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="备注">
      <el-input v-model="sportData.sportRemark" clearable></el-input>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="费用合计">
          <span>{{totalCost}} 元</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="编制人">
          <span>{{sportData.sportEditor}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="validateData('sportData')">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'SportForm'
  }
</script>

<style scoped>

</style>
