<template>
  <el-date-picker
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'
import timerangeMixin from '../mixins/timerangeMixin'
import { t } from '../locale'

export default {
  name: 'EleFormDates',
  mixins: [formMixin, timerangeMixin],
  data () {
    return {
      defaultAttrs: {
        type: 'dates',
        placeholder: t('ele-form.dates')
      }
    }
  }
}
</script>
