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
  data () {
    return {
      type: ['String', 'Number']
    }
  },
  methods: {
    // 当有 options 是, 可以显示option text
    customInit (val) {
      const option = this.options.find((option) => option.value === val)
      if (option) {
        val = option.text
      }
      return val
    }
  }
}
</script>
