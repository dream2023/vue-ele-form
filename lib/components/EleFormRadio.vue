<template>
  <el-radio-group
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <template v-if="isShowOptions">
      <el-radio
        :key="option.value"
        :label="option.value"
        v-bind="option.attrs"
        v-for="option of desc.options"
      >{{option.text}}</el-radio>
    </template>
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
