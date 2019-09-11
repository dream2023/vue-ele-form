import EleForm from './EleForm'
import EleFormTag from './components/EleFormTag'
import EleFormText from './components/EleFormText'
import EleFormWeek from './components/EleFormWeek'
import EleFormTime from './components/EleFormTime'
import EleFormRate from './components/EleFormRate'
import EleFormDate from './components/EleFormDate'
import EleFormYear from './components/EleFormYear'
import EleFormDates from './components/EleFormDates'
import EleFormColor from './components/EleFormColor'
import EleFormInput from './components/EleFormInput'
import EleFormMonth from './components/EleFormMonth'
import EleFormRadio from './components/EleFormRadio'
import EleFormYesno from './components/EleFormYesno'
import EleFormSwitch from './components/EleFormSwitch'
import EleFormButton from './components/EleFormButton'
import EleFormSelect from './components/EleFormSelect'
import EleFormSlider from './components/EleFormSlider'
import EleFormNumber from './components/EleFormNumber'
import EleFormGallery from './components/EleFormGallery'
import EleFormTextarea from './components/EleFormTextarea'
import EleFormCascader from './components/EleFormCascader'
import EleFormDatetime from './components/EleFormDatetime'
import EleFormCheckbox from './components/EleFormCheckbox'
import EleFormPassword from './components/EleFormPassword'
import EleFormTransfer from './components/EleFormTransfer'
import EleFormDaterange from './components/EleFormDaterange'
import EleFormAutocomplete from './components/EleFormAutocomplete'
import EleFormDatetimerange from './components/EleFormDatetimerange'
import EleFormCheckboxButton from './components/EleFormCheckboxButton'

const components = [
  EleForm,
  EleFormTag,
  EleFormText,
  EleFormWeek,
  EleFormTime,
  EleFormRate,
  EleFormDate,
  EleFormYear,
  EleFormDates,
  EleFormColor,
  EleFormInput,
  EleFormMonth,
  EleFormRadio,
  EleFormYesno,
  EleFormSwitch,
  EleFormButton,
  EleFormSelect,
  EleFormSlider,
  EleFormNumber,
  EleFormGallery,
  EleFormTextarea,
  EleFormCascader,
  EleFormDatetime,
  EleFormCheckbox,
  EleFormPassword,
  EleFormTransfer,
  EleFormDaterange,
  EleFormAutocomplete,
  EleFormDatetimerange,
  EleFormCheckboxButton
]

const EleFormBuiltInNames = [
  'tag',
  'text',
  'week',
  'time',
  'rate',
  'date',
  'year',
  'dates',
  'color',
  'input',
  'month',
  'radio',
  'yesno',
  'switch',
  'button',
  'select',
  'slider',
  'number',
  'gallery',
  'textarea',
  'cascader',
  'datetime',
  'checkbox',
  'password',
  'transfer',
  'daterange',
  'autocomplete',
  'datetimerange',
  'checkbox-button'
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$EleFormParams = opts
  Vue.prototype.$EleFormBuiltInNames = EleFormBuiltInNames
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  EleForm,
  EleFormTag,
  EleFormText,
  EleFormWeek,
  EleFormTime,
  EleFormRate,
  EleFormDate,
  EleFormYear,
  EleFormDates,
  EleFormColor,
  EleFormInput,
  EleFormMonth,
  EleFormRadio,
  EleFormYesno,
  EleFormSwitch,
  EleFormButton,
  EleFormSelect,
  EleFormSlider,
  EleFormNumber,
  EleFormGallery,
  EleFormTextarea,
  EleFormCascader,
  EleFormDatetime,
  EleFormCheckbox,
  EleFormPassword,
  EleFormTransfer,
  EleFormDaterange,
  EleFormAutocomplete,
  EleFormDatetimerange,
  EleFormCheckboxButton
}
