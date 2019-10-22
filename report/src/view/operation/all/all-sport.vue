<template>
  <div class="o-container">
    <el-tabs type="border-card">
      <!-- 文体板块单位 -->
      <el-tab-pane label="文体板块单位">
        <el-form class="search-form" :inline="true" :model="searchData">
          <el-form-item label="类型：">
            <el-select v-model="searchData.sportEstimatedOrActual" placeholder="类型" value="">
              <el-option label="全部" value="0"></el-option>
              <el-option label="预估" value="1"></el-option>
              <el-option label="实际" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份：">
            <el-date-picker
              v-model="searchData.sportYear"
              type="year"
              format="yyyy"
              value-format="yyyy"
              :editable="false"
              :clearable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getSportList"> 查询 </el-button>
          </el-form-item>
        </el-form>
        <div v-show="role === 'superLeader'">
          <el-divider content-position="left"><span class="txt-brand">汇总数据</span></el-divider>
        </div>
        <el-table
          :data="tableData"
          border
          row-key="id"
          :indent="0"
          :default-expand-all="role === 'leader'"
          header-cell-class-name="header-row"
          :tree-props="{children: 'sportQuarterList'}">
          <el-table-column prop="departmentName" label="部门" width="160"></el-table-column>
          <el-table-column prop="sportEOA" label="类型" width="68">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.sportEstimatedOrActual === '1' ? 'primary' : 'warning'"
                disable-transitions>{{ scope.row.sportEOA }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sportQ" label="季度" width="80"></el-table-column>
          <el-table-column prop="sportSalary" label="工资"></el-table-column>
          <el-table-column prop="sportTraining" label="培训费"></el-table-column>
          <el-table-column prop="sportEntertain" label="招待费"></el-table-column>
          <el-table-column prop="sportOperating" label="经营费"></el-table-column>
          <el-table-column prop="sportRent" label="房租费"></el-table-column>
          <el-table-column prop="sportHydropower" label="水电费"></el-table-column>
          <el-table-column prop="sportMeal" label="伙食费"></el-table-column>
          <el-table-column prop="sportAdministrative" label="行政费用"></el-table-column>
          <el-table-column prop="sportFinance" label="财务费用"></el-table-column>
          <el-table-column prop="sportTaxes" label="各类税费"></el-table-column>
          <el-table-column prop="sportPropaganda" label="宣传费用"></el-table-column>
          <el-table-column prop="sportOther" label="其他费用"></el-table-column>
          <el-table-column prop="sportTotal" label="费用合计"></el-table-column>
          <el-table-column prop="sportRemark" label="备注"></el-table-column>
          <el-table-column prop="sportEditor" label="编制人"></el-table-column>
          <el-table-column prop="sportEditorDate" label="编制时间" width="120"></el-table-column>
          <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.sportQuarter !== '0' || scope.row.sportEstimatedOrActual !== '2'"
                @click="clickUpdate(scope.row)"
                type="text" size="small">编辑</el-button>
            </template>
          </el-table-column></el-table>
        <div v-show="role === 'superLeader'">
          <el-divider content-position="left"><span class="txt-brand">实际 合计</span></el-divider>
          <el-table
            :data="ActualTotal"
            border
            row-key="id"
            header-cell-class-name="header-row"
            :indent="0">
            <el-table-column prop="sportSalary" label="工资"></el-table-column>
            <el-table-column prop="sportTraining" label="培训费"></el-table-column>
            <el-table-column prop="sportEntertain" label="招待费"></el-table-column>
            <el-table-column prop="sportOperating" label="经营费"></el-table-column>
            <el-table-column prop="sportRent" label="房租费"></el-table-column>
            <el-table-column prop="sportHydropower" label="水电费"></el-table-column>
            <el-table-column prop="sportMeal" label="伙食费"></el-table-column>
            <el-table-column prop="sportAdministrative" label="行政费用"></el-table-column>
            <el-table-column prop="sportFinance" label="财务费用"></el-table-column>
            <el-table-column prop="sportTaxes" label="各类税费"></el-table-column>
            <el-table-column prop="sportPropaganda" label="宣传费用"></el-table-column>
            <el-table-column prop="sportOther" label="其他费用"></el-table-column>
            <el-table-column prop="sportTotal" label="费用合计"></el-table-column>
          </el-table>
          <el-divider content-position="left"><span class="txt-brand">预估 合计</span></el-divider>
          <el-table
            :data="EstimateTotal"
            border
            row-key="id"
            header-cell-class-name="header-row"
            :indent="0">
            <el-table-column prop="sportSalary" label="工资"></el-table-column>
            <el-table-column prop="sportTraining" label="培训费"></el-table-column>
            <el-table-column prop="sportEntertain" label="招待费"></el-table-column>
            <el-table-column prop="sportOperating" label="经营费"></el-table-column>
            <el-table-column prop="sportRent" label="房租费"></el-table-column>
            <el-table-column prop="sportHydropower" label="水电费"></el-table-column>
            <el-table-column prop="sportMeal" label="伙食费"></el-table-column>
            <el-table-column prop="sportAdministrative" label="行政费用"></el-table-column>
            <el-table-column prop="sportFinance" label="财务费用"></el-table-column>
            <el-table-column prop="sportTaxes" label="各类税费"></el-table-column>
            <el-table-column prop="sportPropaganda" label="宣传费用"></el-table-column>
            <el-table-column prop="sportOther" label="其他费用"></el-table-column>
            <el-table-column prop="sportTotal" label="费用合计"></el-table-column>
          </el-table>
        </div>
        <!-- 修改页面 -->
        <el-dialog title="修改" :visible.sync="dialogVisible">
          <sport-form :form-data="dialogData" @confirm="confirmUpdate" @cancel="cancelDialog"></sport-form>
        </el-dialog>
      </el-tab-pane>
      <!-- 赛事活动 -->
      <el-tab-pane label="赛事活动">
        <el-form :inline="true" :model="searchData1">
          <el-form-item label="年份：">
            <el-date-picker
              v-model="searchData1.activityYear"
              type="year" format="yyyy" value-format="yyyy"
              :editable="false" :clearable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getActivityList"> 查询 </el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData1" border row-key="id" :indent="0"
          header-cell-class-name="header-row">
          <el-table-column prop="activityName" label="赛事活动名称"></el-table-column>
          <el-table-column prop="activityTime" label="赛事活动时间"></el-table-column>
          <el-table-column prop="activityLocation" label="赛事活动地点"></el-table-column>
          <el-table-column prop="activityOperatingUnit" label="赛事运营单位"></el-table-column>
          <el-table-column prop="activityEstimatedCost" label="预估运营成本"></el-table-column>
          <el-table-column prop="activityActualCost" label="实际运营成本"></el-table-column>
          <el-table-column prop="activityRemark" label="备注"></el-table-column>
          <el-table-column prop="activityEditor" label="编制人"></el-table-column>
          <el-table-column prop="activityEditorDate" label="编制日期"></el-table-column>
          <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button type="text" size="small"
                v-show="scope.row.sportQuarter !== '0' || scope.row.sportEstimatedOrActual !== '2'"
                @click="clickUpdate1(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 修改页面 -->
        <el-dialog title="修改" :visible.sync="dialogVisible1">
          <activity-form :form-data="dialogData1" @confirm="confirmUpdate1" @cancel="cancelDialog1"></activity-form>
        </el-dialog>
      </el-tab-pane>
      <!-- 成本汇总总表 -->
      <el-tab-pane label="成本汇总总表">
        <el-form class="search-form" :inline="true" :model="searchSummaryData">
          <el-form-item label="年份：">
            <el-date-picker
              v-model="searchSummaryData.sportYear"
              type="year" format="yyyy" value-format="yyyy"
              :editable="false" :clearable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getSummaryList"> 查询 </el-button>
          </el-form-item>
        </el-form>
        <total-form :table-data="summaryLists"></total-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SportForm from '../../../components/operation/SportForm'
import ActivityForm from '../../../components/operation/ActivityForm'
import TotalForm from '../../../components/operation/TotalForm'
export default {
  name: 'AllSport',
  components: {TotalForm, ActivityForm, SportForm},
  data () {
    return {
      // sport
      searchData: {
        sportYear: new Date().getFullYear().toString(),
        sportEstimatedOrActual: '0', // 类型
        departmentId: this.$store.getters.departmentId, // store 所属部门，权限
        plateId: this.$store.getters.plateId // store 所属板块
      },
      sportLists: [],
      ActualTotal: [],
      EstimateTotal: [],
      role: this.$store.getters.role,
      // activity
      searchData1: {
        activityYear: new Date().getFullYear().toString()
      },
      activityList: [],
      // 对话框 修改
      dialogData: {}, // 对话框的表单值
      dialogVisible: false, // 对话框是否显示
      dialogData1: {},
      dialogVisible1: false,
      searchSummaryData: {
        sportYear: new Date().getFullYear().toString(),
        departmentId: this.$store.getters.departmentId, // store 所属部门，权限
        plateId: this.$store.getters.plateId // store 所属板块
      },
      summaryLists: []
    }
  },
  created () {
    this.getSportList()
    this.getActivityList()
    this.getSummaryList()
  },
  computed: {
    tableData: {
      get () {
        return this.formatList(this.sportLists)
      },
      set () {
        return this.formatList(this.sportLists)
      }
    },
    tableData1: {
      get () {
        return this.formatList1(this.activityList)
      },
      set () {
        return this.formatList1(this.activityList)
      }
    }
  },
  methods: {
    getSportList () {
      this.$api.operation.getSport(this.searchData)
        .then(rsp => {
          console.log('getSport Success')
          this.sportLists = rsp.data.sportLists
          this.ActualTotal = rsp.data.ActualTotal
          this.EstimateTotal = rsp.data.EstimateTotal
        })
        .catch(error => {
          console.log(error)
        })
    },
    getActivityList () {
      this.$api.operation.getActivity(this.searchData1)
        .then(rsp => {
          console.log('getActivity Success')
          this.activityList = rsp.data.activityList
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 修改 /selectsportform 响应的数据
    formatList (list) {
      list.forEach(function (item, index, arr) {
        item.sportEOA = item.sportEstimatedOrActual === '1' ? '预估' : '实际'
        item.sportQ = (item.sportQuarter === '0' || item.sportQuarter === '') ? '全年' : '不明'
        item.sportType = item.sportEOA // 新增的字段,用于修改页面的类型展示
        if (item.sportEditorDate) {
          item.sportEditorDate = item.sportEditorDate.slice(0, 10)
        } else {
          item.sportEditorDate = ''
        }
        if (item.sportQuarterList) {
          item.sportQuarterList.forEach(function (item, index, arr) {
            item.sportEOA = item.sportEstimatedOrActual === '1' ? '预估' : '实际'
            item.sportEditorDate = item.sportEditorDate.slice(0, 10)
            switch (item.sportQuarter) {
              case '1': item.sportQ = '第一季度'
                break
              case '2': item.sportQ = '第二季度'
                break
              case '3': item.sportQ = '第三季度'
                break
              case '4': item.sportQ = '第四季度'
                break
              default: item.sportQ = '不明'
                break
            }
            item.sportType = item.sportEOA + ' / ' + item.sportQ
          })
        }
      })
      return list
    },
    formatList1 (list) {
      list.forEach(function (item, index, arr) {
        if (item.activityEditorDate) {
          item.activityEditorDate = item.activityEditorDate.slice(0, 10)
        } else {
          item.activityEditorDate = ''
        }
      })
      return list
    },
    getSummaryList () {
      this.$api.operation.getSportSummary(this.searchSummaryData)
        .then(rsp => {
          this.summaryLists = rsp.data.sportSummaryLists
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 点击编辑，跳出修改框
    clickUpdate (data) {
      // console.log(data)
      this.dialogData = data
      this.dialogVisible = true
    },
    cancelDialog () {
      this.dialogVisible = false
    },
    confirmUpdate (data) {
      this.$api.operation.updateSport(data)
        .then(rsp => {
          let data = rsp.data
          if (data.result === '200') {
            this.$message.success('修改成功！')
            this.getSportList()
          } else {
            this.$message.error('修改失败：' + data.resultText)
          }
          console.log(rsp)
          this.dialogVisible = false
        })
    },
    clickUpdate1 (data) {
      // console.log(data)
      this.dialogData1 = data
      this.dialogVisible1 = true
    },
    cancelDialog1 () {
      this.dialogVisible1 = false
    },
    confirmUpdate1 (data) {
      this.$api.operation.updateActivity(data)
        .then(rsp => {
          let data = rsp.data
          if (data.result === '200') {
            this.$message.success('修改成功！')
            this.getActivityList()
          } else {
            this.$message.error('修改失败：' + data.resultText)
          }
          console.log(rsp)
          this.dialogVisible = false
        })
    }
  }
}
</script>

<style>
</style>
