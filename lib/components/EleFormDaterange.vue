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

export default {
  name: 'EleFormDaterange',
  mixins: [formMixin, timerangeMixin],
  computed: {
    defaultAttrs () {
      return {
        type: 'daterange',
        'start-placeholder': this.t('ele-form.startDate'),
        'end-placeholder': this.t('ele-form.endDate')
      }
    }
  }
}
</script>
