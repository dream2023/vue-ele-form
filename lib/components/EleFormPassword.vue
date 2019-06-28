<template>
  <el-input
    :class="desc.class"
    :placeholder="'请输入' + desc.label"
    :show-password="true"
    :style="desc.style"
    v-bind="desc.attrs"
    v-model="initValue"
    v-on="desc.on"
  >
    <!-- 组件内部插槽 -->
    <template
      v-for="(render, key) of desc.slots"
      v-slot:[key]
    >
      <extend-slot
        :key="key"
        :render="render"
      />
    </template>
  </el-input>
</template>

<script>
import formMixin from '../mixins/formMixin'
export default {
  name: 'EleFormInput',
  mixins: [formMixin],
  props: {
    value: String
  }
}
</script>
