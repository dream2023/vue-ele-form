# vue-ele-form | 基于 element-ui 的数据驱动表单组件

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/vue-ele-form.svg)](https://www.npmjs.com/package/vue-ele-form)
[![download](https://img.shields.io/npm/dt/vue-ele-form)](https://npmcharts.com/compare/vue-ele-form?minimal=true)

## 说明

vue-ele-form 是基于 [element-ui form](https://element.eleme.cn/#/zh-CN/component/form) 的二次封装, 主要特点:

-   内置 20 多种[表单类型](https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g), 包括选`单选`、`多选`、`标签`、`级联选择器`等;
-   拥有`上传图片增强`, `上传视频增强`, `富文本`，`markdown`, `地图`, `代码编辑器`, `json 编辑器`等丰富的[第三方扩展](https://www.yuque.com/chaojie-vjiel/vbwzgu/inlpxy)，满足你的更多需求;
-   配备[可视化生成表单工具](https://github.com/dream2023/vue-ele-form-generator);
-   内置[表单校检](https://www.yuque.com/chaojie-vjiel/vbwzgu/dyw8a7#GLim1);
-   [表单布局](https://www.yuque.com/chaojie-vjiel/vbwzgu/iw5dzf#uuQkg) 和 [响应式表单](https://www.yuque.com/chaojie-vjiel/vbwzgu/yadlgw);
-   [表单分组](https://www.yuque.com/chaojie-vjiel/vbwzgu/ue72yy);
-   [联动](https://www.yuque.com/chaojie-vjiel/vbwzgu/rgenav)显示/隐藏、启用/禁用、重新获取 options 值
-   可以通过[插槽](https://www.yuque.com/chaojie-vjiel/vbwzgu/cmerhn)自定义表单项;
-   压缩后只有几十 KB 大小。

而上面所说的一切只需要一行 html 和 数据即可实现, 即保证了质量, 又使得开发速度仿佛坐上 🚀!

## 图片演示

[![演示图](https://raw.githubusercontent.com/dream2023/images/master/vue-ele-form.i8p4mna581b.gif)](https://codepen.io/dream2023/pen/KjGKYW)

## 文档

[https://www.yuque.com/chaojie-vjiel/vbwzgu](https://www.yuque.com/chaojie-vjiel/vbwzgu)

## DEMO

[https://codepen.io/dream2023/pen/KjGKYW](https://codepen.io/dream2023/pen/KjGKYW)

## 可视化生成表单

![image](https://raw.githubusercontent.com/dream2023/images/master/vue-ele-form-generator.4j3mllhqkds.gif)

项目地址: [https://github.com/dream2023/vue-ele-form-generator](https://github.com/dream2023/vue-ele-form-generator)

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

-   增加 file 组件
-   增加视频源码讲解
-   增加 tab 分组
-   增加单元测试 和 E2E 测试
-   国际化
-   iview 和 ant-design for vue 支持

## 脑图

![image](https://cdn.nlark.com/yuque/0/2019/svg/364322/1566722156127-631087a1-626e-40de-b94a-bb1943e150e7.svg)

地址: [http://naotu.baidu.com/file/34476f28500bd20d0ab9fbef03a1cf0b?token=b6e652d3bf040481](http://naotu.baidu.com/file/34476f28500bd20d0ab9fbef03a1cf0b?token=b6e652d3bf040481)

## 赞助

如果您觉得还行, 请您一定要点一下右上角的 `star`, 如果您觉得对您帮助非常大, 就打赏一下, 不胜感谢 💰

![image](https://raw.githubusercontent.com/dream2023/images/master/donation.61k4s17xdft.jpg)
