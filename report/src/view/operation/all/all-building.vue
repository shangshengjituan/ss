<template>
  <div class="o-container">
    <el-tabs>
      <!-- 成本汇总明细 -->
      <el-tab-pane label="成本汇总明细">
        <el-form class="search-form" :inline="true" :model="searchData">
          <el-form-item label="类型：">
            <el-select v-model="searchData.buildingEstimatedOrActual" placeholder="类型" value="">
              <el-option label="全部" value="0"></el-option>
              <el-option label="预估" value="1"></el-option>
              <el-option label="实际" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份：">
            <el-date-picker
              v-model="searchData.buildingYear"
              type="year"
              format="yyyy"
              value-format="yyyy"
              :editable="false"
              :clearable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList"> 查询 </el-button>
          </el-form-item>
        </el-form>
        <div v-show="role === 'superLeader'">
          <el-divider content-position="left"><span class="txt-brand">汇总数据</span></el-divider>
        </div>
        <el-table
          :data="tableData"
          border row-key="id" :indent="0"
          header-cell-class-name="header-row"
          :tree-props="{children: 'quarterCostList'}">
          <el-table-column prop="departmentName" label="部门" width="160" fixed></el-table-column>
          <el-table-column prop="buildingEOA" label="类型" width="68">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.buildingEstimatedOrActual === '1' ? 'primary' : 'warning'"
                disable-transitions>{{ scope.row.buildingEOA }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="buildingQ" label="季度" width="80"></el-table-column>
          <el-table-column prop="buildingSalary" label="工资"></el-table-column>
          <el-table-column prop="buildingAdministrative" label="行政费用"></el-table-column>
          <el-table-column prop="buildingFixedAssets" label="固定资产投资"></el-table-column>
          <el-table-column prop="buildingTraining" label="培训费"></el-table-column>
          <el-table-column prop="buildingTechnology" label="科技创新费"></el-table-column>
          <el-table-column prop="buildingEntertain" label="招待费"></el-table-column>
          <el-table-column prop="buildingOperating" label="经营费"></el-table-column>
          <el-table-column prop="buildingFinance" label="财务费用"></el-table-column>
          <el-table-column prop="buildingTaxes" label="各类税费"></el-table-column>
          <el-table-column prop="buildingOther" label="其他费用"></el-table-column>
          <el-table-column prop="buildingTotal" label="费用合计"></el-table-column>
          <el-table-column prop="buildingRemark" label="备注"></el-table-column>
          <el-table-column prop="buildingEditor" label="编制人"></el-table-column>
          <el-table-column prop="buildingEditorDate" label="编制时间" width="120"></el-table-column>
          <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.buildingQuarter !== '0' || scope.row.buildingEstimatedOrActual !== '2'"
                @click="clickUpdate(scope.row)"
                type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="role === 'superLeader'">
          <el-divider content-position="left"><span class="txt-brand">实际 合计</span></el-divider>
          <el-table
            :data="ActualTotal"
            border row-key="id" :indent="0"
            header-cell-class-name="header-row">
            <el-table-column prop="buildingSalary" label="工资"></el-table-column>
            <el-table-column prop="buildingAdministrative" label="行政费用"></el-table-column>
            <el-table-column prop="buildingFixedAssets" label="固定资产投资"></el-table-column>
            <el-table-column prop="buildingTraining" label="培训费"></el-table-column>
            <el-table-column prop="buildingTechnology" label="科技创新费"></el-table-column>
            <el-table-column prop="buildingEntertain" label="招待费"></el-table-column>
            <el-table-column prop="buildingOperating" label="经营费"></el-table-column>
            <el-table-column prop="buildingFinance" label="财务费用"></el-table-column>
            <el-table-column prop="buildingTaxes" label="各类税费"></el-table-column>
            <el-table-column prop="buildingOther" label="其他费用"></el-table-column>
            <el-table-column prop="buildingTotal" label="费用合计"></el-table-column>
          </el-table>
          <el-divider content-position="left"><span class="txt-brand">预估 合计</span></el-divider>
          <el-table
            :data="EstimateTotal"
            border row-key="id" :indent="0"
            header-cell-class-name="header-row">
            <el-table-column prop="buildingSalary" label="工资"></el-table-column>
            <el-table-column prop="buildingAdministrative" label="行政费用"></el-table-column>
            <el-table-column prop="buildingFixedAssets" label="固定资产投资"></el-table-column>
            <el-table-column prop="buildingTraining" label="培训费"></el-table-column>
            <el-table-column prop="buildingTechnology" label="科技创新费"></el-table-column>
            <el-table-column prop="buildingEntertain" label="招待费"></el-table-column>
            <el-table-column prop="buildingOperating" label="经营费"></el-table-column>
            <el-table-column prop="buildingFinance" label="财务费用"></el-table-column>
            <el-table-column prop="buildingTaxes" label="各类税费"></el-table-column>
            <el-table-column prop="buildingOther" label="其他费用"></el-table-column>
            <el-table-column prop="buildingTotal" label="费用合计"></el-table-column>
          </el-table>
        </div>
        <!-- 修改页面 -->
        <el-dialog title="修改" :visible.sync="dialogVisible">
          <building-form :form-data="dialogData" @confirm="confirmUpdate" @cancel="cancelDialog"></building-form>
        </el-dialog>
      </el-tab-pane>
      <!-- 成本汇总总表 -->
      <el-tab-pane label="成本汇总总表">
        <el-form class="search-form" :inline="true" :model="searchSummaryData">
          <el-form-item label="年份：">
            <el-date-picker
              v-model="searchSummaryData.buildingYear"
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
import BuildingForm from '../../../components/operation/BuildingForm'
import TotalForm from '../../../components/operation/TotalForm'
export default {
  name: 'AllBuilding',
  components: {TotalForm, BuildingForm},
  data () {
    return {
      searchData: {
        buildingYear: new Date().getFullYear().toString(),
        buildingEstimatedOrActual: '0',
        departmentId: this.$store.getters.departmentId, // store 所属部门，权限
        plateId: this.$store.getters.plateId // store 所属板块
      },
      buildingLists: [],
      ActualTotal: [],
      EstimateTotal: [],
      role: this.$store.getters.role,
      dialogData: {}, // 对话框的表单值
      dialogVisible: false, // 对话框是否显示
      searchSummaryData: {
        buildingYear: new Date().getFullYear().toString(),
        departmentId: this.$store.getters.departmentId, // store 所属部门，权限
        plateId: this.$store.getters.plateId // store 所属板块
      },
      summaryLists: []
    }
  },
  created () {
    this.getList()
    this.getSummaryList()
  },
  computed: {
    tableData: {
      get () {
        return this.formatList(this.buildingLists)
      },
      set () {
        return this.formatList(this.buildingLists)
      }
    }
  },
  methods: {
    getList () {
      this.$api.operation.getBuilding(this.searchData)
        .then(rsp => {
          console.log('getBuilding Success')
          this.buildingLists = rsp.data.buildingLists
          this.ActualTotal = rsp.data.ActualTotal
          this.EstimateTotal = rsp.data.EstimateTotal
        })
        .catch(error => {
          console.log(error)
        })
    },
    formatList (list) {
      list.forEach(function (item, index, arr) {
        item.buildingEOA = item.buildingEstimatedOrActual === '1' ? '预估' : '实际'
        item.buildingQ = (item.buildingQuarter === '0' || item.buildingQuarter === '') ? '全年' : '不明'
        item.buildingType = item.buildingEOA // 新增的字段,用于修改页面的类型展示
        if (item.buildingEditorDate) {
          item.buildingEditorDate = item.buildingEditorDate.slice(0, 10)
        } else {
          item.buildingEditorDate = ''
        }
        if (item.quarterCostList) {
          item.quarterCostList.forEach(function (item, index, arr) {
            item.buildingEOA = item.buildingEstimatedOrActual === '1' ? '预估' : '实际'
            item.buildingEditorDate = item.buildingEditorDate.slice(0, 10)
            switch (item.buildingQuarter) {
              case '1': item.buildingQ = '第一季度'
                break
              case '2': item.buildingQ = '第二季度'
                break
              case '3': item.buildingQ = '第三季度'
                break
              case '4': item.buildingQ = '第四季度'
                break
              default: item.buildingQ = '不明'
                break
            }
            item.buildingType = item.buildingEOA + ' / ' + item.buildingQ
          })
        }
      })
      return list
    },
    getSummaryList () {
      this.$api.operation.getBuildingSummary(this.searchSummaryData)
        .then(rsp => {
          this.summaryLists = rsp.data.buildingSummaryLists
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
      this.$api.operation.updateBuilding(data)
        .then(rsp => {
          let data = rsp.data
          if (data.result === '200') {
            this.$message.success('修改成功！')
            this.getList()
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
