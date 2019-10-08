<template>
  <el-input-number
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
  name: 'EleFormNumber',
  mixins: [formMixin],
  props: {
    value: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      mockRule: '@integer(-100, 100)'
    }
  }
}
</script>
