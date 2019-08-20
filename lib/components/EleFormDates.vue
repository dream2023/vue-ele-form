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
      type: 'Array',
      defaultAttrs: {
        type: 'dates',
        placeholder: '选择一个或多个日期'
      }
    }
  }
}
</script>
