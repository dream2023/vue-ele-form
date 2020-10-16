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

export default {
  name: 'EleFormSwitch',
  mixins: [formMixin],
  data() {
    return {
      mockRule: '@boolean'
    }
  }
}
</script>
