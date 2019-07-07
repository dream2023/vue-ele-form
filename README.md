# vue-ele-form | 一行代码搞定整个表单

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/vue-ele-form.svg)](https://www.npmjs.com/package/vue-ele-form)
[![download](https://img.shields.io/npm/dw/vue-ele-form.svg)](https://npmcharts.com/compare/vue-ele-form?minimal=true)

## 说明

vue-ele-form 是基于 [element-ui form](https://element.eleme.cn/#/zh-CN/component/form) 的二次封装, 主要特点:

- 内置 20 多种表单类型, 包括富文本、上传图片、上传视频等;
- 方便扩展, 可以很简单增加表单组件类型;
- 内置表单校检;
- 表单布局 和 响应式表单;
- 通过插槽自定义表单项。

而上面所说的一切只需要一行 html 和 数据即可实现, 即保证了质量, 又使得开发速度仿佛坐上 🚀!

## 图片演示

[![演示图](https://raw.githubusercontent.com/dream2023/images/master/vue-ele-form.i8p4mna581b.gif)](https://codepen.io/dream2023/pen/KjGKYW)

## 文档

[https://www.yuque.com/chaojie-vjiel/vbwzgu](https://www.yuque.com/chaojie-vjiel/vbwzgu)

## DEMO

[https://codepen.io/dream2023/pen/KjGKYW](https://codepen.io/dream2023/pen/KjGKYW)

## 安装

```bash
npm install vue-ele-form --save
```

## 使用

```js
import EleForm from 'vue-ele-form'

Vue.use(EleForm)
```

## 开发规划

- 增加 ts 定义
- 将富文本组件抽离出来形成单独组件
- 增加地图组件(作为第三方组件, 可选择性安装)
- 增加 markdown 组件(作为第三方组件, 可选择性安装)
- 增加 JSON 编辑器组件(作为第三方组件, 可选择性安装)
- 增加联动属性(更好的隐藏和显示表单项)
- 增加去除非 formDesc 定义中字段 formData 的选项
- 增加单元测试 和 E2E 测试

## 赞助

如果您觉得还行, 请您一定要点一下右上角的 `star`, 如果您觉得对您帮助非常大, 就打赏一下, 不胜感谢 💰

<img width="200"  src="https://raw.githubusercontent.com/dream2023/images/master/WechatIMG969.h2bre65hrl6.png" />

<img width="200"  src="https://raw.githubusercontent.com/dream2023/images/master/WechatIMG968.u0pxwvwxyrh.jpeg" />

## 求职

本人目前正在找前端方面工作, 点击下载[简历](https://github.com/dream2023/images/raw/master/%E5%BC%A0%E8%B6%85%E6%9D%B0-%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88-%E4%B8%AA%E4%BA%BA%E7%AE%80%E5%8E%86.pdf), 如果您有合适的工作, 简历中有联系方式, 请务必联系我
