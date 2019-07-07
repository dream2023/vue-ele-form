<template>
  <ele-form
    :form-data="formData"
    :form-desc="formDesc"
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
      formData: {},
      formDesc: {
        cover: {
          type: 'image',
          label: '文章封面',
          attrs: {
            size: 150
          }
        },
        title: {
          type: 'input',
          label: '标题',
          default: '111'
        },
        time: {
          label: '开赛时间',
          type: 'datetime',
          default: new Date(),
          attrs: {
            clearable: true,
            'default-time': '12:00:00',
            format: 'yyyy-MM-dd HH:mm',
            placeholder: '选择比赛开始时间'
          }
        },
        desc: {
          type: 'textarea',
          label: '简介'
        },
        content: {
          type: 'rich-text',
          label: '文章内容'
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
        date: { required: true, message: 'date填写标题' }
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
    setTimeout(() => {
      this.formData = {
        time: '2019-07-01 08:00'
      }
    }, 2000)
  }
}
</script>
