<template>
  <el-slider
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'
export default {
  name: 'EleFormSlider',
  mixins: [formMixin],
  watch: {
    attrs: {
      handler (attrs) {
        const { min = 0, max = 100 } = attrs
        this.mockRule = `@integer(${min}, ${max})`
      },
      immediate: true,
      deep: true
    }
  },
  data () {
    return {
      mockRule: '@integer(0, 100)',
      type: 'Number'
    }
  }
}
</script>
