<template>
  <component
    :class="desc.class"
    :is="'el-' + desc.type"
    :name="'el-' + desc.type"
    :style="desc.style"
    @input="handleChange"
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
  </component>
</template>

<script>
import ExtendSlot from './ExtendSlot'

export default {
  name: 'EleFormItemCommon',
  components: {
    ExtendSlot
  },
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>
