<template>
  <el-card shadow="hover">
    <h4>成本统计表</h4>
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
            <el-cascader
              placeholder="请选择类型"
              v-model="selectData.optionId"
              :options="items"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <add-summary v-show="isShow" :basisData="selectData" :summaryData="currentSummary" @fresh="handleFresh" />
  </el-card>
</template>

<script>
import AddSummary from '../../../components/project/AddSummary'
export default {
  name: 'cost-summary',
  components: {AddSummary},
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
        optionId: '' // 类型
      },
      options: this.$store.getters.addType[1].children, // 季度
      projectList: [],
      items: [], // 存放项目成本统计汇总表的类型名称
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
        if (newVal.table2ProjectId && newVal.table2ProjectYear && newVal.table2Quarter && newVal.optionId) {
          console.log(oldVal)
          this.getSummary({
            table2ProjectId: newVal.table2ProjectId,
            table2ProjectYear: newVal.table2ProjectYear,
            table2Quarter: newVal.table2Quarter,
            specificOptionId: newVal.optionId[1]
          })
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
      this.$api.project.getOptions().then(rsp => {
        rsp.data.options.forEach((item, index, arr) => {
          let keyMap = {'optionId': 'value', 'optionName': 'label'}
          let obj = Object.keys(item).reduce((newData, key) => {
            let newKey = keyMap[key] || key
            newData[newKey] = item[key]
            return newData
          }, {})
          obj.children = []
          this.items.push(obj)
          if (item.children) {
            item.children.forEach((it, i, arr) => {
              let keyMap = {'specificOptionId': 'value', 'specificOptionName': 'label'}
              let obj = Object.keys(it).reduce((newData, key) => {
                let newKey = keyMap[key] || key
                newData[newKey] = it[key]
                return newData
              }, {})
              this.items[index].children.push(obj)
            })
          }
        })
        console.log(this.items)
      })
    },
    getSummary (data) {
      this.$api.project.getSummary(data).then(rsp => {
        if (rsp.data.result === 404) {
          this.$message.warning(rsp.data.resultText)
          this.isShow = false
        } else if (rsp.data.result === 200) {
          this.currentSummary = rsp.data
          this.isShow = true
        }
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
