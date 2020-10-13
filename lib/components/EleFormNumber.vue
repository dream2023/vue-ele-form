<template>
  <el-input-number
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="desc.on"
    @input="handleChange"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'
import { isUnDef } from '../tools/utils'

export default {
  name: 'EleFormNumber',
  mixins: [formMixin],
  props: {
    value: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      mockRule: '@integer(-100, 100)'
    }
  },
  methods: {
    handleChange(val) {
      if (val === 0 && isUnDef(this.value)) return
      this.$emit('input', val)
    }
  }
}
</script>
