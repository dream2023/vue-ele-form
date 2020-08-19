<template>
  <el-input
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <template v-for="(render, key) of desc.slots" v-slot:[key]>
      <extend-slot :key="key" :render="render" />
    </template>
  </el-input>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormInput',
  mixins: [formMixin],
  data() {
    return {
      mockRule: '@string',
      type: ['String', 'Number']
    }
  },
  computed: {
    defaultAttrs() {
      return {
        placeholder: this.t('ele-form.input') + this.desc._label
      }
    }
  }
}
</script>
