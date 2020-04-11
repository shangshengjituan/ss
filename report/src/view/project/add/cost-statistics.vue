<template>
  <el-card shadow="hover">
    <!--<h4>成本统计表</h4>-->
    <!--<el-divider></el-divider>-->
    <el-form :model="selectData" label-width="150px" label-position="right" >
      <el-row >
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-select v-model="selectData.table1ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!--<el-col :span="6">-->
          <!--<el-form-item label="年份">-->
            <!--<el-date-picker-->
              <!--v-model="selectData.table1ProjectYear"-->
              <!--type="year" format="yyyy" value-format="yyyy"-->
              <!--:clearable="false" :editable="false"-->
              <!--placeholder="请选择年份">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="6">-->
          <!--<el-form-item label="季度">-->
            <!--<el-select v-model="selectData.table1Quarter" placeholder="请选择季度" value="">-->
              <!--<el-option-->
                <!--v-for="item in options"-->
                <!--:label="item.label" :key="item.value" :value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="6">-->
          <!--<el-form-item label="汇总类型">-->
            <!--<el-select v-model="selectData.optionId" placeholder="请选择类型" value="">-->
              <!--<el-option-->
                <!--v-for="item in items"-->
                <!--:label="item.optionName" :key="item.optionId" :value="item.optionId">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>
    </el-form>
    <div v-show="isShowUp" class="o-container">
      <get-statistics :basisData="selectData" :summaryData="currentSummaryUp"/>
    </div>
    <div v-show="isShowDown" class="o-container">
      <el-divider />
      <add-statistics :basisData="selectData" :items="items" />
    </div>
  </el-card>
</template>

<script>
import GetStatistics from '../../../components/project/GetStatistics'
import AddStatistics from '../../../components/project/AddStatistics'
export default {
  name: 'cost-statistics',
  components: {AddStatistics, GetStatistics},
  // inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      selectData: {
        table1ProjectId: ''
        // table1ProjectYear: '',
        // table1Quarter: '',
        // optionId: '' // 类型
      },
      options: this.$store.getters.addType[1].children, // 季度
      projectList: [],
      items: [], // 存放项目成本统计汇总表的类型名称
      isShowUp: false, // 上半部分子组件
      currentSummaryUp: {},
      isShowDown: false // 当前子组件是否显示
      // currentSummary: {} // 当前子组件数据
    }
  },
  created () {
    this.getProject()
    this.getItems()
  },
  watch: {
    selectData: {
      handler (newVal, oldVal) {
        if (newVal.table1ProjectId) {
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
        // this.currentSummary = rsp.data.table1Summary
        this.isShowDown = true
      })
    }
    // handleFresh () {
    //   this.reload() // 刷新
    // }
  }
}
</script>

<style scoped>
  table {
    border-top: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
  }
  th, td {
    padding: 6px;
    border-bottom: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;
  }
  td input {
    border: 0;
    padding: 10px 5px;
  }
</style>
