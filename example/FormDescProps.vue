<template>
  <demo-card
    :formDesc="formDesc"
    :initCode="initCode"
    :request-fn="handleSubmit"
    @request-success="handleSuccess"
    field="formDesc"
    title="form-desc props属性详解"
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
  name: {
    // 类型: ele-form 内置了20多种类型 和 多种扩展类型
    // https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g
    type: 'input',
    // form-item 的 label 属性值
    label: '姓名',
    // 渲染组件的属性, 具体可参考相应类型组件的属性
    // 例如, input组件属性列表有: https://element.eleme.cn/#/zh-CN/component/input#input-attributes
    attrs: {
      maxlength: 4
    },
    // 栅格布局, 值范围为: 1 - 24
    layout: 12,
    // 提示
    tip: '名字不能超过4个字'
  },
  job: {
    type: 'select',
    label: '职位',
    layout: 12,
    // 默认值
    default: 1,
    // select / radio / checkbox 等 options 列表
    // 类型可以为 对象数组 / 基本类型数组 / Promise对象 / 函数
    // https://www.yuque.com/chaojie-vjiel/vbwzgu/rgenav
    options: [
      // 对象数组类型
      // text: 显示文本, value: 值, attrs: option的自定义属性
      { text: '前端工程工程师', value: 1 },
      { text: '后端工程工程师', value: 2 },
      { text: '移动端工程工程师', value: 3, attrs: { disabled: true } }
    ]
  },
  language: {
    type: 'checkbox',
    label: '所学语言',
    // 联动 隐藏 / 显示, 另外还有 联动启动 / 禁用
    // https://www.yuque.com/chaojie-vjiel/vbwzgu/loffm6
    vif (data) { return data.job },
    // 是否开启联动加载options
    isReloadOptions: true,
    // 函数类型的 options
    options (data) {
      let language = []
      switch(data.job) {
        case 1:
          // options内容为: 基本类型数组
          language = ['html', 'js', 'css']
          break
        case 2:
          language = ['java', 'go', 'nodejs']
          break
        case 3:
          language = ['swift', 'Kotlin', 'flutter']
          break
      }
      return language
    }
  }
}
`
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
