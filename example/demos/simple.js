export default `<template>
  <!-- 左右拖动, 可体验响应式表单 -->
  <ele-form
    :formData="formData"
    :formDesc="formDesc"
    :request-fn="handleSubmit"
    :rules="rules"
    @request-success="handleSuccess"
  ></ele-form>
</template>

<script>
  export default {
    data() {
      return {
        rules: {
          title: [
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        formDesc: {
          author: {
            children: {
              first: {
                type: 'input',
                label: '姓',
                layout: 8,
                required: true
              },
              second: {
                type: 'input',
                label: '名',
                layout: 16,
                required: true,
                disabled: data => !data.author.first
              }
            }
          },
          title: {
            type: 'input',
            label: '标题',
            rules: [{ required: true, message: '请输入标题', trigger: 'blur' }]
          },
          content: {
            type: 'textarea',
            label: '内容',
            required: true,
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
            vif(data) {
              return data.original === 1
            }
          },
          sourceUrl: {
            type: 'input',
            label: '来源地址',
            vif(data) {
              return data.original === 0
            },
            slots: {
              prepend(h) {
                return h('span', 'http://')
              },
              append(h) {
                return h('span', '.com')
              }
            }
          }
        },
        formData: {}
      }
    },
    methods: {
      handleSubmit(data) {
        return Promise.resolve()
      },
      handleSuccess() {
        this.$message.success('创建成功')
      }
    }
  }
</script>
`
