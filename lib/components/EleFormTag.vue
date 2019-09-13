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

export default {
  name: 'EleFormTag',
  mixins: [formMixin],
  data  () {
    return {
      originHandleOptionSelect: null,
      type: ['Array']
    }
  },
  methods: {
    handleOptionSelect (option, byClick) {
      const newValue = this.newValue || []

      // tag不存在, 则添加, 存在则不处理
      if (!newValue.includes(option.value)) {
        this.originHandleOptionSelect.call(this.$refs['select-tag'], option, byClick)
      } else {
        this.$message.error(`${option.value} 已存在`)
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
