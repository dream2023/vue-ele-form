<template>
  <el-date-picker
    :class="desc.class"
    :style="desc.style"
    @input="handleChange"
    class="ele-form-full-line"
    type="daterange"
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
  data () {
    return {
      defaultAttrs: {
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期'
      }
    }
  }
}
</script>
