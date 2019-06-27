export default {
  // 全局参数
  globalParams () {
    return this.$EleFormParams || {}
  },
  // 组件参数
  componentParams () {
    return this.globalParams[this.componentName]
  },
  // 上传参数
  uploadParams () {
    return this.globalParams['upload']
  },
  // 参数 默认参数 < 全局上传参数 < 组件参数 < 自定义参数
  params () {
    const customParams = {}
    if (this.action) customParams.action = this.action
    if (this.limit) customParams.limit = this.limit
    if (this.editorToolbar) customParams.editorToolbar = this.editorToolbar
    if (this.responseFn) customParams.responseFn = this.responseFn
    return Object.assign(
      {},
      this.defaultParams,
      this.uploadParams,
      this.componentParams,
      customParams
    )
  }
}
