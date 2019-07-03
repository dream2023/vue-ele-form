<template>
  <ele-form
    :formData="formData"
    :formDesc="formDesc"
    :requestFn="handleSubmit"
  ></ele-form>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      formError: {},
      formData: {
        number: 10,
        date: '2019-10-20'
      },
      formDesc: {
        input: {
          label: '普通输入框',
          type: 'input',
          attrs: {
            placeholder: '请输入内容'
          }
        },
        password: {
          label: '密码框',
          type: 'password',
          attrs: {
            placeholder: '请输入内容'
          }
        },
        radio: {
          label: '单选框',
          type: 'radio',
          options: [
            { text: '男', value: 0, attrs: { disabled: true } },
            { text: '女', value: 1 }
          ]
        },
        select: {
          label: '选择器',
          type: 'select',
          options: [
            { text: '北京', value: 'beijing' },
            { text: '上海', value: 'shanghai' }
          ]
        },
        checkbox: {
          label: '多选框',
          type: 'checkbox',
          options: [
            { text: '北京', value: 'beijing' },
            { text: '上海', value: 'shanghai' }
          ]
        },
        time: {
          label: '时间',
          type: 'time'
        },
        date: {
          label: '日期',
          type: 'date'
        },
        datetime: {
          label: '日期时间',
          type: 'datetime'
        },
        number: {
          label: '数字',
          type: 'number'
        },
        switch: {
          label: '开关',
          type: 'switch'
        },
        slider: {
          label: '滑块',
          type: 'slider'
        },
        rate: {
          label: '评分',
          type: 'rate'
        },
        color: {
          label: '取色器',
          type: 'color',
          default: '#409EFF'
        },
        gallery: {
          label: '图片/视频展示',
          type: 'gallery',
          attrs: {
            size: 100
          },
          default: ['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg']
        },
        button: {
          label: '按钮',
          type: 'button',
          title: '按钮类型',
          attrs: {
            type: 'primary'
          }
        },
        'custom-url': {
          label: '自定义组件',
          type: 'custom-url'
        }
      }
    }
  },
  methods: {
    handleSubmit (data) {
      console.log(data)
    }
  },
  mounted () {}
}
</script>
