<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 10px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新闻中心</el-breadcrumb-item>
      <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item label="检索：">
        <el-select v-model="searchData.newsType" placeholder="新闻类型">
          <el-option label="赛事新闻" value="1"></el-option>
          <el-option label="健和资讯" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.newsTitle" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">查询</el-button>
      </el-form-item>
    </el-form>
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
        prop="newsId"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small"  @click="toDetail(scope.row.newsId)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float: left">
      <el-button @click="deleteNews">批量回收站</el-button>
    </div>
    <el-pagination
      background
      :page-size="searchData.size"
      :page-count="allpage"
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
      allpage: 1,
      tableData: [],
      multipleSelection: [],
      searchData: {
        newsType: '',
        newsTitle: '',
        page: 1,
        size: 10
      }
    }
  },
  created () {
    let _this = this
    this.getList(this.searchData, (data) => {
      _this.tableData = data.list
      _this.allpage = data.allpage
      _this.allsize = data.allsize
      console.log(_this.allpage)
    })
  },
  watch: {
    'searchData.page': function (val, oldval) {
      console.log(val)
      let _this = this
      this.getList(_this.searchData, (data) => {
        _this.tableData = data.list
      })
    }
  },
  methods: {
    getList (searchData, callback) {
      this.$axios.get('/selectnewstocontrol', {
        params: {
          'newsType': searchData.newsType,
          'newsTitle': searchData.newsTitle,
          'page': searchData.page,
          'size': searchData.size
        }
      })
        .then(rsp => {
          rsp.data.list.map(function (item, index, arr) {
            let t = item.newsType
            switch (t) {
              case '1':
                item.newsType = '赛事新闻'
                break
              case '2':
                item.newsType = '健和资讯'
                break
            }
          })
          // _this.tableData = rsp.data.list
          console.log(JSON.stringify(rsp.data))
          callback(rsp.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    searchList () {
      let _this = this
      this.getList(this.searchData, (data) => {
        _this.tableData = data.list
        _this.allpage = data.allpage
        _this.allsize = data.allsize
      })
    },
    toDetail (id) {
      console.log(id)
      this.$router.push({
        path: `/modifynews/${id}`
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    deleteNews (rows) {
      console.log(this.multipleSelection)
      // if (rows) {
      //   rows.forEach(row => {
      //     this.$refs.multipleTable.toggleRowSelection(row)
      //   })
      // } else {
      //   this.$refs.multipleTable.clearSelection()
      // }
    },
    clickPager (val) {
      // 点击前一页后一页，当前页也会变化，业务处理在这就行
      console.log('clickPager', val)
      this.searchData.page = val
    }
  }
}
</script>

<style scoped>
 /*.container {*/
   /*padding: 10px;*/
   /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
 /*}*/
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
