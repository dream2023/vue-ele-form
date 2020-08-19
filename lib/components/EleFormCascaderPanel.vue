<template>
  <el-cascader-panel
    :class="desc.class"
    :options="options"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    ref="cascader"
    v-model="newValue"
    v-on="onEvents"
  >
    <!-- 组件内部插槽 -->
    <template v-if="scopedSlots.default" v-slot:default="data">
      <extend-slot :data="data" :render="scopedSlots.default" />
    </template>
    <template v-if="slots.empty">
      <extend-slot :render="slots.empty" />
    </template>
  </el-cascader-panel>
</template>

<script>
import formMixin from '../mixins/formMixin'
import mock from '../tools/mock'

export default {
  name: 'EleFormCascaderPanel',
  mixins: [formMixin],
  data() {
    return {
      mockRule: 'custom'
    }
  },
  computed: {
    defaultAttrs() {
      return {
        placeholder: this.t('ele-form.select') + this.desc._label,
        props: {
          value: 'value',
          label: 'label',
          children: 'children'
        }
      }
    }
  },
  methods: {
    getCustomMockData() {
      const Mock = mock()
      if (Mock) {
        const optionsTo2D = function(tree, key, stack = [], pathList = []) {
          if (!tree) return
          for (const data of tree) {
            stack.push(data[key])
            if (data.children && data.children.length) {
              optionsTo2D(data.children, key, stack, pathList)
            } else {
              pathList.push([...stack])
            }
            stack.pop(data[key])
          }
          return pathList
        }
        const props = Object.assign({ value: 'value' }, this.attrs.props)
        const options = optionsTo2D(this.options, props.value)
        if (this.attrs && this.attrs.multiple) {
          return Mock.Random.multiple(options)
        } else {
          return Mock.Random.pick(options)
        }
      }
    }
  }
}
</script>
