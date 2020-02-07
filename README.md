# vue-ele-form | 基于 element-ui 的数据驱动表单组件

[![MIT Licence](https://img.shields.io/npm/l/vue-ele-form.svg)](https://img.shields.io/apm/l/vue-ele-form.svg)
[![npm](https://img.shields.io/npm/v/vue-ele-form.svg)](https://www.npmjs.com/package/vue-ele-form)
[![download](https://img.shields.io/npm/dt/vue-ele-form)](https://npmcharts.com/compare/vue-ele-form?minimal=true)

## 说明

vue-ele-form 是基于 [element-ui form](https://element.eleme.cn/#/zh-CN/component/form) 的二次封装, 主要特点:

- 内置 20 多种[表单类型](https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g), 包括选`单选`、`多选`、`标签`、`级联选择器`等;
- 拥有`上传图片增强`, `上传视频增强`, `上传文件增强`,`树形下拉选择框`, `富文本`，`表格编辑器`, `动态表单`, `markdown`, `地图`, `代码编辑器`, `json 编辑器`等丰富的[第三方扩展](https://www.yuque.com/chaojie-vjiel/vbwzgu/inlpxy)，满足你的更多需求;
- 配备[可视化生成表单工具](https://github.com/dream2023/vue-ele-form-generator);
- 内置[表单校检](https://www.yuque.com/chaojie-vjiel/vbwzgu/dyw8a7#GLim1);
- [表单布局](https://www.yuque.com/chaojie-vjiel/vbwzgu/iw5dzf#uuQkg) 和 [响应式表单](https://www.yuque.com/chaojie-vjiel/vbwzgu/yadlgw);
- [表单分组](https://www.yuque.com/chaojie-vjiel/vbwzgu/ue72yy);
- [联动](https://www.yuque.com/chaojie-vjiel/vbwzgu/rgenav)显示/隐藏、启用/禁用、重新获取 options 值
- 可以通过[插槽](https://www.yuque.com/chaojie-vjiel/vbwzgu/cmerhn)自定义表单项;
- 支持[国际化](https://www.yuque.com/chaojie-vjiel/vbwzgu/gh11wg);
- 一键 Mock[模拟数据](https://www.yuque.com/chaojie-vjiel/vbwzgu/ugbzgz);

而上面所说的一切只需要一行 html 和 数据即可实现, 即保证了质量, 又使得开发速度仿佛坐上 🚀!

## 图片演示

[![vue-ele-form演示图](https://s2.ax1x.com/2020/01/31/13x2If.gif)](https://dream2023.github.io/vue-ele-form/)

## DEMO

[https://dream2023.github.io/vue-ele-form/](https://dream2023.github.io/vue-ele-form/)

## 文档

[https://www.yuque.com/chaojie-vjiel/vbwzgu](https://www.yuque.com/chaojie-vjiel/vbwzgu)

## 可视化生成表单

[![可视化生成表单演示图](https://s2.ax1x.com/2020/01/14/lb1PL6.gif)](https://github.com/dream2023/vue-ele-form-generator)

项目地址: [https://github.com/dream2023/vue-ele-form-generator](https://github.com/dream2023/vue-ele-form-generator)

可视化工具 vscode 插件:[https://github.com/dream2023/fgen-for-vscode](https://github.com/dream2023/fgen-for-vscode)

## 安装

```bash
npm install vue-ele-form --save
```

## 使用

```js
import EleForm from 'vue-ele-form'

Vue.use(EleForm)
```

## 生态

| Project                                                                                                        | Status                                                                                                                         | Description                                |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| [vue-ele-form](https://github.com/dream2023/vue-ele-form)                                                      | [![npm](https://img.shields.io/npm/v/vue-ele-form)](https://github.com/dream2023/vue-ele-form)                                 | 接基于 ElementUI 的数据驱动表单            |
| [vue-ele-form](https://github.com/dream2023/vue-ele-form-generator)                                            | [![npm](https://img.shields.io/npm/v/vue-ele-form-generator)](https://github.com/dream2023/vue-ele-form-generator)             | 专为 vue-ele-form 开发的可视化表单设计工具 |
| [fgen-for-vscode](https://marketplace.visualstudio.com/items?itemName=dream2023.fgen-for-vscode)               | ![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/dream2023.fgen-for-vscode)             | vue-ele-form-generator 的 vscode 扩展      |
| [vue-ele-form-json-editor](https://github.com/dream2023/vue-ele-form-json-editor)                              | [![npm](https://img.shields.io/npm/v/vue-ele-form-json-editor)](https://github.com/dream2023/vue-ele-form-json-editor)         | JSON 编辑器(vue-ele-form 扩展)             |
| [vue-ele-form-upload-file](https://github.com/dream2023/https://github.com/dream2023/vue-ele-form-upload-file) | [![npm](https://img.shields.io/npm/v/vue-ele-form-upload-file)](https://github.com/dream2023/vue-ele-form-upload-file)         | upload 文件上传组件(vue-ele-form 扩展)     |
| [vue-ele-form-image-uploader](https://github.com/dream2023/vue-ele-form-image-uploader)                        | [![npm](https://img.shields.io/npm/v/vue-ele-form-image-uploader)](https://github.com/dream2023/vue-ele-form-image-uploader)   | 上传图片增强组件(vue-ele-form 扩展)        |
| [vue-ele-form-tree-select](https://github.com/dream2023/vue-ele-form-tree-select)                              | [![npm](https://img.shields.io/npm/v/vue-ele-form-tree-select)](https://github.com/dream2023/vue-ele-form-tree-select)         | 树形选择框组件(vue-ele-form 扩展)          |
| [vue-ele-form-table-editor](https://github.com/dream2023/vue-ele-form-table-editor)                            | [![npm](https://img.shields.io/npm/v/vue-ele-form-table-editor)](https://github.com/dream2023/vue-ele-form-table-editor)       | 表格编辑器(vue-ele-form 扩展)              |
| [vue-ele-form-dynamic](https://github.com/dream2023/vue-ele-form-dynamic)                                      | [![npm](https://img.shields.io/npm/v/vue-ele-form-dynamic)](https://github.com/dream2023/vue-ele-form-dynamic)                 | 动态表单(vue-ele-form 扩展)                |
| [vue-ele-form-video-uploader](https://github.com/dream2023/vue-ele-form-video-uploader)                        | [![npm](https://img.shields.io/npm/v/vue-ele-form-video-uploader)](https://github.com/dream2023/vue-ele-form-video-uploader)   | 上传视频增强组件(vue-ele-form 扩展)        |
| [vue-ele-form-quill-editor](https://github.com/dream2023/vue-ele-form-quill-editor)                            | [![npm](https://img.shields.io/npm/v/vue-ele-form-quill-editor)](https://github.com/dream2023/vue-ele-form-quill-editor)       | 富文本编辑器(vue-ele-form 扩展)            |
| [vue-ele-form-markdown-editor](https://github.com/dream2023/vue-ele-form-markdown-editor)                      | [![npm](https://img.shields.io/npm/v/vue-ele-form-markdown-editor)](https://github.com/dream2023/vue-ele-form-markdown-editor) | markdown 编辑器(vue-ele-form 扩展)         |
| [vue-ele-form-bmap](https://github.com/dream2023/vue-ele-form-bmap)                                            | [![npm](https://img.shields.io/npm/v/vue-ele-form-bmap)](https://github.com/dream2023/vue-ele-form-bmap)                       | 百度地图组件(vue-ele-form 扩展)            |
| [vue-ele-form-codemirror](https://github.com/dream2023/vue-ele-form-codemirror)                                | [![npm](https://img.shields.io/npm/v/vue-ele-form-codemirror)](https://github.com/dream2023/vue-ele-form-codemirror)           | 代码编辑器(vue-ele-form-gallery 扩展)      |
| [vue-ele-form-gallery](https://github.com/dream2023/vue-ele-form-gallery)                                      | [![npm](https://img.shields.io/npm/v/vue-ele-form-gallery)](https://github.com/dream2023/vue-ele-form-gallery)                 | 图片/视频展示组件(vue-ele-form 扩展)       |

## 交流群

![交流群](https://i.loli.net/2020/02/07/MmY1u7f4wR3igcB.jpg)

## [开发规划](https://github.com/dream2023/vue-ele-form/projects/1)

- 更多的扩展组件
- 重写文档
- 增加视频源码讲解
- 增加单元测试 和 E2E 测试
- 增加 iview 和 ant-design for vue 支持

## 贡献指北

- 如果发现了 BUG, 不要着急, 先去 [issues](https://github.com/dream2023/vue-ele-form/issues) 里搜索一下, 如果没有找到类似的解决方案, 可以提一个 BUG, 如果知道怎么修复它就更好了, 请参考 [贡献指北](./CONTRIBUTING.md)文档;
- 如果有新功能 或者 建议, 也需要先在 [issues](https://github.com/dream2023/vue-ele-form/issues) 中提出来, 如果能用代码实现, 就更好了, 请参考 [贡献指北](./CONTRIBUTING.md)文档;
- 如果想贡献代码, 可以在[开发规划](https://github.com/dream2023/vue-ele-form/projects)中找一个未完成的功能, 进行完善, 请参考 [贡献指北](./CONTRIBUTING.md) 文档。
