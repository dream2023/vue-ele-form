<template>
  <ele-form
    :form-data="formData"
    :form-desc="formDesc"
    :label-width="100"
    :request-fn="handleSubmit"
    :rules="rules"
    @request-success="handleSuccess"
  ></ele-form>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      formData: {
        title: null
      },
      formDesc: {
        title: {
          type: 'input',
          label: '标题'
        },
        content: {
          type: 'textarea',
          label: '内容'
        },
        type: {
          type: 'checkbox',
          label: '类型',
          // default: [1],
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
        title: { required: true, type: 'string', message: '必须填写标题' }
      }
    }
  },
  methods: {
    handleSubmit (data) {
      console.log(data)
      return Promise.resolve()
    },
    handleSuccess () {
      this.$message.success('创建成功')
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.formData.title = 'eee'
    //   this.formData.type = [1]
    //   // this.formData = {
    //   //   title: 'eee'
    //   // }
    // }, 1000)
  }
}
</script>
