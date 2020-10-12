const fs = require('fs')
const render = require('json-templater/string')
const path = require('path')
const endOfLine = require('os').EOL

// 获取组件
function getComponents(path) {
  let components = fs.readdirSync(path)
  components = components.map(componentName =>
    componentName.slice(0, componentName.lastIndexOf('.vue'))
  )
  components.sort((a, b) => a.length - b.length)
  return components
}

// 获取组件引入模板
function getComponentsTemplate(ComponentNames) {
  // 模板
  const IMPORT_TEMPLATE = "import {{name}} from './components/{{name}}'"
  // 替换
  return ComponentNames.map(name => render(IMPORT_TEMPLATE, { name: name }))
}

// 获取安装列表
function getInstallTemplate(ComponentNames) {
  const INSTALL_COMPONENT_TEMPLATE = '  {{name}}'
  return ComponentNames.map(name =>
    render(INSTALL_COMPONENT_TEMPLATE, { name: name })
  )
}

// 获取内置组件类型
function getBuiltInName(name) {
  name = name
    .replace('EleForm', '')
    .replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, '-$&')
    .toLowerCase()
  if (name.startsWith('-')) name = name.slice(1)
  return name
}

function getBuiltInNameTemplate(ComponentNames) {
  const names = ComponentNames.map(getBuiltInName)
  const TEMPLATE = "  '{{name}}'"
  return names.map(name => render(TEMPLATE, { name: name }))
}

// 组件目录
const COMPONENTS_PATH = path.join(__dirname, '../lib/components')
// 获取组件名称
const ComponentNames = getComponents(COMPONENTS_PATH)

// 获取引入组件的文本
const includeComponentTemplate = getComponentsTemplate(ComponentNames)

// 获取安装模板
const installTemplate = getInstallTemplate(ComponentNames)

// 内置组件名称
const builtInNamesTemplate = getBuiltInNameTemplate(ComponentNames)

const MAIN_TEMPLATE = `import Vue from 'vue'
import locale from './locale'
import EleForm from './EleForm'
import formMixin from './mixins/formMixin'
import uploadMixin from './mixins/uploadMixin'
import EleFormGroup from './EleFormGroup'
import EleFormDialog from './EleFormDialog'
import EleFormDrawer from './EleFormDrawer'
import EleFormSection from './EleFormSection'
{{include}}

const components = [
  EleForm,
  EleFormGroup,
  EleFormDialog,
  EleFormDrawer,
  EleFormSection,
{{install}}
]
components.forEach(component => {
  Vue.component(component.name, component)
})

const EleFormBuiltInNames = [
{{builtInNames}}
]
Vue.prototype.$EleFormBuiltInNames = EleFormBuiltInNames

const install = function (Vue, opts = {}, lang) {
  locale.use(lang)
  Vue.prototype.$EleFormParams = opts
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
EleForm.install = install
EleForm.formMixin = formMixin
EleForm.uploadMixin = uploadMixin
export default EleForm
`
const template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  builtInNames: builtInNamesTemplate.join(',' + endOfLine)
})

const OUTPUT_PATH = path.join(__dirname, '../lib/index.js')
fs.writeFileSync(OUTPUT_PATH, template)
console.log('[build entry] DONE:', OUTPUT_PATH, endOfLine)
