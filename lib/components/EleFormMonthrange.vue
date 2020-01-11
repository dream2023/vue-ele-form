<template>
  <el-date-picker
    :class="desc.class"
    :style="desc.style"
    @input="handleChange"
    class="ele-form-full-line"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <!-- 非作用域插槽 -->
    <template v-for="(render, key) of desc.slots" v-slot:[key]>
      <extend-slot :key="key" :render="render" />
    </template>
  </el-date-picker>
</template>

<script>
import formMixin from '../mixins/formMixin'
import timerangeMixin from '../mixins/timerangeMixin'
import mock from '../tools/mock'

export default {
  name: 'EleFormMonthrange',
  mixins: [formMixin, timerangeMixin],
  data() {
    return {
      mockRule: 'custom'
    }
  },
  computed: {
    defaultAttrs() {
      return {
        type: 'monthrange',
        startPlaceholder: this.t('ele-form.startDate'),
        endPlaceholder: this.t('ele-form.endDate')
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
