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

export default {
  name: 'EleFormDaterange',
  mixins: [formMixin, timerangeMixin],
  data () {
    return {
      mockRule: 'custom'
    }
  },
  computed: {
    defaultAttrs () {
      return {
        type: 'daterange',
        'start-placeholder': this.t('ele-form.startDate'),
        'end-placeholder': this.t('ele-form.endDate')
      }
    }
  },
  methods: {
    getCustomMockData () {
      const date1 = this.mockFn('@date')
      const date2 = this.mockFn('@date')
      if (date1 > date2) {
        return [date2, date1]
      } else {
        return [date1, date2]
      }
    }
  }
}
</script>
