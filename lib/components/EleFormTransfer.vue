<template>
  <el-transfer
    :class="desc.class"
    :data="options"
    :style="desc.style"
    class="ele-form-transfer"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <!-- 组件内部插槽 -->
    <template v-if="scopedSlots.default" v-slot:default="data">
      <extend-slot :data="data" :render="scopedSlots.default" />
    </template>
    <!-- 非作用域插槽 -->
    <template v-for="(render, key) of desc.slots" v-slot:[key]>
      <extend-slot :key="key" :render="render" />
    </template>
  </el-transfer>
</template>

<script>
import formMixin from '../mixins/formMixin'
import { isUnDef } from '../tools/utils'
import mock from '../tools/mock'

export default {
  name: 'EleFormTransfer',
  mixins: [formMixin],
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      type: 'Array',
      mockRule: 'custom',
      newValue: []
    }
  },
  methods: {
    customInit (val) {
      if (isUnDef(val)) {
        val = []
      }
      return val
    },
    getCustomMockData () {
      const Mock = mock()
      if (Mock) {
        const props = Object.assign({}, { key: 'key' }, this.attrs.props)
        return Mock.Random.checkbox(this.options, props.key)
      }
    }
  }
}
</script>

<style>
.ele-form-transfer {
  line-height: 1;
}
</style>
