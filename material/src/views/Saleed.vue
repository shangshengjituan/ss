<template>
  <div>
    <vxe-radio-group v-model="type" size="medium">
      <vxe-radio-button label="1" content="销售收入"></vxe-radio-button>
      <vxe-radio-button label="2" content="运费"></vxe-radio-button>
    </vxe-radio-group>
    <!--<vxe-switch v-model="pattern" on-label="查看模式" off-label="操作模式"></vxe-switch>-->
    <!--<div v-if="!pattern">-->
      <!--<vxe-button @click="insertEvent(-1)">插入数据</vxe-button>-->
      <!--<vxe-button icon="fa fa-save" @click="saveEvent">保存</vxe-button>-->
    <!--</div>-->
    <div v-if="type === '1'">
      <vxe-toolbar ref="xToolbar1" >
        <template v-slot:buttons>
          <vxe-switch v-model="pattern" on-label="查看模式" off-label="操作模式"></vxe-switch>
          <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-table
        border ref="xTable1"
        :edit-config="{trigger: 'manual', mode: 'row', showIcon: false}" :data="tableData1">
        <vxe-table-column type="seq" title="#" width="50"></vxe-table-column>
        <vxe-table-column field="sale_date" title="日期" :sortable="pattern" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="project_id" title="项目名称" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="freight_id" title="品名" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="freight_id" title="规格" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="unit" title="单位" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="sale_quantity" title="数量" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="sale_area" title="面积（㎡）" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="sale_price" title="销售单价" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="sale_amount_tax" title="金额（含税）" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="sale_amount" title="金额（不含税）" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="tax" title="税额" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="hit_money" title="是否回款" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="receipt_number" title="已开发票号" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="client_id" title="客户" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="client_id" title="备注" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column title="操作" width="90">
          <template v-slot="{ row }">
            <vxe-button type="text" icon="el-icon-edit-outline" @click="editEvent(row)"></vxe-button>
            <vxe-button type="text" icon="el-icon-delete" @click="removeEvent(row)"></vxe-button>
          </template>
        </vxe-table-column>
        <template v-slot:empty><span><p>暂无数据</p></span></template>
      </vxe-table>
      <vxe-modal ref="xModal" v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" :loading="submitLoading" resize destroy-on-close>
        <!--<form-market :base-data="formData" />-->
        <form-sale :base-data="formData" @cancel="hideModal" />
        <!--<vxe-form :data="formData" :items="formItems" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent"></vxe-form>-->
      </vxe-modal>
    </div>
    <div v-if="type === '2'">
      <vxe-grid
        border stripe resizable height="500"
        :columns="tableColumn" :data="tableData2">
        <template v-slot:empty><span><p>暂无数据</p></span></template>
      </vxe-grid>
    </div>
  </div>
</template>

<script>
import FormSale from '../components/FormSale'
export default {
  name: 'Sale',
  components: { FormSale },
  data () {
    return {
      type: '1',
      pattern: false,
      loading: false,
      // model
      submitLoading: false,
      selectRow: null,
      showEdit: false,
      formData: {},
      tableData1: [],
      tableData2: [],
      tableColumn: [
        { type: 'seq', title: '#', width: 50 },
        { field: 'address', title: '日期', sortable: true },
        { field: 'address', title: '收入/支出' }, // 筛选，筛选后显示合计
        { field: 'address', title: '费用类别' },
        { field: 'address', title: '项目名称' },
        { field: 'address', title: '车型' },
        { field: 'address', title: '趟次' },
        { field: 'address', title: '基本公里数' },
        { field: 'address', title: '实际公里数' },
        {
          title: '含税金额',
          children: [
            { field: 'name', title: '单价' },
            { field: 'sex', title: '金额' }
          ]
        },
        {
          title: '不含税金额',
          children: [
            { field: 'name', title: '单价' },
            { field: 'sex', title: '金额' },
            { field: 'name', title: '税额' },
            { field: 'sex', title: '税率' }
          ]
        },
        { field: 'address', title: '发票号' },
        { field: 'address', title: '客户/承运商', showOverflow: true },
        { field: 'address', title: '备注' }
      ]
    }
  },
  created () {
    console.log(this)
  },
  methods: {
    insertEvent () {
      this.formData = {}
      this.selectRow = null
      this.showEdit = true
    },
    editEvent (row) {
      this.formData = {
        name: row.name,
        nickname: row.nickname,
        role: row.role,
        sex: row.sex,
        age: row.age,
        num: row.num,
        checkedList: row.checkedList,
        flag1: row.flag1,
        date3: row.date3,
        address: row.address
      }
      this.selectRow = row
      this.showEdit = true
    },
    removeEvent (row) {
      this.$XModal.confirm('您确定要删除吗？').then(type => {
        this.$XModal.message({ message: `点击了 ${type}` })
      })
      // this.$XModal.confirm('您确定要删除该数据?').then(type => {
      //   if (type === 'confirm') {
      //     this.$refs.xTable.remove(row)
      //   }
      // })
    },
    submitEvent () {
      this.submitLoading = true
      setTimeout(() => {
        this.submitLoading = false
        this.showEdit = false
        if (this.selectRow) {
          this.$XModal.message({ message: '保存成功', status: 'success' })
          Object.assign(this.selectRow, this.formData)
        } else {
          this.$XModal.message({ message: '新增成功', status: 'success' })
          this.$refs.xTable.insert(this.formData)
        }
      }, 500)
    },
    hideModal () {
      this.$refs.xModal.close()
    }
  }
}
</script>

<style scoped>

</style>
