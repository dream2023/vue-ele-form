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

export default {
  name: 'EleFormDatetime',
  mixins: [formMixin, timeMixin],
  data () {
    return {
      type: ['Date', 'String', 'Number']
    }
  },
  computed: {
    defaultAttrs () {
      return {
        type: 'datetime',
        placeholder: this.t('ele-form.date')
      }
    }
  }
}
</script>
