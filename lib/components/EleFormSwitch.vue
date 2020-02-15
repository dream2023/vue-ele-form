<template>
  <el-switch
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'
import { is } from '../tools/utils'

export default {
  name: 'EleFormSwitch',
  mixins: [formMixin],
  data () {
    return {
      mockRule: '@boolean'
    }
  },
  methods: {
    customInit (val) {
      return Boolean(val)
    },
    handleChange (value) {
      if (is(this.value, 'Number')) {
        value = Number(value)
      }
      this.$emit('input', value)
    }
  }
}
</script>
