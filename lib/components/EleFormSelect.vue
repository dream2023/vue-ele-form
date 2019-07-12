<template>
  <el-select
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <template
      v-for="(render, key) of desc.slot"
      v-slot:[key]
    >
      <extend-slot
        :key="key"
        :render="render"
      />
    </template>
    <el-option
      :key="option.value"
      :label="option.text"
      :value="option.value"
      v-bind="option.attrs"
      v-for="option in options"
    >
      <template
        v-if="desc.slot && desc.slot.default"
        v-slot:default
      >
        <extend-slot
          :data="option"
          :key="key"
          :render="render"
        />
      </template>
    </el-option>
  </el-select>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormSelect',
  mixins: [formMixin]
}
</script>
