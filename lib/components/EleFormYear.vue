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
import timeMixin from '../mixins/timeMixin'
import { t } from '../locale'

export default {
  name: 'EleFormYear',
  mixins: [formMixin, timeMixin],
  data () {
    return {
      type: ['Date', 'String', 'Number'],
      defaultAttrs: {
        type: 'year',
        placeholder: t('ele-form.year')
      }
    }
  }
}
</script>
