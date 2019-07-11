<template>
  <el-select
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <el-option
      :key="option.value"
      :label="option.text"
      :value="option.value"
      v-bind="option.attrs"
      v-for="option in options"
    ></el-option>
  </el-select>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormSelect',
  mixins: [formMixin]
}
</script>
