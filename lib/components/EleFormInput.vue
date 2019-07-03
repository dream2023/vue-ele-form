<template>
  <el-input
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <!-- 组件内部插槽 -->
    <template
      v-for="(render, key) of desc.slots"
      v-slot:[key]="data"
    >
      <extend-slot
        :data="data"
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
  data () {
    return {
      defaultAttrs: {
        placeholder: '请输入' + this.desc.label
      }
    }
  }
}
</script>
