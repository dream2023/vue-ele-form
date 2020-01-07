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
import mock from '../tools/mock'

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
      const Mock = mock()
      if (Mock) {
        Array.from({ length: Mock.Random.integer(0, 5) }, () => Mock.Random.date())
      }
    }
  }
}
</script>
