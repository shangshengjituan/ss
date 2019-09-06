<template>
  <div class="container">
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="newsTitle"
        label="新闻标题">
      </el-table-column>
      <el-table-column
        prop="newsType"
        label="新闻类型">
      </el-table-column>
      <el-table-column
        prop="newsIssuingTime"
        label="发表时间">
      </el-table-column>
      <el-table-column
        prop="newsCreateName"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="newsCreateTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">还原</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float: left">
      <el-button @click="deleteNews">批量删除</el-button>
    </div>
    <el-pagination
      background
      :page-size="10"
      :total="100"
      layout="prev, pager, next"
      @current-change="clickPager">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'news-sort',
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      formDate: {
        newsType: '',
        newsTitle: ''
      }
    }
  },
  created () {
    let _this = this
    this.$axios.get('/selectnewstocontrol', {
      params: {
        'newsType': '1'
      }
    })
      .then(rsp => {
        _this.tableData = rsp.data.list
        console.log(rsp.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    deleteNews () {
      console.log(this.multipleSelection)
    },
    clickPager (val) {
      // 点击前一页后一页，当前页也会变化，业务处理在这就行
      console.log('clickPager', val)
    }
  }
}
</script>

<style scoped>
  .el-form,
  .el-table {
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-pagination {
    text-align: right;
  }
</style>
