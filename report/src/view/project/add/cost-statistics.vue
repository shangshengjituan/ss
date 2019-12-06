<template>
  <el-card shadow="hover">
    <h4>成本统计表</h4>
    <el-divider></el-divider>
    <el-form :model="selectData" label-width="110px" label-position="right" >
      <el-row >
        <el-col :span="6">
          <el-form-item label="项目名称">
            <el-select v-model="selectData.table1ProjectId" placeholder="请选择项目名称" value="">
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
              v-model="selectData.table1ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="季度">
            <el-select v-model="selectData.table1Quarter" placeholder="请选择季度" value="">
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
    <div v-show="isShowUp" class="o-container">
      <el-divider />
      <get-statistics :basisData="selectData" :summaryData="currentSummaryUp"/>
    </div>
    <div v-show="isShow" class="o-container">
      <el-divider />
      <add-statistics :basisData="selectData" :summaryData="currentSummary" @fresh="handleFresh" />
    </div>
  </el-card>
</template>

<script>
import GetStatistics from '../../../components/project/GetStatistics'
import AddStatistics from '../../../components/project/AddStatistics'
export default {
  name: 'cost-statistics',
  components: {AddStatistics, GetStatistics},
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      selectData: {
        table1ProjectId: '',
        table1ProjectYear: '',
        table1Quarter: '',
        optionId: '' // 类型
      },
      options: this.$store.getters.addType[1].children, // 季度
      projectList: [],
      items: [], // 存放项目成本统计汇总表的类型名称
      isShowUp: false, // 上半部分子组件
      currentSummaryUp: {},
      isShow: false, // 当前子组件是否显示
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
        if (newVal.table1ProjectId && newVal.table1ProjectYear && newVal.table1Quarter && newVal.optionId) {
          this.getSummary(this.selectData)
        }
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
      })
    },
    getItems () {
      this.$api.project.getWorkName().then(rsp => {
        this.items = rsp.data.options
        console.log(this.items)
      })
    },
    getSummary () {
      this.$api.project.getSummary1(this.selectData).then(rsp => {
        if (rsp.data.checkRepeat === 200) {
          this.currentSummaryUp = rsp.data.projectIntroduction
        } else if (rsp.data.checkRepeat === 404) {
          this.currentSummaryUp = {}
          this.currentSummaryUp.projectManager = rsp.data.projectManager
        }
        this.isShowUp = true
        console.log(rsp.data)
        this.currentSummary = rsp.data.table1Summary
        this.isShow = true
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
