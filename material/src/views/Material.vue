<template>
  <div>
    <el-form :inline="true" class="top-form">
      <el-form-item label="月份">
        <el-date-picker
          v-model="selectData.month" format="yyyy年MM月" value-format="yyyy-MM" size="small"
          type="month" placeholder="选择月" :editable="false" :clearable="false"></el-date-picker>
      </el-form-item>
      <el-form-item label="分类">
        <el-cascader v-model="selectData.type" :options="options" :show-all-levels="false" size="small"></el-cascader>
      </el-form-item>
    </el-form>
    <div style="text-align: right">
      <el-button-group>
        <el-button v-show="selectData.type[0] !=='辅材'" @click="handleUpdate" type="danger" plain>更新库存</el-button>
        <el-button @click="handleDelete" type="warning">删除选中行</el-button>
        <!--<el-button @click="handleEditShow" type="warning">编辑选中行</el-button>-->
        <el-button @click="handleShow" type="primary" icon="el-icon-plus">新增数据</el-button>
      </el-button-group>
    </div>
    <el-table v-show="selectData.type[0] !=='辅材'" ref="normalTable"
      :data="tableData" border style="width: 100%" header-cell-class-name="top-table" highlight-current-row
      :show-summary="isSummary" :summary-method="getSummaries" @filter-change="filterChange" @current-change="handleCurrentChange">
      <el-table-column type="index" label="#" width="50"/>
      <el-table-column prop="materialStatisticDate" label="日期"/>
      <el-table-column
        prop="purchaseUser" label="采购/领用" column-key="purchaseUser"
        :filters="kinds" :filter-multiple="false" :filter-method="filterTag" filter-placement="bottom-end">
      </el-table-column>
      <el-table-column prop="rawMaterialCategory" label="原材料大类"/>
      <el-table-column prop="specificProductName" label="具体品名"/>
      <el-table-column prop="materialUnit" label="单位"/>
      <el-table-column prop="materialQuantity" label="数量"/>
      <el-table-column label="含税总金额">
        <el-table-column prop="materialPriceTax" label="单价"/>
        <el-table-column prop="materialAmountTax" label="金额"/>
      </el-table-column>
      <el-table-column label="不含税总金额">
        <el-table-column prop="materialPrice" label="单价"/>
        <el-table-column prop="materialAmount" label="金额"/>
        <el-table-column prop="tax" label="税额"/>
        <el-table-column prop="taxRate" label="税率"/>
      </el-table-column>
      <el-table-column prop="materialUser" label="用途"/>
      <el-table-column prop="receiptNumber" label="发票号"/>
      <el-table-column prop="supplier" label="供应商" show-overflow-tooltip/>
      <el-table-column prop="remark" label="备注"/>
    </el-table>
    <el-table
      v-show="selectData.type[0] ==='辅材'" ref="auxiliaryTable"
      :data="tableAuxiliaryData" border style="width: 100%" header-cell-class-name="top-table"  highlight-current-row
      :show-summary="isSummary1" :summary-method="getSummaries" @filter-change="filterChange" @current-change="handleCurrentChange">
      <el-table-column type="index" label="#" width="50"/>
      <el-table-column prop="auxiliaryMaterialDate" label="日期"/>
      <el-table-column prop="auxiliaryMaterialName" label="材料名称"/>
      <el-table-column prop="auxiliaryMaterialUnit" label="单位"/>
      <el-table-column prop="materialQuantity" label="数量"/>
      <el-table-column label="含税总金额">
        <el-table-column prop="materialPriceTax" label="单价"/>
        <el-table-column prop="materialAmountTax" label="金额"/>
      </el-table-column>
      <el-table-column label="不含税总金额">
        <el-table-column prop="materialPrice" label="单价"/>
        <el-table-column prop="materialAmount" label="金额"/>
        <el-table-column prop="tax" label="税额"/>
        <el-table-column prop="taxRate" label="税率"/>
      </el-table-column>
      <el-table-column prop="useSort" label="用途" />
      <el-table-column
        prop="useDetail" label="详细用途" column-key="useDetail"
        :filters="usages" :filter-multiple="false" :filter-method="filterTag" filter-placement="bottom-end"/>
      <el-table-column prop="receiptNumber" label="发票号"/>
      <el-table-column prop="supplierName" label="供应商" show-overflow-tooltip/>
      <el-table-column prop="remark" label="备注"/>
    </el-table>
    <el-table
      v-if="surData.length > 0" style="margin-top: 15px;width: 802px" @current-change="handleCurrentChangeSur"
      :data="surData" border header-cell-class-name="top-table" highlight-current-row>
      <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label" />
    </el-table>
    <div v-if="surData.length > 0 && currentRowSur && currentRowSur.purchaseUser === '实际量'">
      <el-button-group>
        <el-button @click="handleDeleteSur" type="warning">删除选中实际量</el-button>
      </el-button-group>
    </div>
    <el-dialog :title="isEdit ? `编辑 ${selectData.type[0]|| ''} 数据` : `新增 ${selectData.type[0] || '' } 数据`" :visible.sync="showForm">
      <material-material v-show="selectData.type[0] !=='辅材'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
      <material-auxiliary v-show="selectData.type[0] ==='辅材'" :base-data="baseData" :isEdit="isEdit" @cancel="handleHide" @primary="handleHideFresh"/>
    </el-dialog>
    <el-dialog title="更新库存" :visible.sync="showSurForm">
      <material-real @cancel="handleSurHide" @primary="handleSurHideFresh"/>
    </el-dialog>
  </div>
</template>

<script>
import thead from '@/util/materialThead'
import MaterialMaterial from '../components/Material/MaterialMaterial'
import MaterialReal from '../components/Material/MaterialReal'
import MaterialAuxiliary from '../components/Material/MaterialAuxiliary'
export default {
  name: 'Material',
  components: { MaterialAuxiliary, MaterialReal, MaterialMaterial },
  data () {
    return {
      selectData: {
        month: this.$utils.toDateString(new Date(), 'yyyy-MM'),
        type: ''
      },
      tableHead: thead.normal,
      options: [],
      showForm: false,
      isEdit: false,
      baseData: {},
      kinds: [],
      tableData: [],
      currentRow: {},
      currentRowSur: {},
      isSummary: false, // 是否合计
      filterLength: 0, // 筛选后数据条数
      surData: [],
      showSurForm: false,
      tableAuxiliaryData: [], // 辅材
      usages: [],
      isSummary1: true,
      filterLength1: 0
    }
  },
  created () {
    this.getMaterials()
    this.getBase()
  },
  watch: {
    selectData: {
      handler (val, old) {
        if (val.type[0] === '辅材') {
          this.$refs.auxiliaryTable.clearFilter()
          this.tableHead = thead.auxiliary
        } else {
          this.$refs.normalTable.clearFilter()
          this.tableHead = thead.normal
        }
        this.getList()
      },
      deep: true
    }
  },
  methods: {
    getMaterials () {
      this.$api.material.getMaterials().then(rsp => {
        const temp = []
        rsp.data.forEach((item, index) => {
          temp.push({
            label: item.rawMaterialCategory,
            value: item.rawMaterialCategory
          })
          if (item.specificProductNameList) {
            Object.assign(temp[index], { children: [] })
            item.specificProductNameList.forEach(it => {
              temp[index].children.push({
                label: it.specificProductName,
                value: it.materialId
              })
            })
          }
        })
        console.log(temp)
        this.options = temp
      })
    },
    getList () {
      if (!this.selectData.month || !this.selectData.type) {
        this.$message({ type: 'warning', message: '请选择查询类别', duration: 1000 })
        return
      }
      if (this.selectData.type[1]) {
        // 外加剂
        this.$api.material.getAddList({
          materialStatisticDate: this.selectData.month,
          materialId: this.selectData.type[1]
        }).then(rsp => {
          this.$message({ type: 'success', message: '查询成功', duration: 1000 })
          this.tableData = rsp.data
          this.surData = rsp.total
        })
      } else if (this.selectData.type[0] === '辅材') {
        this.$api.material.getAuxiliaryList({
          auxiliaryMaterialDate: this.selectData.month
        }).then(rsp => {
          this.$message({ type: 'success', message: '查询成功', duration: 1000 })
          this.tableAuxiliaryData = rsp.data
          this.surData = rsp.total
        })
      } else {
        // 其他
        this.$api.material.getList({
          materialStatisticDate: this.selectData.month,
          rawMaterialCategory: this.selectData.type[0]
        }).then(rsp => {
          this.$message({ type: 'success', message: '查询成功', duration: 1000 })
          this.tableData = rsp.data
          this.surData = rsp.total
        })
      }
    },
    getBase () {
      this.$api.material.getKinds().then(rsp => {
        this.kinds = rsp.data.map((item) => {
          return { text: item.purchaseUser, value: item.purchaseUser }
        })
      })
      this.$api.material.getUsages().then(rsp => {
        this.usages = rsp.data.map((item) => {
          return { text: item.useDetail, value: item.useDetail }
        })
      })
    },
    handleShow () {
      this.showForm = true
      this.isEdit = false
      this.baseData = {}
      console.log(JSON.stringify(this.baseData))
    },
    // handleEditShow () {
    //   this.showForm = true
    //   this.isEdit = true
    //   this.baseData = this.currentRow
    // },
    handleHide () {
      this.showForm = false
    },
    handleHideFresh () {
      this.handleHide()
      this.getList()
    },
    handleSurHide () {
      this.showSurForm = false
    },
    handleSurHideFresh () {
      this.handleSurHide()
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleUpdate () {
      this.showSurForm = true
    },
    handleDelete () {
      console.log(JSON.stringify(this.currentRow))
      if (JSON.stringify(this.currentRow) === '{}') return
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        this.deleteItem(this.currentRow)
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除', duration: 1000 })
      })
    },
    deleteItem (item) {
      if (this.selectData.type[0] !== '辅材') {
        this.$api.material.delItem({
          materialStatisticId: item.materialStatisticId
        }).then(rsp => {
          if (rsp.result === 200) {
            this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
            this.getList()
          } else {
            this.$message({ type: 'error', message: rsp.resultText })
          }
        })
      } else {
        this.$api.material.delAuxiliaryItem({
          auxiliaryMaterialId: item.auxiliaryMaterialId
        }).then(rsp => {
          if (rsp.result === 200) {
            this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
            this.getList()
          } else {
            this.$message({ type: 'error', message: rsp.resultText })
          }
        })
      }
    },
    handleDeleteSur () {
      console.log(JSON.stringify(this.currentRowSur))
      if (JSON.stringify(this.currentRowSur) === '{}' || this.currentRowSur.purchaseUser !== '实际量') return
      this.$confirm('此操作将永久删除该条实际量, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        this.$api.material.delRealItem({
          materialStatisticId: this.currentRowSur.materialStatisticId
        }).then(rsp => {
          if (rsp.result === 200) {
            this.$message({ type: 'success', message: '删除成功!', duration: 1000 })
            this.getList()
          } else {
            this.$message({ type: 'error', message: rsp.resultText })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除', duration: 1000 })
      })
    },
    handleCurrentChangeSur (val) {
      this.currentRowSur = val
    },
    getSummaries (params) {
      console.log('get summary')
      const { columns, data } = params
      const sums = []
      let [demo, demo1, demo2, demo3] = [0, 0, 0, 0]
      data.forEach((columns) => {
        demo = this.$utils.add(columns.materialAmountTax, demo)
        demo1 = this.$utils.add(columns.materialAmount, demo1)
        demo2 = this.$utils.add(columns.tax, demo2)
        demo3 = this.$utils.add(columns.materialQuantity, demo3)
      })
      columns.forEach((columns, index) => {
        if (index === 0) sums[index] = '合计'
        switch (columns.property) {
          case 'materialAmountTax': sums[index] = demo
            break
          case 'materialAmount': sums[index] = demo1
            break
          case 'tax': sums[index] = demo2
            break
          case 'materialQuantity': sums[index] = demo3
            break
        }
      })
      return sums
    },
    filterTag (value, row) {
      if (this.selectData.type[0] !== '辅材') {
        if (row.purchaseUser === value) {
          this.filterLength++
        }
        return row.purchaseUser === value
      } else {
        console.log('filterTag')
        if (row.useDetail === value) {
          this.filterLength1++
        }
        return row.useDetail === value
      }
    },
    filterChange (filters) {
      if (this.selectData.type[0] !== '辅材') {
        this.isSummary = this.filterLength > 0 && filters.purchaseUser.length > 0
        this.filterLength = 0
      } else {
        console.log(filters)
        // this.isSummary1 = this.filterLength1 > 0 && filters.useDetail.length > 0
        // console.log(this.isSummary1)
        this.filterLength1 = 0
      }
    }
  }
}
</script>

<style scoped>
  .el-table .cell {
  white-space: nowrap !important;
}
</style>
