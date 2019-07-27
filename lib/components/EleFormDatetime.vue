<template>
  <el-date-picker
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    placeholder="选择日期"
    type="datetime"
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
  }
}
</script>
