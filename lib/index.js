import defaultLang from './lang/zh-CN'
import locale from 'element-ui/src/locale'
import EleForm from './EleForm'
import EleFormGroup from './EleFormGroup'
import EleFormTag from './components/EleFormTag'
import EleFormDate from './components/EleFormDate'
import EleFormRate from './components/EleFormRate'
import EleFormText from './components/EleFormText'
import EleFormTime from './components/EleFormTime'
import EleFormWeek from './components/EleFormWeek'
import EleFormYear from './components/EleFormYear'
import EleFormColor from './components/EleFormColor'
import EleFormDates from './components/EleFormDates'
import EleFormInput from './components/EleFormInput'
import EleFormMonth from './components/EleFormMonth'
import EleFormRadio from './components/EleFormRadio'
import EleFormYesno from './components/EleFormYesno'
import EleFormButton from './components/EleFormButton'
import EleFormNumber from './components/EleFormNumber'
import EleFormSelect from './components/EleFormSelect'
import EleFormSlider from './components/EleFormSlider'
import EleFormSwitch from './components/EleFormSwitch'
import EleFormGallery from './components/EleFormGallery'
import EleFormCascader from './components/EleFormCascader'
import EleFormCheckbox from './components/EleFormCheckbox'
import EleFormDatetime from './components/EleFormDatetime'
import EleFormPassword from './components/EleFormPassword'
import EleFormTextarea from './components/EleFormTextarea'
import EleFormTransfer from './components/EleFormTransfer'
import EleFormDaterange from './components/EleFormDaterange'
import EleFormAutocomplete from './components/EleFormAutocomplete'
import EleFormDatetimerange from './components/EleFormDatetimerange'
import EleFormCheckboxButton from './components/EleFormCheckboxButton'

const components = [
  EleForm,
  EleFormGroup,
  EleFormTag,
  EleFormDate,
  EleFormRate,
  EleFormText,
  EleFormTime,
  EleFormWeek,
  EleFormYear,
  EleFormColor,
  EleFormDates,
  EleFormInput,
  EleFormMonth,
  EleFormRadio,
  EleFormYesno,
  EleFormButton,
  EleFormNumber,
  EleFormSelect,
  EleFormSlider,
  EleFormSwitch,
  EleFormGallery,
  EleFormCascader,
  EleFormCheckbox,
  EleFormDatetime,
  EleFormPassword,
  EleFormTextarea,
  EleFormTransfer,
  EleFormDaterange,
  EleFormAutocomplete,
  EleFormDatetimerange,
  EleFormCheckboxButton
]

const EleFormBuiltInNames = [
  'tag',
  'date',
  'rate',
  'text',
  'time',
  'week',
  'year',
  'color',
  'dates',
  'input',
  'month',
  'radio',
  'yesno',
  'button',
  'number',
  'select',
  'slider',
  'switch',
  'gallery',
  'cascader',
  'checkbox',
  'datetime',
  'password',
  'textarea',
  'transfer',
  'daterange',
  'autocomplete',
  'datetimerange',
  'checkbox-button'
]

const install = function (Vue, opts = {}, lang = defaultLang) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  locale.use(lang)
  Vue.prototype.$EleFormParams = opts
  Vue.prototype.$EleFormBuiltInNames = EleFormBuiltInNames
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  EleForm,
  EleFormGroup,
  EleFormTag,
  EleFormDate,
  EleFormRate,
  EleFormText,
  EleFormTime,
  EleFormWeek,
  EleFormYear,
  EleFormColor,
  EleFormDates,
  EleFormInput,
  EleFormMonth,
  EleFormRadio,
  EleFormYesno,
  EleFormButton,
  EleFormNumber,
  EleFormSelect,
  EleFormSlider,
  EleFormSwitch,
  EleFormGallery,
  EleFormCascader,
  EleFormCheckbox,
  EleFormDatetime,
  EleFormPassword,
  EleFormTextarea,
  EleFormTransfer,
  EleFormDaterange,
  EleFormAutocomplete,
  EleFormDatetimerange,
  EleFormCheckboxButton
}
