<template>
  <el-radio-group
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <el-radio-button
      :key="option.value"
      :label="option.value"
      v-bind="option.attrs"
      v-for="option of options"
      >{{ option.text }}</el-radio-button
    >
  </el-radio-group>
</template>

<script>
import formMixin from '../mixins/formMixin'
export default {
  name: 'EleFormRadioButton',
  mixins: [formMixin],
  data() {
    return {
      mockRule: 'radio',
      type: ['String', 'Number', 'Boolean'],
      newValue: this.value || null
    }
  }
}
</script>
