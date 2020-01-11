<template>
  <el-select
    :class="desc.class"
    :style="desc.style"
    allow-create
    class="ele-form-full-line"
    default-first-option
    filterable
    multiple
    ref="select-tag"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <el-option
      :key="tag.value"
      :label="tag.value"
      :value="tag.value"
      v-for="tag in options"
    ></el-option>
  </el-select>
</template>

<script>
import formMixin from '../mixins/formMixin'
import mock from '../tools/mock'

export default {
  name: 'EleFormTag',
  mixins: [formMixin],
  data() {
    return {
      mockRule: 'custom',
      type: ['Array']
    }
  },
  computed: {
    defaultAttrs() {
      return {
        placeholder: this.t('ele-form.input') + this.desc.label
      }
    }
  },
  methods: {
    getCustomMockData() {
      const Mock = mock()
      if (Mock) {
        return Array.from({ length: Mock.Random.integer(0, 5) }, () =>
          Mock.Random.cword(3, 5)
        )
      }
    }
  }
}
</script>
