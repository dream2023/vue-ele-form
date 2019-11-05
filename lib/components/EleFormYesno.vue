<template>
  <el-checkbox
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    {{ desc.title }}
    <template v-if="slots && slots.default" v-slot:default>
      <extend-slot :render="slots.default" />
    </template>
  </el-checkbox>
</template>

<script>
import formMixin from '../mixins/formMixin'
import utils from '../tools/utils'

export default {
  name: 'EleFormYesno',
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
      if (utils.is(this.value, 'Number')) {
        value = Number(value)
      }
      this.$emit('input', value)
    }
  }
}
</script>
