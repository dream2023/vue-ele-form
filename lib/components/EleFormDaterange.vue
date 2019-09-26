<template>
  <el-date-picker
    :class="desc.class"
    :style="desc.style"
    @input="handleChange"
    class="ele-form-full-line"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'
import timerangeMixin from '../mixins/timerangeMixin'
import { t } from 'element-ui/src/locale'

export default {
  name: 'EleFormDaterange',
  mixins: [formMixin, timerangeMixin],
  data () {
    return {
      defaultAttrs: {
        type: 'daterange',
        'start-placeholder': t('ele-form.startDate'),
        'end-placeholder': t('ele-form.endDate')
      }
    }
  }
}
</script>
