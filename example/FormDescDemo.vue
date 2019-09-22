<template>
  <demo-card
    :formDesc="formDesc"
    :initCode="initCode"
    :request-fn="handleSubmit"
    @request-success="handleSuccess"
    field="formDesc"
    title="form-desc 简单示例"
    type="attr"
  />
</template>

<script>
import DemoCard from './DemoCard'

export default {
  name: 'Demo',
  components: {
    DemoCard
  },
  data () {
    return {
      formDesc: {},
      initCode: `{
  author: {
    type: 'input',
    label: '作者',
    default: 'dream2023',
    attrs: { disabled: true }
  },
  title: {
    type: 'input',
    label: '标题'
  },
  content: {
    type: 'textarea',
    label: '内容',
    attrs: {
      autosize: { minRows: 4, maxRows: 10 }
    }
  },
  original: {
    type: 'radio',
    label: '是否为原创',
    options: [
      { text: '原创', value: 1 },
      { text: '转载', value: 0 }
    ]
  },
  reprinted: {
    type: 'switch',
    label: '是否可转载',
    vif (data) {
      return data.original === 1
    }
  },
  sourceUrl: {
    type: 'input',
    label: '来源地址',
    vif (data) {
      return data.original === 0
    },
    slots: {
      prepend (h) {
        return h('span', 'http://')
      },
      append (h) {
        return h('span', '.com')
      }
    }
  }
}`
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
  }
}
</script>
