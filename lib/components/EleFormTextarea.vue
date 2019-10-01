<template>
  <el-input
    :class="desc.class"
    :style="desc.style"
    type="textarea"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
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
  </el-input>
</template>

<script>
import formMixin from '../mixins/formMixin'
import { t } from '../locale'

export default {
  name: 'EleFormTextarea',
  mixins: [formMixin],
  data () {
    return {
      type: ['String', 'Number'],
      defaultAttrs: {
        autosize: { minRows: 6 },
        placeholder: t('ele-form.input') + this.desc.label
      }
    }
  }
}
</script>
