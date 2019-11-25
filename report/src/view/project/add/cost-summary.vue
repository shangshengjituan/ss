<template>
  <el-card shadow="hover">
    <h4>项目经营费用统计</h4>
    <el-divider></el-divider>
    <el-form :model="selectData" label-width="110px" label-position="right" >
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="项目名称">
            <el-select v-model="selectData.table2ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年份">
            <el-date-picker
              v-model="selectData.table2ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="季度">
            <el-select v-model="selectData.table2Quarter" placeholder="请选择季度" value="">
              <el-option
                v-for="item in options"
                :label="item.label" :key="item.value" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="汇总类型">
            <el-select v-model="selectData.optionId" placeholder="请选择类型" value="">
              <el-option
                v-for="item in items"
                :label="item.optionName" :key="item.optionId" :value="item.optionId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <keep-alive>
      <component :is="currentComponent" :basisData="selectData" :summaryData="currentSummary" @fresh="handleFresh"></component>
    </keep-alive>
  </el-card>
</template>

<script>
import Labor from '../../../components/summary/Labor'
import Material from '../../../components/summary/Material'
import Living from '../../../components/summary/Living'
import Machine from '../../../components/summary/Machine'
import SubWork from '../../../components/summary/SubWork'
import Manage from '../../../components/summary/Manage'
import Fees from '../../../components/summary/Fees'
import Safety from '../../../components/summary/Safety'
import TempFacility from '../../../components/summary/TempFacility'
import Tax from '../../../components/summary/Tax'
export default {
  name: 'cost-summary',
  components: {Tax, TempFacility, Safety, Fees, Manage, SubWork, Machine, Living, Material, Labor},
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      selectData: {
        table2ProjectId: '',
        table2ProjectYear: '',
        table2Quarter: '',
        optionId: ''
      },
      rules: {
        table2ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table2ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table2Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        optionId: [{ required: true, message: '不可为空', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: [],
      items: [], // 存放项目成本统计汇总表的类型名称
      tempMap: new Map([
        [1, 'Labor'], [2, 'Material'], [3, 'Living'], [4, 'Machine'], [5, 'SubWork'], [6, 'Manage'], [7, 'Fees'], [8, 'Safety'], [9, 'Tax'], [10, 'TempFacility']
      ]),
      currentComponent: '', // 当前子组件
      currentSummary: {} // 当前子组件数据
    }
  },
  created () {
    this.getProject()
    this.getItems()
  },
  watch: {
    selectData: {
      handler (newVal, oldVal) {
        if (newVal.table2ProjectId && newVal.table2ProjectYear && newVal.table2Quarter && newVal.optionId) {
          this.getSummary()
        }
        console.log(this.currentComponent)
      },
      deep: true
    }
  },
  methods: {
    getProject () {
      this.$api.project.getProjectList({
        departmentId: this.departmentId,
        plateId: this.plateId
      }).then(rsp => {
        this.projectList = rsp.data.list
        console.log(this.projectList)
      })
    },
    getItems () {
      this.$api.project.getOptions().then(rsp => {
        this.items = rsp.data.options
        console.log(this.items)
      })
    },
    getSummary () {
      this.$api.project.getSummary(this.selectData).then(rsp => {
        this.currentSummary = rsp.data
        this.currentComponent = this.tempMap.get(this.selectData.optionId)
        console.log(rsp.data)
      })
    },
    handleFresh () {
      this.reload() // 刷新
    }
  }
}
</script>

<style scoped>

</style>
