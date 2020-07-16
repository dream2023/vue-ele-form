<template>
  <el-time-picker
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

export default {
  name: 'EleFormTimePicker',
  mixins: [formMixin],
  data() {
    return {
      mockRule: '@time(HH:mm)',
      type: ['String', 'Number', 'Date']
    }
  },
  computed: {
    defaultAttrs() {
      return {
        placeholder: this.t('ele-form.time')
      }
    }
  }
}
</script>
