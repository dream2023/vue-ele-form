<template>
  <el-transfer
    :class="desc.class"
    :data="options"
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
  </el-transfer>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormTransfer',
  mixins: [formMixin],
  props: {
    value: Array
  },
  data () {
    return {
      newValue: []
    }
  },
  methods: {
    customInit () {
      if (this.newValue === undefined) {
        this.newValue = []
      }
    }
  }
}
</script>
