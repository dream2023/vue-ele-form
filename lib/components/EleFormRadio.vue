<template>
  <el-radio-group
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <el-radio
      :key="option.value"
      :label="option.value"
      v-bind="option.attrs"
      v-for="option of options"
    >{{option.text}}</el-radio>
  </el-radio-group>
</template>

<script>
import formMixin from '../mixins/formMixin'
export default {
  name: 'EleFormRadio',
  mixins: [formMixin],
  data () {
    return {
      newValue: null
    }
  }
}
</script>
