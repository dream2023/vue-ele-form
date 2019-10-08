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

export default {
  name: 'EleFormDates',
  mixins: [formMixin, timerangeMixin],
  data () {
    return {
      mockRule: 'custom'
    }
  },
  computed: {
    defaultAttrs () {
      return {
        type: 'dates',
        placeholder: this.t('ele-form.dates')
      }
    }
  },
  methods: {
    getCustomMockData () {
      return Array.from({ length: this.randomFn.integer(0, 5) }, () => this.randomFn.date())
    }
  }
}
</script>
