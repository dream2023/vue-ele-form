<template>
  <el-checkbox-group
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <el-checkbox
      :key="option.value"
      :label="option.value"
      v-bind="option.attrs"
      v-for="option of options"
    >{{option.text}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormCheckbox',
  mixins: [formMixin],
  data () {
    return {
      newValue: []
    }
  }
}
</script>
