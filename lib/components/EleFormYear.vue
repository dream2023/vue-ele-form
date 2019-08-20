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
  name: 'EleFormYear',
  mixins: [formMixin, timeMixin],
  data () {
    return {
      type: ['Date', 'String', 'Number'],
      defaultAttrs: {
        type: 'year',
        placeholder: '选择年'
      }
    }
  }
}
</script>
