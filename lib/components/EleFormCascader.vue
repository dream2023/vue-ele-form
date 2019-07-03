<template>
  <el-cascader
    :class="desc.class"
    :options="desc.options"
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
  </el-cascader>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormCascader',
  mixins: [formMixin],
  data () {
    return {
      newValue: []
    }
  }
}
</script>
