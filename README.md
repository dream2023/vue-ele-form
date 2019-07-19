# vue-ele-form | 基于 element-ui 的数据驱动表单组件

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/vue-ele-form.svg)](https://www.npmjs.com/package/vue-ele-form)
[![download](https://img.shields.io/npm/dw/vue-ele-form.svg)](https://npmcharts.com/compare/vue-ele-form?minimal=true)

## 说明

vue-ele-form 是基于 [element-ui form](https://element.eleme.cn/#/zh-CN/component/form) 的二次封装, 主要特点:

- 内置 20 多种[表单类型](https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g), 包括选`单选`、`多选`、`标签`、`级联选择器`等;
- 拥有`上传图片增强`, `上传视频增强`, `富文本`，`markdown`, `地图`, `代码编辑器`, `json 编辑器`等丰富的[第三方扩展](https://www.yuque.com/chaojie-vjiel/vbwzgu/inlpxy)，满足你的更多需求;
- 内置表单校检;
- 表单布局 和 响应式表单;
- 可以通过插槽自定义表单项;
- 压缩后只有几十 KB 大小。

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

- 增加视频源码讲解
- 增加 file 组件
- 增加联动属性(更好的隐藏和显示表单项)
- 增加去除非 formDesc 定义中字段 formData 的选项
- 增加单元测试 和 E2E 测试

## 赞助

如果您觉得还行, 请您一定要点一下右上角的 `star`, 如果您觉得对您帮助非常大, 就打赏一下, 不胜感谢 💰

<img width="200"  src="https://raw.githubusercontent.com/dream2023/images/master/WechatIMG969.h2bre65hrl6.png" />
<img width="200"  src="https://raw.githubusercontent.com/dream2023/images/master/WechatIMG968.u0pxwvwxyrh.jpeg" />
