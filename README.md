# vue-ele-form | 一行代码搞定整个表单

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/vue-ele-form.svg)](https://www.npmjs.com/package/vue-ele-form)
[![download](https://img.shields.io/npm/dw/vue-ele-form.svg)](https://npmcharts.com/compare/vue-ele-form?minimal=true)

## 说明

vue-ele-form 是基于 [element-ui form](https://element.eleme.cn/#/zh-CN/component/form) 的二次封装, 实现了表单生成、表单校检、表单布局、响应式表单, 并内置了上传图片, 上传视频, 富文本等 20 多款实用组件, 这一切的一切只需要一行 html 和 数据即可实现, 即保证了质量, 又使得开发速度仿佛坐上 🚀!

## 图片演示

[![演示图](https://raw.githubusercontent.com/dream2023/images/master/vue-ele-form.i8p4mna581b.gif)](https://codepen.io/dream2023/pen/KjGKYW)

## DEMO

[https://codepen.io/dream2023/pen/KjGKYW](https://codepen.io/dream2023/pen/KjGKYW)

## 目录

- [安装](#安装)
- [使用](#使用)
- [Props](#props)
  - [参数总览](#参数总览)
  - [响应式相关参数](#响应式相关参数)
  - [formDesc](#formdesc)
    - [type 类型列表](#type-类型列表)
    - [options](#options)
      - [对象数组](#对象数组)
      - [字符串数组](#字符串数组)
      - [Promise 对象](#promise-对象)
      - [函数](#函数)
      - [特别注意](#特别注意)
  - [请求方式](#请求方式)
    - [外部请求](#外部请求)
    - [外部请求](#外部请求)
- [插槽](#插槽)
  - [默认插槽](#默认插槽)
  - [具名插槽](#具名插槽)
- [自定义组件](#自定义组件)
  - [第 1 步: 新建组件](#第-1-步:-新建组件)
  - [第 2 步: 完善 html](#第-2-步:-完善-html)
  - [第 3 步: 注册并使用](#第-3-步:-注册并使用)
- [开发规划](#开发规划)

## 安装

```bash
npm install vue-ele-form --save
```

## 使用

```js
import EleForm from 'vue-ele-form'

Vue.use(EleForm)

// 在引入 EleForm 时，可以传入一个全局配置对象(可选), 例如:
Vue.use(EleForm, {
  // 上传相关(上传图片, 上传视频, 富文本中图片上传)
  upload: {
    action: 'https://www.xxx.com/posts', // 请求地址,
    data: { token: 'xxx' }, // 附带的参数,
    responseFn (response) { // 处理响应结果
      return 'https://www.xxx.com/upload/' + response.id
    }
  },
  // image类型
  image: {
    fileSize: 10 // 所有 image 类型, 上传图片大小限制为 10 MB 以内
  },
  // number类型
  number: {
    min: 0 // 所有 number 类型, 最小值为 0
  }
})

// 或者直接赋值
Vue.prototype.$EleFormParams = {
  upload: {
    action: 'xxx'.
    // ...
  },
  // ...
}
```

[⬆ 回到目录](#目录)

## Props

### 参数总览

```js
props: {
  // 表单描述 (下面详细讲)
  formDesc: {
    type: Object,
    required: true
  },
  // 表单数据, 一个对象即可
  formData: {
    type: Object,
    required: true
  },
  // 校检规则, 同原 form 组件, 具体参考:
  // https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng
  rules: Object,
  // 提交状态
  isLoading: {
    type: Boolean,
    default: false
  },
  // 服务器返回的错误信息
  formError: Object,
  // 提交函数 (下面详细讲)
  requestFn: Function,
  // 是否显示submit按钮
  isShowSubmitBtn: {
    type: Boolean,
    default: true
  },
  // 是否显示back按钮
  isShowBackBtn: {
    type: Boolean,
    default: true
  },
  // 提交按钮文本
  submitBtnText: {
    type: String,
    default: '提交'
  },
  // 返回按钮
  backBtnText: {
    type: String,
    default: '返回'
  },
  // 标签位置, 不填则响应式, 填则固定
  labelPosition: String,
  // 参考原 layout 组件, 不填则响应式, 填则固定
  // https://element.eleme.cn/#/zh-CN/component/layout
  span: Number
}
```

[⬆ 回到目录](#目录)

### 响应式相关参数

<details>
<summary>点击查看</summary>

> width 指表单的包裹元素宽度

- 在指定 labelPosition 和 span 的情况下:
  按照指定的值进行渲染

- 在不指定 labelPosition 和 span 情况下:
  - <code>width < 768px</code> 时, labelPosition = 'top', span = 24
  - <code>768px ≤ width < 992px</code> 时, labelPosition = 'right', span = 18
  - <code>992px ≤ width < 1200px</code> 时, labelPosition = 'right', span = 16
  - <code>1200px ≤ width < 1920px</code> 时, labelPosition = 'right', span = 14
  - <code>1920px ≤ width </code> 时, labelPosition = 'right', span = 12
    </details>

[⬆ 回到目录](#目录)

### formDesc

<details>
<summary>点击查看</summary>

```js
formDesc: {
  field: {
    type: String, // 类型, 具体类型参考下面
    label: String, // `form-item` 的 `label` 属性值
    attrs: Object, // 所渲染组件的属性, `v-bind` 的 API 相同
    layout: Number, // 1-24, 默认是24, 占满一整行, 具体参考 https://element.eleme.cn/#/zh-CN/component/layout
    displayFormatter: Function, // 对首次显示的值做处理
    valueFormatter: Function, // 对最终请求的值做处理
    tip: String, // 表单项的提示
    options: Array | Function | Promise, // checkbox, select等组件的 options 部分, 具体细节参考下面
    slots: Object, // 插槽, 使用渲染函数 https://cn.vuejs.org/v2/guide/render-function.html
    'class': Mix, // 与 `v-bind:class` 的 API 相同，接受一个字符串、对象或字符串和对象组成的数组
    style: Object | Array // 与 `v-bind:style` 的 API 相同，接受一个字符串、对象，或对象组成的数组
    on: Object, // 事件监听器在 `on` 属性内
  },
  field2: {
    // ...
  },
  // ...
}
```

```js
// 示例
formDesc: {
  id: {
    type: 'hide', // hide类型, 表示不显示
  },
  avatar: {
    type: 'image', // 类型为 上传图片
    label: '头像', // 表单label为 头像
    default: 'https://www.xx.com/images/default-avatar.png', // 指定默认头像
    attrs: { // 指定属性
      limit: 5 // 设置上传图片大小不超过 5 Mb
    },
    tip: '图片大小最好为 200×200' // 提示
  },
  name: {
    type: 'input',
    label: '姓名',
    layout: 12, // name 和 region 共占一行,
    displayFormatter (value) { // 将显示的值转为 '我的名字是'  + value
      return '我的名字是'  + value
    },
    on: { // 时间监听
      change (value) {
        console.log(value)
      }
    }
  },
  birthday:{
    type: 'date',
    label: '出生日期',
    slots: { // 插槽, 第一个参数是渲染函数, 第二个参数是作用域插槽传递过来的值
      prefix (h, data) {
        return h('i', {
          class: 'input__icon el-icon-date'
        })
      }
    }
  },
  region: {
    type: 'select',
    label: '地区',
    layout: 12,
    options: ['北京', '上海', '广州', '深圳'] // 普通数组
  },
  age: {
    type: 'number',
    label: '年龄',
    attrs: {
      min: 1 // 最小 1 岁
    },
    valueFormatter (value) { // 对请求的值进一步处理
      return value + 1 // 将发送的数据转为 value + 1
    },
    style: { // 指定样式
      maxWidth: '400px'
    }
  },
  best_friends: {
    type: 'checkbox',
    label: '最好的朋友',
    options: async function () {
      const response = await axios.get('http://jsonplaceholder.typicode.com/users')
      const data = response.data
      return data.map((item) => {
        return { text: item.username, value: item.id }
      })
    }
  },
  // ....
}
```

</details>

[⬆ 回到目录](#目录)

#### type 类型列表

<details>
<summary>点击查看</summary>

| 类型            | 含义          | 属性参考                                                                                   |
| --------------- | ------------- | ------------------------------------------------------------------------------------------ |
| hide            | 隐藏表单项    |                                                                                            |
| text            | 静态文本      |                                                                                            |
| input           | 输入框        | [element-ui input](https://element.eleme.cn/#/zh-CN/component/input)                       |
| textarea        | 输入框        | [element-ui input](https://element.eleme.cn/#/zh-CN/component/input#wen-ben-yu)            |
| number          | 数字          | [element-ui number](https://element.eleme.cn/#/zh-CN/component/input-number)               |
| checkbox        | 复选          | [element-ui checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox)                 |
| checkbox-button | 复选按钮样式  | [element-ui checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox#an-niu-yang-shi) |
| radio           | 单选          | [element-ui radio](https://element.eleme.cn/#/zh-CN/component/radio)                       |
| date            | 日期          | [element-ui date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)           |
| time            | 时间          | [element-ui time-picker](https://element.eleme.cn/#/zh-CN/component/time-picker)           |
| datetime        | 日期时间      | [element-ui datetime-picker](https://element.eleme.cn/#/zh-CN/component/datetime-picker)   |
| switch          | 开关          | [element-ui switch](https://element.eleme.cn/#/zh-CN/component/switch)                     |
| slider          | 滑块          | [element-ui slider](https://element.eleme.cn/#/zh-CN/component/slider)                     |
| password        | 密码          | [element-ui input](https://element.eleme.cn/#/zh-CN/component/input#mi-ma-kuang)           |
| color           | 颜色选择器    | [element-ui color-picker](https://element.eleme.cn/#/zh-CN/component/color-picker)         |
| select          | 选择器        | [element-ui select](https://element.eleme.cn/#/zh-CN/component/select)                     |
| cascader        | 级联选择器    | [element-ui cascader](https://element.eleme.cn/#/zh-CN/component/cascader)                 |
| transfer        | 穿梭框        | [element-ui transfer](https://element.eleme.cn/#/zh-CN/component/transfer)                 |
| image           | 上传图片      | [vue-ele-upload-image](https://github.com/dream2023/vue-ele-upload-image)                  |
| video           | 上传视频      | [vue-ele-upload-video](https://github.com/dream2023/vue-ele-upload-video)                  |
| rate            | 评分组件      | [element-ui rate](https://element.eleme.cn/#/zh-CN/component/rate)                         |
| tag             | 标签          | [element-ui tag](https://element.eleme.cn/#/zh-CN/component/tag)                           |
| rich-text       | 富文本        | [vue2-editor](https://github.com/davidroyer/vue2-editor)                                   |
| gallery         | 图片/视频展示 | [vue-ele-gallery](https://github.com/dream2023/vue-ele-gallery)                            |
| button          | 按钮          | [element-ui button](https://element.eleme.cn/#/zh-CN/component/button)                     |

</details>

[⬆ 回到目录](#目录)

#### options

<details>
<summary>点击查看</summary>

##### 对象数组

```js
formDesc: {
  sex: {
    // 显示到屏幕上, 分别为男 和 女, 但发送数据分别为 0 和 1, attrs 可选
    options: [
      { text: '男', value: 0, attrs: { size: 'medium' } }
      { text: '女', value: 1, attrs: { size : 'medium' } } }
    ]
  }
}
```

##### 字符串数组

```js
formDesc: {
  sex: {
    // 显示到屏幕上, 分别为男 和 女, 但发送数据分别为 男 和 女
    options: ['男', '女']
  }
}
```

##### Promise 对象

```js
formDesc: {
  city: {
    // 从服务器获取数据
    options: getCity('/api/city') // 返回的是Promise
  }
}
```

##### 函数

```js
formDesc: {
  city: {
    // 函数, 函数的返回值可以是以上三种类型: 字符串数组, 对象数组, Promise对象
    options: function () {
      return [{ text: '北京', value: 'beijing' }, {text: '深圳', value: 'shenzhen'}]
    }
  }
}
```

#### 特别注意

⚠️ 这里有两个组件需要注意:

- `transfer` 组件的 `data` 属性, 这里用 `options` 代替
- `cascader` 和 `transfer` 的 `options` 格式必须按照其原有的格式

</details>

[⬆ 回到目录](#目录)

### 请求方式

<details>
<summary>点击查看</summary>

#### 外部请求

当发起请求时, 会抛出 `$emit('request', data)`, 需要传递 `isLoading` 参数

```html
<!-- 伪代码 -->
<ele-table
  :isLoading="isLoading"
  :formError="formError"
  @request="handleRequest"
></ele-table>
<script>
  // 伪代码
  export default {
    data() {
      return {
        // 请求状态
        isLoading: false,
        // 表单错误消息
        formError: {}
      }
    },
    methods: {
      // 发起请求, 被注入 data
      async handleRequest(data) {
        if (this.isLoading) return // 判断状态
        try {
          this.isLoading = true // 更改状态
          const response = await axios.post(
            'https://jsonplaceholder.typicode.com/posts',
            data
          ) // 发送请求

          // 成功处理
          this.$message.success('添加成功')
          // this.$router.back() // 跳转回上一页
        } catch (error) {
          // 处理错误
          // 为了表单同步显示后端返回的错误, 需要将错误信息传递给表单
          this.$message.error('表单填写出错了')
          this.formError = { username: '用户名不存在', password: '密码错误' }
        } finally {
          this.isLoading = false
        }
      }
    }
  }
</script>
```

#### 内部请求

当发起请求时, 需要传递 `request-fn` 参数, 请求结束后, 会根据状态抛出: `$emit('request-success', data)` / `$emit('request-error', error)` / `$emit('request-finish')`

```html
<!-- 伪代码 -->
<ele-table
  :request-fn="handleRequest"
  @request-success="handleRequestSuccess"
></ele-table>
<script>
  // 伪代码
  export default {
    methods: {
      handleRequest(data) {
        // 1.必须返回一个Promise对象
        // 2.当出现异常的时候, 返回的错误信息, 必须是以字段为key, 错误原因为 message的对象或者错误:
        // { name: '用户名不存在', password: '密码不正确' } 或者 new Error(JSON.stringify({ name: '用户名不存在', password: '密码不正确' }))
        return new Promise(async (resolve, reject) => {
          try {
            await axios.post('https://jsonplaceholder.typicode.com/posts', data)
            resolve()
          } catch (error) {
            reject(
              new Error(
                JSON.stringify({ name: '用户名不存在', password: '密码不正确' })
              )
            )
          }
        })
      },
      handleRequestSuccess() {
        this.$message.success('添加成功')
        // this.$router.back()
      }
    }
  }
</script>
```

</details>

[⬆ 回到目录](#目录)

## 插槽

<details>
<summary>点击查看</summary>

### 默认插槽

```html
<el-form :formDesc="formDesc" :formData="formData">
  <!-- 默认插槽, 将会作为表单的第1项 -->
  <!-- 此时表单有两个表单项 -->
  <el-form-item label="头像">
    <el-input v-model="formData.avatar"></el-input>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      return {
        formData: {},
        formDesc: {
          name: {
            type: 'input',
            label: '姓名'
          }
        }
      }
    }
  }
</script>
```

### 具名插槽

```html
<el-form :formDesc="formDesc" :formData="formData">
  <!-- 作用域插槽会覆盖相应的表单项 -->
  <template v-slot:avatar>
    <el-input v-model="formData.avatar"></el-input>
  </template>
</el-form>
<script>
  export default {
    data() {
      return {
        formData: {},
        formDesc: {
          avatar: {
            type: 'image',
            label: '头像'
          },
          name: {
            type: 'input',
            label: '姓名'
          }
        }
      }
    }
  }
</script>
```

</details>

[⬆ 回到目录](#目录)

## 自定义组件

<details>
<summary>点击查看</summary>

### 第 1 步: 新建组件

```html
<template> </template>

<script>
  export default {
    name: 'custom-url' // name 属性必须填写, 在使用时, 需要和这里定义的 name 一致
    props: {
      // value 是传递过来的值
      value: String,
      // desc是此组件的描述, 结构为
      // { style: {}, class: {}, on: {}, attrs: {} }
      desc: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data () {
      return {
        // 用于v-model绑定, 因为 v-model无法绑定props值
        newValue: this.value
      }
    }
  }
</script>
```

### 第 2 步: 完善 html

```html
<template>
  <el-input
    placeholder="请输入URL"
    v-model="newValue"
    @input="handleChange"
    :class="desc.class"
    :style="desc.style"
    v-bind="desc.attrs"
    v-model="newValue"
    v-on="desc.on"
  >
    <template slot="prepend"
      >Http://</template
    >
    <template slot="append"
      >.com</template
    >
  </el-input>
</template>
<script>
  export default {
    // ...
    methods: {
      handleChange(value) {
        this.$emit('input', value) // 当值变化时, 一定要触发input事件
      }
    }
  }
</script>
```

### 第 3 步: 注册并使用

```js
// 必须注册到全局
import CustomUrl from 'path/to/CustomUrl'
Vue.component(CustomUrl.name, CustomUrl)
```

```js
// 使用
export default: {
  formDesc: {
    blog: {
      type: 'custom-url',
      label: '博客地址'
    }
  }
}
```

⚠️ 这里没有将`默认值`、`全局配置属性`的加载等功能加上, 如果您准备开发自己的第三方组件, 推荐使用内部的 mixin, 可以省略很多步骤, 具体参考: [custom-url 使用 mixin](./example/CustomUrl.vue) 和 [mixin 源码](./lib/mixins/formMixin.js)

</details>

[⬆ 回到目录](#目录)

## 开发规划

- 增加 ts 定义
- 将富文本组件抽离出来形成单独组件
- 增加地图组件(作为第三方组件, 可选择性安装)
- 增加 markdown 组件(作为第三方组件, 可选择性安装)
- 增加 JSON 编辑器组件(作为第三方组件, 可选择性安装)
- 增加联动属性(更好的隐藏和显示表单项)
- 增加单元测试 和 E2E 测试

## 赞助

如果您觉得还行, 请您一定要点一下右上角的 `star`, 如果您觉得对您帮助非常大, 就打赏一下, 不胜感谢 💰

<img width="200"  src="https://raw.githubusercontent.com/dream2023/images/master/WechatIMG969.h2bre65hrl6.png" />

<img width="200"  src="https://raw.githubusercontent.com/dream2023/images/master/WechatIMG968.u0pxwvwxyrh.jpeg" />

## 求职

本人目前正在找前端方面工作, 点击下载[简历](https://github.com/dream2023/images/raw/master/%E5%BC%A0%E8%B6%85%E6%9D%B0-%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88-%E4%B8%AA%E4%BA%BA%E7%AE%80%E5%8E%86.pdf), 如果您有合适的工作, 简历中有联系方式, 请务必联系我
