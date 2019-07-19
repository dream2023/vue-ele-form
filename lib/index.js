import EleForm from './EleForm'
import EleFormTag from './components/EleFormTag'
import EleFormRate from './components/EleFormRate'
import EleFormDate from './components/EleFormDate'
import EleFormText from './components/EleFormText'
import EleFormTime from './components/EleFormTime'
import EleFormColor from './components/EleFormColor'
import EleFormInput from './components/EleFormInput'
import EleFormRadio from './components/EleFormRadio'
import EleFormSelect from './components/EleFormSelect'
import EleFormSwitch from './components/EleFormSwitch'
import EleFormButton from './components/EleFormButton'
import EleFormNumber from './components/EleFormNumber'
import EleFormSlider from './components/EleFormSlider'
import EleFormGallery from './components/EleFormGallery'
import EleFormPassword from './components/EleFormPassword'
import EleFormDatetime from './components/EleFormDatetime'
import EleFormCheckbox from './components/EleFormCheckbox'
import EleFormCascader from './components/EleFormCascader'
import EleFormTransfer from './components/EleFormTransfer'
import EleFormTextarea from './components/EleFormTextarea'
import EleFormDaterange from './components/EleFormDaterange'
import EleFormAutocomplete from './components/EleFormAutocomplete'
import EleFormDatetimerange from './components/EleFormDatetimerange'
import EleFormCheckboxButton from './components/EleFormCheckboxButton'

const components = [
  EleForm,
  EleFormTag,
  EleFormTime,
  EleFormRate,
  EleFormDate,
  EleFormText,
  // EleFormImage,
  EleFormInput,
  // EleFormVideo,
  EleFormRadio,
  EleFormColor,
  EleFormSelect,
  EleFormButton,
  EleFormNumber,
  EleFormSlider,
  EleFormSwitch,
  EleFormGallery,
  EleFormPassword,
  EleFormTransfer,
  EleFormDatetime,
  EleFormCheckbox,
  EleFormCascader,
  EleFormTextarea,
  EleFormDaterange,
  EleFormAutocomplete,
  EleFormDatetimerange,
  EleFormCheckboxButton
]
const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$EleFormParams = opts
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  EleFormTag,
  EleFormTime,
  EleFormRate,
  EleFormDate,
  EleFormText,
  EleFormInput,
  EleFormRadio,
  EleFormColor,
  EleFormSelect,
  EleFormButton,
  EleFormNumber,
  EleFormSlider,
  EleFormSwitch,
  EleFormGallery,
  EleFormPassword,
  EleFormTransfer,
  EleFormDatetime,
  EleFormCheckbox,
  EleFormCascader,
  EleFormTextarea,
  EleFormDatetimerange,
  EleFormCheckboxButton
}
