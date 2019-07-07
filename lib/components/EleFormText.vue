<template>
  <div
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-on="onEvents"
  >{{newValue}}</div>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormText',
  mixins: [formMixin],
  methods: {
    // 当有 options 是, 可以显示option text
    customInit () {
      const val = this.value
      const option = this.options.find((option) => option.value === val)
      if (option) {
        this.newValue = option.text
      }
    }
  }
}
</script>
