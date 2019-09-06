<template>
  <div>
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
      </el-form-item>
      <el-form-item label="内容">
        <wang-editor :catchData="catchData" :content="form.newsContent"></wang-editor>
        <div class="el-form-item__error" v-show="isValue">内容不可为空</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import WangEditor from '../../components/WangEditor'
export default {
  beforeRouteEnter (to, from, next) {
    console.log(to.params)
    let newsId = to.params.id
    next(vm => {
      vm.$axios.post(`selectnewsdetail/${newsId}`)
        .then(rsp => {
          console.log(rsp)
          vm.setData(rsp.data.news[0])
          vm.form.newsId = newsId
        })
        .catch(error => { console.log(error) })
    })
  },
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
  name: 'news-modify',
  components: {
    WangEditor
  },
  methods: {
    setData (data) {
      console.log(data)
      this.form.newsTitle = data.newsTitle
      this.form.newsType = data.newsType
      this.form.newsIssuingTime = data.newsIssuingTime
      this.form.newsContent = data.newsContent // 与:content一起初始化内容
    },
    catchData (value) {
      this.form.newsContent = value // 在这里接受子组件变化时传过来的参数，赋值给data里的参数
      console.log('catchData:', value)
    },
    onSubmit (form) {
      let news = this.form
      let _this = this
      console.log(news)
      if (!this.form.newsContent) {
        _this.isValue = true
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          news.newsContent = _this.form.newsContent
          news.newsId = _this.$route.params.id
          console.log(JSON.stringify(news))
          this.$axios.post('/updateNews', JSON.stringify(news))
            .then(rsp => {
              console.log('updateNews success')
              console.log(rsp)
              _this.$alert('新闻修改成功！', '标题名称', {
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
