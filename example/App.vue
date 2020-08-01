<template>
  <div>
    <app-header />
    <el-card header="ele-form演示" style="max-width:1200px;margin: 100px auto;">
      <ele-form
        v-model="formData"
        :form-desc="formDesc"
        :request-fn="handleSubmit"
        :rules="rules"
        @request-success="handleSuccess"
      ></ele-form>
    </el-card>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      // 表单数据
      formData: {},
      formDesc: {
        title: {
          type: 'input',
          label: '标题'
        },
        content: {
          type: 'textarea',
          label: '内容',
          required: true // 必填简写
        },
        type: {
          type: 'radio',
          label: '类型',
          default: 1,
          options: [
            { text: '自制', value: 1 },
            { text: '转载', value: 0 }
          ]
        },
        category: {
          type: 'cascader',
          label: '分区',
          options: [
            {
              value: 'dongman',
              label: '动漫',
              children: [
                { value: 'dongmanzatan', label: '动漫杂谈' },
                { value: 'donghuajishu', label: '动画技术' },
                { value: 'dongmanzixun', label: '动漫资讯' }
              ]
            },
            {
              value: 'biancheng',
              label: '编程',
              children: [
                { value: 'vue', label: 'Vue' },
                { value: 'css', label: 'CSS' },
                { value: 'html', label: 'HTML' },
                { value: 'js', label: 'JavaScript' }
              ]
            }
          ]
        },
        label: {
          type: 'tag',
          label: '标签'
        }
      },
      rules: {
        title: { required: true, type: 'string', message: '必须填写标题' },
        label: { required: true, message: '标签必须填写标题' }
      }
    }
  },
  methods: {
    handleSubmit(data) {
      // eslint-disable-next-line no-console
      console.log(data)
      return Promise.resolve()
    },
    handleSuccess() {
      this.$message.success('创建成功')
    }
  }
}
</script>

<style>
body {
  background-color: #efefef;
}
</style>
