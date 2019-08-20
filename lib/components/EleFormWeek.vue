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
  name: 'EleFormWeek',
  mixins: [formMixin, timeMixin],
  data () {
    return {
      type: ['Date', 'String', 'Number'],
      defaultAttrs: {
        type: 'week',
        format: 'yyyy 第 WW 周',
        placeholder: '选择周'
      }
    }
  }
}
</script>
