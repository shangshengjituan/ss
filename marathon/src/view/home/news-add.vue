<template>
  <div>
    <!--<el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 10px">-->
      <!--<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>新闻中心</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>新闻新增</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <!--<el-divider></el-divider>-->
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" @submit.native.prevent>
    <el-form-item label="标题" prop="newsTitle">
      <el-input v-model="form.newsTitle"></el-input>
    </el-form-item>
    <el-form-item label="新闻类别" prop="newsType">
      <el-select v-model="form.newsType" placeholder="请选择新闻类别">
        <el-option label="赛事新闻" value="1"></el-option>
        <el-option label="健和资讯" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="显示时间" prop="newsIssuingTime">
      <el-date-picker
        v-model="form.newsIssuingTime"
        type="datetime"
        :editable="false"
        placeholder="选择日期时间">
      </el-date-picker>
      <!--<el-col :span="11">-->
        <!--<el-date-picker type="date" placeholder="选择日期" v-model="date1" style="width: 100%;"></el-date-picker>-->
      <!--</el-col>-->
      <!--<el-col class="line" :span="1">-</el-col>-->
      <!--<el-col :span="11">-->
        <!--<el-time-picker placeholder="选择时间" v-model="date2" style="width: 100%;"></el-time-picker>-->
      <!--</el-col>-->
    </el-form-item>
    <el-form-item label="内容">
      <wang-editor :catchData="catchData" :content="form.newsContent"></wang-editor>
      <div class="el-form-item__error" v-show="isValue">内容不可为空</div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import WangEditor from '../../components/WangEditor'
export default {
  data () {
    return {
      form: {
        newsTitle: '',
        newsType: '',
        newsIssuingTime: '',
        newsContent: '',
        newsCreateName: 'test'
      },
      rules: {
        newsTitle: [
          { required: true, message: '请输入新闻名称', trigger: 'blur' },
          { min: 3, max: 45, message: '长度在 3 到 45 个字符', trigger: 'blur' }
        ],
        newsType: [
          { required: true, message: '请选择新闻类型', trigger: 'change' }
        ],
        newsIssuingTime: [
          { required: true, message: '请选择日期时间', trigger: 'change' }
        ]
      },
      isValue: false
    }
  },
  name: 'news-add',
  components: {
    WangEditor
  },
  methods: {
    catchData (value) {
      this.newsContent = value // 在这里接受子组件传过来的参数，赋值给data里的参数
      console.log(value)
    },
    onSubmit (form) {
      let news = this.form
      let _this = this
      console.log(news)
      if (!this.newsContent) {
        _this.isValue = true
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          news.newsContent = _this.newsContent
          console.log(JSON.stringify(news))
          this.$axios.post('/insertNews', JSON.stringify(news))
            .then(rsp => {
              console.log('insertNews success')
              // console.log(rsp)
              _this.$alert('新闻创建成功！', '标题名称', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push({path: '/sortnews'})
                }
              })
            })
            .catch(error => { console.log(error) })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.el-form-item {
  width: 680px;
}
</style>
