<template>
  <el-select
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <template v-if="isShowOptions">
      <el-option
        :key="option.value"
        :label="option.text"
        :value="option.value"
        v-bind="option.attrs"
        v-for="option in desc.options"
      ></el-option>
    </template>
  </el-select>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormSelect',
  mixins: [formMixin]
}
</script>
