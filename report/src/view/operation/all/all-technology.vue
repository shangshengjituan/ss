<template>
  <div class="o-container">
    <el-tabs type="border-card">
      <!-- 成本汇总明细 -->
      <el-tab-pane label="成本汇总明细">
        <el-form class="search-form" :inline="true" :model="searchData">
          <el-form-item label="类型：">
            <el-select v-model="searchData.techEstimatedOrActual" placeholder="类型" value="">
              <el-option label="全部" value="0"></el-option>
              <el-option label="预估" value="1"></el-option>
              <el-option label="实际" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份：">
            <el-date-picker
              v-model="searchData.techYear"
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
          border
          row-key="id"
          :default-expand-all="role === 'leader'"
          :indent="0"
          header-cell-class-name="header-row"
          :tree-props="{children: 'techQuarterList'}">
          <el-table-column prop="departmentName" label="部门" width="160" fixed></el-table-column>
          <el-table-column prop="techEOA" label="类型" width="68">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.techEstimatedOrActual === '1' ? 'primary' : 'warning'"
                disable-transitions>{{ scope.row.techEOA }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="techQ" label="季度" width="80"></el-table-column>
          <el-table-column prop="techSalary" label="工资"></el-table-column>
          <el-table-column prop="techAdministrative" label="行政费用"></el-table-column>
          <el-table-column prop="techFixedAssets" label="固定资产投资"></el-table-column>
          <el-table-column prop="techTraining" label="培训费"></el-table-column>
          <el-table-column prop="techTechnology" label="科技创新费"></el-table-column>
          <el-table-column prop="techEntertain" label="招待费"></el-table-column>
          <el-table-column prop="techOperating" label="经营费"></el-table-column>
          <el-table-column prop="techFinance" label="财务费用"></el-table-column>
          <el-table-column prop="techTaxes" label="各类税费"></el-table-column>
          <el-table-column prop="techAudit" label="审计费"></el-table-column>
          <el-table-column prop="techLawyer" label="律师费用"></el-table-column>
          <el-table-column prop="techCertificate" label="证书费用"></el-table-column>
          <el-table-column prop="techMeal" label="伙食费用"></el-table-column>
          <el-table-column prop="techRent" label="房租费用"></el-table-column>
          <el-table-column prop="techOther" label="其他费用"></el-table-column>
          <el-table-column prop="techTotal" label="费用合计"></el-table-column>
          <el-table-column prop="techRemark" label="备注"></el-table-column>
          <el-table-column prop="techEditor" label="编制人"></el-table-column>
          <el-table-column prop="techEditorDate" label="编制时间" width="120"></el-table-column>
          <el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.techQuarter !== '0' || scope.row.techEstimatedOrActual !== '2'"
                @click="clickUpdate(scope.row)"
                type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="role === 'superLeader'">
          <el-divider content-position="left"><span class="txt-brand">实际 合计</span></el-divider>
          <el-table
            :data="ActualTotal"
            border
            row-key="id"
            header-cell-class-name="header-row"
            :indent="0">
            <el-table-column prop="techSalary" label="工资"></el-table-column>
            <el-table-column prop="techAdministrative" label="行政费用"></el-table-column>
            <el-table-column prop="techFixedAssets" label="固定资产投资"></el-table-column>
            <el-table-column prop="techTraining" label="培训费"></el-table-column>
            <el-table-column prop="techTechnology" label="科技创新费"></el-table-column>
            <el-table-column prop="techEntertain" label="招待费"></el-table-column>
            <el-table-column prop="techOperating" label="经营费"></el-table-column>
            <el-table-column prop="techFinance" label="财务费用"></el-table-column>
            <el-table-column prop="techTaxes" label="各类税费"></el-table-column>
            <el-table-column prop="techAudit" label="审计费"></el-table-column>
            <el-table-column prop="techLawyer" label="律师费用"></el-table-column>
            <el-table-column prop="techCertificate" label="证书费用"></el-table-column>
            <el-table-column prop="techMeal" label="伙食费用"></el-table-column>
            <el-table-column prop="techRent" label="房租费用"></el-table-column>
            <el-table-column prop="techOther" label="其他费用"></el-table-column>
            <el-table-column prop="techTotal" label="费用合计"></el-table-column>
          </el-table>
          <el-divider content-position="left"><span class="txt-brand">预估 合计</span></el-divider>
          <el-table
            :data="EstimateTotal"
            border
            row-key="id"
            header-cell-class-name="header-row"
            :indent="0">
            <el-table-column prop="techSalary" label="工资"></el-table-column>
            <el-table-column prop="techAdministrative" label="行政费用"></el-table-column>
            <el-table-column prop="techFixedAssets" label="固定资产投资"></el-table-column>
            <el-table-column prop="techTraining" label="培训费"></el-table-column>
            <el-table-column prop="techTechnology" label="科技创新费"></el-table-column>
            <el-table-column prop="techEntertain" label="招待费"></el-table-column>
            <el-table-column prop="techOperating" label="经营费"></el-table-column>
            <el-table-column prop="techFinance" label="财务费用"></el-table-column>
            <el-table-column prop="techTaxes" label="各类税费"></el-table-column>
            <el-table-column prop="techAudit" label="审计费"></el-table-column>
            <el-table-column prop="techLawyer" label="律师费用"></el-table-column>
            <el-table-column prop="techCertificate" label="证书费用"></el-table-column>
            <el-table-column prop="techMeal" label="伙食费用"></el-table-column>
            <el-table-column prop="techRent" label="房租费用"></el-table-column>
            <el-table-column prop="techOther" label="其他费用"></el-table-column>
            <el-table-column prop="techTotal" label="费用合计"></el-table-column>
          </el-table>
        </div>
        <!-- 修改页面 -->
        <el-dialog title="修改" :visible.sync="dialogVisible">
          <tech-form :form-data="dialogData" @confirm="confirmUpdate" @cancel="cancelDialog"></tech-form>
        </el-dialog>
      </el-tab-pane>
      <!-- 成本汇总总表 -->
      <el-tab-pane label="成本汇总总表">
        <el-form class="search-form" :inline="true" :model="searchSummaryData">
          <el-form-item label="年份：">
            <el-date-picker
              v-model="searchSummaryData.techYear"
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
import TotalForm from '../../../components/operation/TotalForm'
import TechForm from '../../../components/operation/TechForm'
export default {
  name: 'AllTechnology',
  components: { TechForm, TotalForm },
  data () {
    return {
      searchData: {
        techYear: new Date().getFullYear().toString(),
        techEstimatedOrActual: '0',
        departmentId: this.$store.getters.departmentId, // store
        plateId: this.$store.getters.plateId // store
      },
      techLists: [], // 全部数据
      ActualTotal: [], // 实际数据求和
      EstimateTotal: [], // 预估数据求和
      role: this.$store.getters.role,
      dialogData: {}, // 对话框的表单值
      dialogVisible: false, // 对话框是否显示
      searchSummaryData: {
        techYear: new Date().getFullYear().toString(),
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
        return this.formatList(this.techLists)
      },
      set () {
        return this.formatList(this.techLists)
      }
    }
  },
  methods: {
    getList () {
      this.$api.operation.getTech(this.searchData)
        .then(rsp => {
          console.log('getTech Success')
          this.techLists = rsp.data.techLists
          this.ActualTotal = rsp.data.ActualTotal
          this.EstimateTotal = rsp.data.EstimateTotal
        })
        .catch(error => {
          console.log(error)
        })
    },
    formatList (list) {
      list.forEach(function (item, index, arr) {
        item.techEOA = item.techEstimatedOrActual === '1' ? '预估' : '实际'
        item.techQ = (item.techQuarter === '0' || item.techQuarter === '') ? '全年' : '不明'
        item.techType = item.techEOA // 新增的字段,用于修改页面的类型展示
        // 格式化日期
        if (item.techEditorDate) {
          item.techEditorDate = item.techEditorDate.slice(0, 10)
        } else {
          item.techEditorDate = ''
        }
        // 实际下面的每季度
        if (item.techQuarterList) {
          item.techQuarterList.forEach(function (item, index, arr) {
            item.techEOA = item.techEstimatedOrActual === '1' ? '预估' : '实际'
            item.techEditorDate = item.techEditorDate.slice(0, 10)
            switch (item.techQuarter) {
              case '1':
                item.techQ = '第一季度'
                break
              case '2':
                item.techQ = '第二季度'
                break
              case '3':
                item.techQ = '第三季度'
                break
              case '4':
                item.techQ = '第四季度'
                break
              default:
                item.techQ = '不明'
                break
            }
            item.techType = item.techEOA + ' / ' + item.techQ
          })
        }
      })
      return list
    },
    getSummaryList () {
      this.$api.operation.getTechSummary(this.searchSummaryData)
        .then(rsp => {
          this.summaryLists = rsp.data.techSummaryLists
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 点击编辑，跳出修改框
    clickUpdate (data) {
      this.dialogData = data
      this.dialogVisible = true
    },
    cancelDialog () {
      this.dialogVisible = false
    },
    confirmUpdate (data) {
      this.$api.operation.updateTech(data)
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
