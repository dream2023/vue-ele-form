import Vue from 'vue'
import locale from './locale'
import EleForm from './EleForm'
import formMixin from './mixins/formMixin'
import uploadMixin from './mixins/uploadMixin'
import EleFormGroup from './EleFormGroup'
import EleFormDialog from './EleFormDialog'
import EleFormDrawer from './EleFormDrawer'
import EleFormSection from './EleFormSection'
import EleFormTag from './components/EleFormTag'
import EleFormDate from './components/EleFormDate'
import EleFormRate from './components/EleFormRate'
import EleFormText from './components/EleFormText'
import EleFormTime from './components/EleFormTime'
import EleFormWeek from './components/EleFormWeek'
import EleFormYear from './components/EleFormYear'
import EleFormColor from './components/EleFormColor'
import EleFormDates from './components/EleFormDates'
import EleFormImage from './components/EleFormImage'
import EleFormInput from './components/EleFormInput'
import EleFormMonth from './components/EleFormMonth'
import EleFormRadio from './components/EleFormRadio'
import EleFormYesno from './components/EleFormYesno'
import EleFormButton from './components/EleFormButton'
import EleFormNumber from './components/EleFormNumber'
import EleFormSelect from './components/EleFormSelect'
import EleFormSlider from './components/EleFormSlider'
import EleFormSwitch from './components/EleFormSwitch'
import EleFormCascader from './components/EleFormCascader'
import EleFormCheckbox from './components/EleFormCheckbox'
import EleFormDatetime from './components/EleFormDatetime'
import EleFormPassword from './components/EleFormPassword'
import EleFormTextarea from './components/EleFormTextarea'
import EleFormTransfer from './components/EleFormTransfer'
import EleFormDaterange from './components/EleFormDaterange'
import EleFormTimerange from './components/EleFormTimerange'
import EleFormMonthrange from './components/EleFormMonthrange'
import EleFormTimePicker from './components/EleFormTimePicker'
import EleFormRadioButton from './components/EleFormRadioButton'
import EleFormAutocomplete from './components/EleFormAutocomplete'
import EleFormCascaderPanel from './components/EleFormCascaderPanel'
import EleFormDatetimerange from './components/EleFormDatetimerange'
import EleFormCheckboxButton from './components/EleFormCheckboxButton'

const components = [
  EleForm,
  EleFormGroup,
  EleFormDialog,
  EleFormDrawer,
  EleFormSection,
  EleFormTag,
  EleFormDate,
  EleFormRate,
  EleFormText,
  EleFormTime,
  EleFormWeek,
  EleFormYear,
  EleFormColor,
  EleFormDates,
  EleFormImage,
  EleFormInput,
  EleFormMonth,
  EleFormRadio,
  EleFormYesno,
  EleFormButton,
  EleFormNumber,
  EleFormSelect,
  EleFormSlider,
  EleFormSwitch,
  EleFormCascader,
  EleFormCheckbox,
  EleFormDatetime,
  EleFormPassword,
  EleFormTextarea,
  EleFormTransfer,
  EleFormDaterange,
  EleFormTimerange,
  EleFormMonthrange,
  EleFormTimePicker,
  EleFormRadioButton,
  EleFormAutocomplete,
  EleFormCascaderPanel,
  EleFormDatetimerange,
  EleFormCheckboxButton
]
components.forEach(component => {
  Vue.component(component.name, component)
})

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
  'image',
  'input',
  'month',
  'radio',
  'yesno',
  'button',
  'number',
  'select',
  'slider',
  'switch',
  'cascader',
  'checkbox',
  'datetime',
  'password',
  'textarea',
  'transfer',
  'daterange',
  'timerange',
  'monthrange',
  'time-picker',
  'radio-button',
  'autocomplete',
  'cascader-panel',
  'datetimerange',
  'checkbox-button'
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
