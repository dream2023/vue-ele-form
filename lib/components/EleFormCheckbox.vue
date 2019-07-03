<template>
  <el-checkbox-group
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <template v-if="isShowOptions">
      <el-checkbox
        :key="option.value"
        :label="option.value"
        v-bind="option.attrs"
        v-for="option of desc.options"
      >{{option.text}}</el-checkbox>
    </template>
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
