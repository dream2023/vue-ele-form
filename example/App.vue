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
        number: 10
      },
      formDesc: {
        // input: {
        //   label: '普通输入框',
        //   type: 'input',
        //   attrs: {
        //     placeholder: '请输入内容'
        //   }
        // },
        // password: {
        //   label: '密码框',
        //   type: 'password',
        //   attrs: {
        //     placeholder: '请输入内容'
        //   }
        // },
        // date: {
        //   label: '日期',
        //   type: 'date'
        // },
        number: {
          label: '数字',
          type: 'number',
          displayFormatter (value) {
            return value + 10
          },
          valueFormatter (value) {
            return value + 1
          }
        }
        // switch: {
        //   label: '开关',
        //   type: 'switch'
        // },
        // rate: {
        //   label: '评分',
        //   type: 'rate'
        // },
        // color: {
        //   label: '取色器',
        //   type: 'color',
        //   default: '#409EFF'
        // },
        // gallery: {
        //   label: '图片/视频展示',
        //   type: 'gallery',
        //   attrs: {
        //     size: 100
        //   },
        //   default: ['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg']
        // },
        // button: {
        //   label: '按钮',
        //   type: 'button',
        //   title: '按钮类型',
        //   attrs: {
        //     type: 'primary'
        //   }
        // },
        // 'custom-url': {
        //   label: '自定义组件',
        //   type: 'custom-url'
        // }
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
