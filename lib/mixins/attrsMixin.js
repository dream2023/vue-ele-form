// 专门为了获取 attrs
export default {
  computed: {
    // 获取组件名: 去除EleForm, 并将组件转为 kebab-case
    componentName() {
      let name = this.$options.name
      name = name
        .replace('EleForm', '')
        .replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, '-$&')
        .toLowerCase()
      if (name.startsWith('-')) name = name.slice(1)
      return name
    },
    // 全局属性
    globalAttrs() {
      return this.$EleFormParams || {}
    },
    // 全局上传组件属性
    globalUploadAttrs() {
      return this.globalAttrs.upload || {}
    },
    // 全局组件属性
    globalComponentAttrs() {
      if (this.isUploadComponent) {
        return Object.assign(
          {},
          this.globalUploadAttrs,
          this.globalAttrs[this.componentName]
        )
      } else {
        return this.globalAttrs[this.componentName]
      }
    },
    customAttrs() {
      return this.desc._attrs || {}
    },
    // 属性: 默认属性 + 全局属性 + 自定义属性
    attrs() {
      return Object.assign(
        {},
        this.defaultAttrs,
        this.globalComponentAttrs,
        this.customAttrs,
        { disabled: this.disabled || this.customAttrs.disabled }
      )
    }
  }
}
