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
  data () {
    return {
      mockRule: 'custom',
      originHandleOptionSelect: null,
      type: ['Array']
    }
  },
  computed: {
    defaultAttrs () {
      return {
        placeholder: this.t('ele-form.input') + this.desc.label
      }
    }
  },
  methods: {
    handleOptionSelect (option, byClick) {
      const newValue = this.newValue || []

      // tag不存在, 则添加, 存在则不处理
      if (!newValue.includes(option.value)) {
        this.originHandleOptionSelect.call(
          this.$refs['select-tag'],
          option,
          byClick
        )
      } else {
        this.$message.error(option.value + this.t('ele-form.tagError'))
      }
    },
    getCustomMockData () {
      const Mock = mock()
      if (Mock) {
        return Array.from({ length: Mock.Random.integer(0, 5) }, () => Mock.Random.cword(3, 5))
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // element-ui bug: https://github.com/ElemeFE/element/issues/17433
      this.originHandleOptionSelect = this.$refs['select-tag'].handleOptionSelect
      this.$refs['select-tag'].handleOptionSelect = this.handleOptionSelect
    })
  }
}
</script>
