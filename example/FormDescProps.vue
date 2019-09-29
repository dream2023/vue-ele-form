<template>
  <el-card
    class="demo-card"
    header="form-desc props详细说明"
    shadow="never"
  >
    <div class="form-desc-props">
      <ele-form
        :formData="formData"
        :formDesc="formDesc"
        :isResponsive="false"
        :request-fn="handleSubmit"
        @request-success="handleSuccess"
      />
      <codemirror
        @input="handleCodeChange"
        v-model="code"
      />
    </div>
  </el-card>
</template>

<script>
export default {
  inject: ['checkType'],
  data () {
    return {
      formDesc: {},
      code: `{
  name: {
    // 1.类型: ele-form 内置了20多种类型 和 多种扩展类型
    // https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g
    type: 'input',
    // 2.form-item 的 label 属性值
    label: '姓名',
    // 3.渲染组件的属性, 具体可参考相应类型组件的属性
    // 例如, input组件属性列表有: https://element.eleme.cn/#/zh-CN/component/input#input-attributes
    attrs: {
      maxlength: 4
    },
    // 4.栅格布局, 值范围为: 1 - 24
    layout: 12,
    // 5.提示
    tip: '名字不能超过4个字'
  },
  job: {
    type: 'select',
    label: '职位',
    layout: 12,
    // 6.默认值
    default: 1,
    // 7.optinos: select / radio / checkbox 等 options 列表
    // 类型可以为 对象数组 / 基本类型数组 / Promise对象 / 函数
    // https://www.yuque.com/chaojie-vjiel/vbwzgu/rgenav
    options: [
      // 7.1 对象数组类型
      // text: 显示文本, value: 值, attrs: option的自定义属性
      { text: '前端工程工程师', value: 1 },
      { text: '后端工程工程师', value: 2 },
      { text: '移动端工程工程师', value: 3, attrs: { disabled: true } }
    ]
  },
  language: {
    type: 'checkbox',
    label: '所学语言',
    // 8.联动: 隐藏 / 显示, 另外还有 联动启动 / 禁用
    // https://www.yuque.com/chaojie-vjiel/vbwzgu/loffm6
    vif (data) { return data.job },
    // 9.是否开启联动加载options
    isReloadOptions: true,
    default: ['html'],
    // 7.2 函数类型的 options
    options (data) {
      let language = ['html', 'js', 'css']
      switch(data.job) {
        case 1:
          // 7.3 options内容为: 基本类型数组
          // language = ['html', 'js', 'css']
          break
        case 2:
          language = language.concat(['java', 'go', 'nodejs'])
          break
        case 3:
          language = language.concat(['swift', 'Kotlin', 'flutter'])
          break
      }
      return language
    }
  },
  girlFriend: {
    type: 'radio',
    label: '有无女朋友',
    options: [ { text: '有', value: 1 }, { text: '无', value: 0 } ],
    // 10. 对最终请求的值进行处理
    valueFormatter (value) {
      return Boolean(value)
    },
    // 11. 事件
    on: {
      change (val) {
        console.log(val) // 请看控制台
      }
    }
  },
  girlFriendName: {
    type: 'input',
    label: '女朋友姓名',
    vshow (data) { return data.girlFriend }
  }
  motto: {
    type: 'text',
    label: '人生格言',
    default: '编程改变世界',
    // 12. 样式
    style: {
      color: 'red'
    },
    // 13. class 类
    class: ['motto-text']
  },
  activity: {
    type: 'tag',
    label: '喜爱的运动',
    default: '篮球,足球,羽毛球',
    // 14. 对显示的值进行处理 (这里将字符串分割为数组)
    displayFormatter (value) {
      return typeof value === 'string' ? value.split(',') : value
    }
  }
}
`,
      formData: {
        job: null,
        language: []
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
    },
    handleCodeChange (code) {
      try {
        /* eslint-disable */
        const codeData = eval('(' + code + ')')
        if (this.checkType(codeData)) {
          this.formDesc = codeData
        }
      } catch { }
    }
  },
  created () {
    this.handleCodeChange(this.code)
  }
}
</script>


<style>
.form-desc-props .CodeMirror {
  height: 400px !important;
}
</style>
