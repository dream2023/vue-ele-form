<template>
  <el-cascader
    :class="desc.class"
    :options="options"
    :style="desc.style"
    class="ele-form-full-line"
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
      mockRule: 'custom'
    }
  },
  computed: {
    defaultAttrs () {
      return {
        placeholder: this.t('ele-form.select') + this.desc.label,
        props: {
          value: 'value',
          label: 'label',
          children: 'children'
        }
      }
    }
  },
  methods: {
    getCustomMockData () {
      const optionsTo2D = function (tree, key, stack = [], pathList = []) {
        if (!tree) return
        for (let data of tree) {
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
        return this.randomFn.multiple(options)
      } else {
        return this.randomFn.pick(options)
      }
    }
  }
}
</script>
