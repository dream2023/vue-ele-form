<template>
  <el-input
    :class="desc.class"
    :placeholder="'请输入' + desc.label"
    :show-password="true"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <!-- 组件内部插槽 -->
    <template
      v-for="(render, key) of desc.slot"
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
  name: 'EleFormPassword',
  mixins: [formMixin],
  data () {
    return {
      defaultAttrs: {
        placeholder: '请输入' + this.desc.label
      }
    }
  }
}
</script>
