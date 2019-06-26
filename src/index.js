import EleForm from './EleForm'

const Plugin = {}

Plugin.install = function (Vue, params = {}) {
  Vue.prototype.$EleFormParams = params
  Vue.component(EleForm.name, EleForm)
}

if (typeof window !== 'undefined' && window.Vue) {
  Plugin.install(window.Vue)
}

export default Plugin
