<template>
  <el-time-picker
    :class="desc.class"
    :style="desc.style"
    is-range
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
import mock from '../tools/mock'

export default {
  name: 'EleFormTimerange',
  mixins: [formMixin, timerangeMixin],
  data() {
    return {
      mockRule: 'custom'
    }
  },
  computed: {
    defaultAttrs() {
      return {
        startPlaceholder: this.t('ele-form.startTime'),
        endPlaceholder: this.t('ele-form.endTime')
      }
    }
  },
  methods: {
    getCustomMockData() {
      const Mock = mock()
      if (Mock.mock) {
        const date1 = Mock.mock('@date')
        const date2 = Mock.mock('@date')
        if (date1 > date2) {
          return [date2, date1]
        } else {
          return [date1, date2]
        }
      }
    }
  }
}
</script>
