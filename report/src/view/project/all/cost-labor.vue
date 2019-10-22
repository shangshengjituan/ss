<template>
  <div class="o-container">
    <el-form class="search-form" :inline="true" :model="searchData">
      <el-form-item label="项目：">
        <el-select v-model="searchData.table3ProjectId" placeholder="请选择项目" value="">
          <el-option
            v-for="item in projectList"
            :label="item.projectName" :key="item.id" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份：">
        <el-date-picker
          v-model="searchData.table3ProjectYear"
          type="year" format="yyyy" value-format="yyyy"
          :editable="false" :clearable="false"
          placeholder="请选择年份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="季度：">
        <el-select v-model="searchData.table3Quarter" placeholder="请选择季度" value="">
          <el-option
            v-for="item in options"
            :label="item.label" :key="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList"> 查询 </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData" border row-key="id" :indent="0"
      header-cell-class-name="header-row">
      <el-table-column prop="jobDetail" label="工作内容明细" />
      <el-table-column prop="table3Unit" label="单位" />
      <el-table-column prop="table3ContractQuantity" label="合同工程量" />
      <el-table-column prop="table3ActualEngineeringQuantity" label="实际工程量" />
      <el-table-column prop="table3ResponsibleLaborUnitPrice" label="责任人工单价（元）" />
      <el-table-column prop="table3ResponsibleLaborFee" label="责任人工费（元）" />
      <el-table-column prop="table3ActualLaborUnitPrice" label="实际人工单价（元）" />
      <el-table-column prop="table3ActualLaborCost" label="实际人工费（元）" />
      <el-table-column prop="table3LaborCostDifference" label="人工费差额（元）" />
      <el-table-column prop="table3Remark" label="备注" />
      <el-table-column prop="table3Editor" label="编制人" />
      <el-table-column prop="table3EditorDate" label="编制时间" />
      <!--<el-table-column v-if="role === 'leader'" fixed="right" label="操作" width="60">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button-->
            <!--@click="clickUpdate(scope.row)"-->
            <!--type="text" size="small">编辑</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'cost-labor',
  data () {
    return {
      searchData: {
        table3ProjectYear: new Date().getFullYear().toString(),
        table3ProjectId: '',
        table3Quarter: ''
      },
      departmentId: this.$store.getters.departmentId,
      plateId: this.$store.getters.plateId,
      role: this.$store.getters.role,
      projectList: [],
      options: this.$store.getters.addType[1].children,
      list: []
    }
  },
  created () {
    this.getProject()
    // this.getList()
  },
  computed: {
    tableData: {
      get () {
        return this.formatList(this.list)
      },
      set () {
        return this.formatList(this.list)
      }
    }
  },
  methods: {
    getProject () {
      this.$api.project.getProjectList({
        departmentId: this.departmentId,
        plateId: this.plateId

      })
        .then(rsp => {
          console.log(rsp.data)
          this.projectList = rsp.data.list
        })
    },
    getList () {
      this.$api.project.getTable3(this.searchData)
        .then(rsp => {
          console.log('getTable3 Success')
          if (rsp.data.result === 200) {
            this.list = rsp.data.list
          } else if (rsp.data.result === 404) {
            this.$message.warning(rsp.data.resultText)
            this.list = rsp.data.list
          } else {
            this.$message.error('未知错误，查询失败！')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    formatList (list) {
      if (!list) {
        return []
      }
      list.forEach(function (item, index, arr) {
        if (item.table3EditorDate) {
          item.table3EditorDate = item.table3EditorDate.slice(0, 10)
        } else {
          item.table3EditorDate = ''
        }
      })
      return list
    }
  }
}
</script>

<style scoped>

</style>
